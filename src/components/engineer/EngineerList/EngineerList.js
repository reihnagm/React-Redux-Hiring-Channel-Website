import React, { Suspense } from "react"
import Spinner from "../../Spinner/Spinner"
const EngineerItem = React.lazy(() => import("../EngineerItem/EngineerItem"))
const Empty = React.lazy(() => import("../../Layouts/PageEmpty"))
const EngineerList = ({ engineers, handlePage, currentPage, pageCount }) =>
  engineers.data && engineers.data.length === 0 ? (
    <Suspense fallback={<Spinner />}>
      <Empty />
    </Suspense>
  ) : (
    <Suspense fallback={<Spinner />}>
      <EngineerItem engineers={engineers.data} handlePage={handlePage} currentPage={currentPage} pageCount={pageCount} />
    </Suspense>
  )
export default EngineerList
