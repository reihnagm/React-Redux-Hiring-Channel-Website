import React, { useEffect, useState } from "react"
import { getEngineers } from "../../actions/engineer"
import { connect } from "react-redux"
import { changeQueryParam } from "../../actions/engineer-router"
import { parse } from "../../lib/query-string"
import Header from "../Layouts/Header"
import HeaderFilter from "../Layouts/HeaderFilter"
import Spinner from "../Spinner/Spinner"
import EngineerList from "./EngineerList/EngineerList"
const Engineer = ({ getEngineers, engineers, loading, gettingQueryUrl, changeQueryParam, handleSearch, handleSort, handleFilterBy, handleShow }) => {
  const [page, setPage] = useState(1)
  const [show, setShow] = useState(5)
  const [filterBy, setFilterBy] = useState("latest-update")
  const [sort, setSort] = useState("newer")
  useEffect(() => {
    const fetchData = async () => {
      if (gettingQueryUrl) {
        await getEngineers(gettingQueryUrl)
      } else {
        await getEngineers()
      }
    }
    fetchData()
    changeQueryParam("page", page)
    changeQueryParam("show", show)
    changeQueryParam("sort", sort)
    changeQueryParam("filterby", filterBy)
  }, [getEngineers, gettingQueryUrl, changeQueryParam, page, show, sort, filterBy])
  const handlePage = (_, page) => {
    setPage(page)
    changeQueryParam("page", page)
  }
  handleSearch = search => {
    changeQueryParam("search", search)
  }
  handleFilterBy = filterBy => {
    setFilterBy(filterBy)
    changeQueryParam("filterby", filterBy)
  }
  handleSort = sort => {
    setSort(sort)
    changeQueryParam("sort", sort)
  }
  handleShow = show => {
    setShow(show)
    changeQueryParam("show", show)
  }

  return (
    <div>
      <Header handleSearchEngineer={handleSearch} />
      <HeaderFilter handleFilterBy={handleFilterBy} handleSort={handleSort} handleShow={handleShow} filterByE={filterBy} sortE={sort} showE={show} />
      {loading ? <Spinner /> : <EngineerList engineers={engineers} handlePage={handlePage} pageCount={engineers && engineers.pageDetail && engineers.pageDetail.total} currentPage={engineers && engineers.pageDetail && engineers.pageDetail.currentPage} />}
    </div>
  )
}
const mapStateToProps = state => ({
  engineers: state.engineer.engineers,
  loading: state.engineer.loading,
  gettingQueryUrl: state.router.location.search,
  querySearch: parse(state.router.location.search).search,
  querySort: parse(state.router.location.search).sort,
  queryFilterBy: parse(state.router.location.search).filterby,
  queryShow: parse(state.router.location.search).show
})
export default connect(mapStateToProps, { getEngineers, changeQueryParam })(Engineer)
