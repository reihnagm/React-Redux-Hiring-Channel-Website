import React, { useEffect, useState } from "react"
import { getEngineers } from "../../actions/engineer"
import { connect } from "react-redux"
import { changeQueryParam } from "../../actions/engineer-router"
import { parse } from "../../lib/query-string"
import Header from "../layouts/header"
import HeaderFilter from "../layouts/headerfilter"
import Spinner from "../spinner"
import EngineerList from "./engineerlist"
const Engineer = ({ getEngineers, engineers, loading, gettingQueryUrl, changeQueryParam, handleSearch, handleSort, handleSortBy, handleLimit }) => {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState()
  const [sort, setSort] = useState()
  const [limit, setLimit] = useState(5)
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
    changeQueryParam("limit", limit.value)
  }, [getEngineers, gettingQueryUrl, changeQueryParam, page, limit])
  const handlePage = (_, page) => {
    setPage(page)
    changeQueryParam("page", page)
  }
  handleSearch = search => {
    changeQueryParam("search", search)
  }
  handleSortBy = sortBy => {
    setSortBy(sortBy)
    changeQueryParam("sortBy", sortBy)
  }
  handleSort = sort => {
    setSort(sort)
    changeQueryParam("sort", sort)
  }
  handleLimit = limit => {
    setLimit(limit)
    changeQueryParam("limit", limit)
  }
  return (
    <>
      <Header handleSearchEngineer={handleSearch} />
      <HeaderFilter handleSortBy={handleSortBy} handleSort={handleSort} handleLimit={handleLimit} setSortBy={setSortBy} setSort={setSort} setLimit={setLimit} sortByE={sortBy} sortE={sort} limitE={limit} />
      {loading ? <Spinner /> : <EngineerList engineers={engineers} handlePage={handlePage} pageCount={engineers && engineers.pageDetail && engineers.pageDetail.total} currentPage={engineers && engineers.pageDetail && engineers.pageDetail.currentPage} />}
    </>
  )
}
const mapStateToProps = state => ({
  engineers: state.engineer.engineers,
  loading: state.engineer.loading,
  gettingQueryUrl: state.router.location.search,
  querySearch: parse(state.router.location.search).search,
  querySort: parse(state.router.location.search).sort,
  querySortBy: parse(state.router.location.search).sortBy,
  queryLimit: parse(state.router.location.search).limit
})
export default connect(mapStateToProps, { getEngineers, changeQueryParam })(Engineer)
