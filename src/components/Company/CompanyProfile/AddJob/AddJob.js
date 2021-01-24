import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getCurrentProfileCompany, storeAddJob } from "../../../../actions/company"
import { getSkills } from "../../../../actions/skill"
import { getJobTypes } from "../../../../actions/jobtype"
import Spinner from "../../../Spinner/Spinner"
import AddJobItem from "./AddJobItem/AddJobItem"

const AddJob = ({ getCurrentProfileCompany, getJobTypes, storeAddJob, getSkills, company: { company, loading }, skill: { skills }, jobtype: { jobtypes }, history }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfileCompany()
      await getJobTypes()
      await getSkills()
    }
    fetchData()
  }, [getCurrentProfileCompany, getSkills, getJobTypes])
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="backdrop-bottom"></div>
      <AddJobItem company={company} storeAddJob={storeAddJob} allSkills={skills} allJobTypes={jobtypes} history={history} />
    </div>
  )
}

const mapStateToProps = state => ({
  skill: state.skill,
  company: state.company,
  jobtype: state.jobtype
})

export default connect(mapStateToProps, { getCurrentProfileCompany, storeAddJob, getJobTypes, getSkills })(withRouter(AddJob))
