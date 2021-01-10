import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getCurrentProfileCompany } from "../../../actions/company"
import ProfileItem from "./ProfileItem/ProfileItem"
import Spinner from "../../Spinner/Spinner"

const Profile = ({ getCurrentProfileCompany, company: { company, loading } }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfileCompany()
    }
    fetchData()
  }, [getCurrentProfileCompany])
  return loading ? <Spinner /> : <ProfileItem company={company} />
}
const mapStateToProps = state => ({
  company: state.company
})
export default connect(mapStateToProps, { getCurrentProfileCompany })(Profile)
