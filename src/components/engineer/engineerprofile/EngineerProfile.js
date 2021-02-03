import React, { useEffect, Suspense } from "react"
import { connect } from "react-redux"
import { getCurrentProfileEngineer } from "../../../actions/engineer"
import Spinner from "../../Spinner/Spinner"
const ProfileItem = React.lazy(() => import("./ProfileItem/ProfileItem"))

const Profile = ({ getCurrentProfileEngineer, engineer: { engineer, loading } }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfileEngineer()
    }
    fetchData()
  }, [getCurrentProfileEngineer])
  return loading ? (
    <Spinner />
  ) : (
    <Suspense fallback={<Spinner />}>
      <ProfileItem engineer={engineer} />
    </Suspense>
  )
}
const mapStateToProps = state => ({
  engineer: state.engineer
})
export default connect(mapStateToProps, { getCurrentProfileEngineer })(Profile)
