import React, { Suspense } from "react"
import Spinner from "../../Spinner/Spinner"
const EngineerItem = React.lazy(() => import("../EngineerItem/EngineerItem"))
const Empty = React.lazy(() => import("../../Layouts/PageEmpty"))
const EngineerList = ({ engineers }) =>
  engineers && engineers.length === 0 ? (
    <Suspense fallback={<Spinner />}>
      <Empty />
    </Suspense>
  ) : (
    <Suspense fallback={<Spinner />}>
      <EngineerItem engineers={engineers}  />
      {/* <EngineerItem engineers={engineers.data} handlePage={handlePage} currentPage={currentPage} pageCount={pageCount} /> */}
    </Suspense>
  )
export default EngineerList
