import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ThemeProvider, CssBaseline } from "@material-ui/core"
import { loadUser } from "./actions/auth"
import { theme } from "./configs/theme"
import Landing from "./components/layouts/landing"
import Routes from "./components/route"
import store from "./store.js"
import setAuthToken from "./utils/token"
if (localStorage.token) {
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
export default App
