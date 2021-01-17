import "date-fns"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getCurrentProfileCompany, updateProfileCompany } from "../../../../actions/company"
import Spinner from "../../../Spinner/Spinner"
import ProfileEditItem from "./ProfileEditItem/ProfileEditItem"

const ProfileEdit = ({ getCurrentProfileCompany, updateProfileCompany, company: { company, loading }, history }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfileCompany()
    }
    fetchData()
  }, [getCurrentProfileCompany])
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="backdrop-bottom"></div>
      <ProfileEditItem company={company} history={history} update={updateProfileCompany} />
    </div>
  )
}
const mapStateToProps = state => ({
  company: state.company
})
export default connect(mapStateToProps, { getCurrentProfileCompany, updateProfileCompany })(withRouter(ProfileEdit))
