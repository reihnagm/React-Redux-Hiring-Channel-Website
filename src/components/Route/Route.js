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
import CompanyProfileShow from "../Company/CompanyProfile/ProfileShow/ProfileShow"
import CompanyProfileEdit from "../Company/CompanyProfile/ProfileEdit/ProfileEdit"
import Private from "./Private/Private"

const Routes = () => {
  return (
    <Switch>
      {/* Auth Route */}
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      {/* Company Route */}
      <Route exact path="/companies" component={Company} />
      <Route exact path="/companies/profile/:slug" component={CompanyProfileShow} />
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
