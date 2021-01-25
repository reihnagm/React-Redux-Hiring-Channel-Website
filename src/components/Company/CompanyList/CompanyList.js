import React from "react"
import CompanyItem from "../CompanyItem/CompanyItem"
import Empty from "../../Layouts/PageEmpty"
const CompanyList = ({ companies, handlePage, currentPage, pageCount }) => (companies.data && companies.data.length === 0 ? <Empty /> : <CompanyItem companies={companies.data} handlePage={handlePage} currentPage={currentPage} pageCount={pageCount} />)
export default CompanyList