import React, { useEffect, useState, Suspense } from "react"
import { getEngineers } from "../../actions/engineer"
import { connect } from "react-redux"
import { changeQueryParam } from "../../actions/engineer-router"
import { parse } from "../../lib/query-string"
import Spinner from "../Spinner/Spinner"
const Header = React.lazy(() => import("../Layouts/Header"))
const HeaderFilter = React.lazy(() => import("../Layouts/HeaderFilter"))
const EngineerList = React.lazy(() => import("./EngineerList/EngineerList"))
const Engineer = ({ getEngineers, engineers: { engineers, pageN, showN, filterByN, sortN, offsetN }, loading, gettingQueryUrl, changeQueryParam, handleSearch, handleSort, handleFilterBy, handleShow }) => {
  const [page, setPage] = useState(pageN)
  const [show, setShow] = useState(showN)
  const [filterBy, setFilterBy] = useState(filterByN)
  const [sort, setSort] = useState(sortN)
  // const [offset, setOffset] = useState(offsetN)
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
    // changeQueryParam("offset", 0)
  }, [getEngineers, gettingQueryUrl, changeQueryParam, page, show, sort, filterBy])
  // const handlePage = (_, page) => {
  //   setPage(page)
  //   changeQueryParam("page", page)
  // } // Uncommenf if use pagination
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
      <Suspense fallback={<Spinner />}>
        <Header handleSearchEngineer={handleSearch} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <HeaderFilter handleFilterBy={handleFilterBy} handleSort={handleSort} handleShow={handleShow} filterByE={filterBy} sortE={sort} showE={show} />
      </Suspense>
      {loading ? (
        <Spinner />
      ) : (
        <Suspense fallback={<Spinner />}>
          <EngineerList engineers={engineers} />
          {/* <EngineerList engineers={engineers} handlePage={handlePage} pageCount={engineers && engineers.pageDetail && engineers.pageDetail.total} currentPage={engineers && engineers.pageDetail && engineers.pageDetail.currentPage} /> */}
        </Suspense>
      )}
    </div>
  )
}
const mapStateToProps = state => ({
  engineers: state.engineer,
  loading: state.engineer.loading,
  gettingQueryUrl: state.router.location.search,
  querySearch: parse(state.router.location.search).search,
  querySort: parse(state.router.location.search).sort,
  queryFilterBy: parse(state.router.location.search).filterby,
  queryShow: parse(state.router.location.search).show,
  queryOffset: parse(state.router.location.search).offset
})
export default connect(mapStateToProps, { getEngineers, changeQueryParam })(Engineer)
