import React, { useEffect, Suspense } from "react"
import "date-fns"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getCurrentProfileEngineer, updateProfileEngineer } from "../../../../actions/engineer"
import { getSkills } from "../../../../actions/skill"
import Spinner from "../../../Spinner/Spinner"
const ProfileEditItem = React.lazy(() => import("./ProfileEditItem/ProfileEditItem"))

const ProfileEdit = ({ getCurrentProfileEngineer, getSkills, updateProfileEngineer, engineer: { engineer, loading }, skill: { skills }, history }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfileEngineer()
      await getSkills()
    }
    fetchData()
  }, [getCurrentProfileEngineer, getSkills])
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="backdrop-bottom"></div>
      <Suspense fallback={<Spinner />}>
        <ProfileEditItem engineer={engineer} allSkills={skills} history={history} updateProfileEngineer={updateProfileEngineer} />
      </Suspense>
    </div>
  )
}
const mapStateToProps = state => ({
  engineer: state.engineer,
  skill: state.skill
})
export default connect(mapStateToProps, { getCurrentProfileEngineer, getSkills, updateProfileEngineer })(withRouter(ProfileEdit))
