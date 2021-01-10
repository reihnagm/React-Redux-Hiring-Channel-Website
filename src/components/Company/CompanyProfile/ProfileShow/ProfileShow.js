import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getProfileCompanyBySlug } from "../../../../actions/company"
import Spinner from "../../../Spinner/Spinner"
import ProfileShowItem from "./ProfileShowItem/ProfileShowItem"

const Profile = ({ getProfileCompanyBySlug, company: { company, loading }, match }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getProfileCompanyBySlug(match.params.slug)
    }
    fetchData()
  }, [getProfileCompanyBySlug, match])
  return loading ? <Spinner /> : <ProfileShowItem company={company} />
}
const mapStateToProps = state => ({
  company: state.company
})
export default connect(mapStateToProps, { getProfileCompanyBySlug })(Profile)
