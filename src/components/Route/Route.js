import React from "react"
import { Route, Switch } from "react-router-dom"
import Register from "../Auth/Register"
import Login from "../Auth/Login"
import Page404 from "../Layouts/Page404"
import Engineer from "../Engineer/Engineer"
import EngineerProfile from "../Engineer/EngineerProfile/EngineerProfile"
import EngineerProfileShow from "../Engineer/EngineerProfile/ProfileShow/ProfileShow"
import EngineerProfileEdit from "../Engineer/EngineerProfile/ProfileEdit/ProfileEdit"
import Company from "../Company/Company"
import CompanyProfile from "../Company/CompanyProfile/CompanyProfile"
import AddJob from "../Company/CompanyProfile/AddJob/AddJob"
import EditJob from "../Company/CompanyProfile/EditJob/EditJob"
import CompanyProfileDetail from "../Company/CompanyProfile/ProfileDetail/ProfileDetail"
import CompanyProfileEdit from "../Company/CompanyProfile/ProfileEdit/ProfileEdit"
import Private from "./Private/Private"

const Routes = () => {
  return (
    <Switch>
      {/* Auth Route */}
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      {/* Company Route */}
      <Route exact path="/companies/add-job" component={AddJob} />
      <Route exact path="/companies/:slug/edit-job" component={EditJob} />
      <Route exact path="/companies" component={Company} />
      {/* <Redirect from="/companies" to="/companies?page=1&show=5&sort=newer&filterby=latest-update" /> */}
      <Route exact path="/companies/detail/:slug" component={CompanyProfileDetail} />
      {/* Private Company Route */}
      <Private exact path="/companies/profile" component={CompanyProfile} />
      <Private exact path="/companies/profile/me/edit" component={CompanyProfileEdit} />

      {/* Engineer Route */}
      <Route exact path="/engineers" component={Engineer} />
      <Route exact path="/engineers/profile/:slug" component={EngineerProfileShow} />
      {/* Private Engineer Route  */}
      <Private exact path="/engineers/profile" component={EngineerProfile} />
      <Private exact path="/engineers/profile/me/edit" component={EngineerProfileEdit} />
      {/* 404 Page */}
      <Route component={Page404} />
    </Switch>
  )
}

export default Routes
