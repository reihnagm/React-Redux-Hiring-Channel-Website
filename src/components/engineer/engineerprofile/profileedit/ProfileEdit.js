import React, { useEffect } from "react"
import "date-fns"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getCurrentProfileEngineer, updateProfileEngineer } from "../../../../actions/engineer"
import { getSkills } from "../../../../actions/skill"
import Spinner from "../../../Spinner/Spinner"
import ProfileEditItem from "./ProfileEditItem/ProfileEditItem"

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
    <>
      <div className="backdrop-bottom"></div>
      <ProfileEditItem engineer={engineer} allSkills={skills} history={history} update={updateProfileEngineer} />
    </>
  )
}
const mapStateToProps = state => ({
  engineer: state.engineer,
  skill: state.skill
})
export default connect(mapStateToProps, { getCurrentProfileEngineer, getSkills, updateProfileEngineer })(withRouter(ProfileEdit))
