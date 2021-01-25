import React from "react"
import EngineerItem from "../EngineerItem/EngineerItem"
import Empty from "../../Layouts/PageEmpty"
const EngineerList = ({ engineers, handlePage, currentPage, pageCount }) => (engineers.data && engineers.data.length === 0 ? <Empty /> : <EngineerItem engineers={engineers.data} handlePage={handlePage} currentPage={currentPage} pageCount={pageCount} />)
export default EngineerList
