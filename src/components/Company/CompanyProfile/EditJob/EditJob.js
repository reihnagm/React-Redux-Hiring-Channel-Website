import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { editPostJob, updatePostJob } from "../../../../actions/company"
import { getSkills } from "../../../../actions/skill"
import { getJobTypes } from "../../../../actions/jobtype"
import Spinner from "../../../Spinner/Spinner"
import EditJobItem from "./EditJobItem/EditJobItem"

const EditJob = ({ editPostJob, updatePostJob, getSkills, getJobTypes, postjob: { postjob, loading }, jobtype: { jobtypes }, skill: { skills }, history, match }) => {
  useEffect(() => {
    const fetchData = async () => {
      await editPostJob(match.params.slug)
      await getSkills()
      await getJobTypes()
    }
    fetchData()
  }, [editPostJob, getSkills, getJobTypes])
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="backdrop-bottom"></div>
      <EditJobItem postJob={postjob} updatePostJob={updatePostJob} allSkills={skills} allJobTypes={jobtypes} history={history} />
    </div>
  )
}
const mapStateToProps = state => ({
  postjob: state.postjob,
  skill: state.skill,
  jobtype: state.jobtype
})
export default connect(mapStateToProps, { editPostJob, updatePostJob, getSkills, getJobTypes })(withRouter(EditJob))
