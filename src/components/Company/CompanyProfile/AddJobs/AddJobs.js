import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getCurrentProfileCompany } from "../../../../actions/company"
import { getSkills } from "../../../../actions/skill"
import Spinner from "../../../Spinner/Spinner"
import AddJobsItem from "./AddJobsItem/AddJobsItem"

const AddJobs = ({ getCurrentProfileCompany, getSkills, company: { company, loading }, skill: { skills } }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfileCompany()
      await getSkills()
    }
    fetchData()
  }, [getCurrentProfileCompany, getSkills])
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="backdrop-bottom"></div>
      <AddJobsItem company={company} allSkills={skills} />
    </div>
  )
}

const mapStateToProps = state => ({
  skill: state.skill,
  company: state.company
})

export default connect(mapStateToProps, { getCurrentProfileCompany, getSkills })(withRouter(AddJobs))
