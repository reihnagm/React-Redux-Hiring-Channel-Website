import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getCurrentProfileEngineer } from "../../../actions/engineer"
import ProfileItem from "./ProfileItem/ProfileItem"
import Spinner from "../../Spinner/Spinner"

const Profile = ({ getCurrentProfileEngineer, engineer: { engineer, loading } }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfileEngineer()
    }
    fetchData()
  }, [getCurrentProfileEngineer])
  return loading ? <Spinner /> : <ProfileItem engineer={engineer} />
}
const mapStateToProps = state => ({
  engineer: state.engineer
})
export default connect(mapStateToProps, { getCurrentProfileEngineer })(Profile)
