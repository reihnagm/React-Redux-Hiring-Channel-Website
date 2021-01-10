import React, { useEffect, useState } from "react"
import { getCompanies } from "../../actions/company"
import { connect } from "react-redux"
import { changeQueryParam } from "../../actions/company-router"
import { parse } from "../../lib/query-string"
import Header from "../Layouts/Header"
import HeaderFilter from "../Layouts/HeaderFilter"
import Spinner from "../Spinner/Spinner"
import CompanyList from "./CompanyList/CompanyList"
const Company = ({ getCompanies, companies, loading, gettingQueryUrl, changeQueryParam, handleSearch, handleSort, handleFilterBy, handleShow }) => {
  const [page, setPage] = useState(1)
  const [show, setShow] = useState(5)
  const [filterBy, setFilterBy] = useState("latest-update")
  const [sort, setSort] = useState("newer")
  useEffect(() => {
    const fetchData = async () => {
      if (gettingQueryUrl) {
        await getCompanies(gettingQueryUrl)
      } else {
        await getCompanies()
      }
    }
    fetchData()
    changeQueryParam("page", page)
    changeQueryParam("show", show)
    changeQueryParam("sort", sort)
    changeQueryParam("filterby", filterBy)
  }, [getCompanies, gettingQueryUrl, changeQueryParam, page, show, sort, filterBy])
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
      <Header handleSearchCompany={handleSearch} />
      <HeaderFilter handleFilterBy={handleFilterBy} handleSort={handleSort} handleShow={handleShow} filterByC={filterBy} sortC={sort} showC={show} />
      {loading ? <Spinner /> : <CompanyList companies={companies} handlePage={handlePage} pageCount={companies && companies.pageDetail && companies.pageDetail.total} currentPage={companies && companies.pageDetail && companies.pageDetail.currentPage} />}
    </div>
  )
}
const mapStateToProps = state => ({
  companies: state.company.companies,
  loading: state.company.loading,
  gettingQueryUrl: state.router.location.search,
  querySearch: parse(state.router.location.search).search,
  querySortBy: parse(state.router.location.search).sortBy,
  queryFilterBy: parse(state.router.location.search).filterby,
  queryShow: parse(state.router.location.search).show
})
export default connect(mapStateToProps, { getCompanies, changeQueryParam })(Company)
