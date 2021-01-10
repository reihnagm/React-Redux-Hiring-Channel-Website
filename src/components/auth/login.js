import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { Button, TextField, Typography } from "@material-ui/core"
import { connect } from "react-redux"
import { login } from "../../actions/auth"
import { isImage, bytesToSize, validateEmail } from "../../utils/helper"
import Swal from "sweetalert2"

const Toast = Swal.mixin({
  position: "top-end",
  toast: true,
  timer: 3000,
  showConfirmButton: false,
  timerProgressBar: false,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer)
    toast.addEventListener("mouseleave", Swal.resumeTimer)
  }
})

const Login = ({ login, isAuthenticated, history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const { email, password } = formData
  const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value })
  const onSubmit = async e => {
    e.preventDefault()
    try {
      if (email.trim() === "") {
        throw new Error("Email Required")
      }
      if (password.trim() === "") {
        throw new Error("Password Required")
      }
      if (validateEmail(email)) {
        throw new Error("Invalid Email. e.g (johndoe@gmail.com)")
      }
      if (password.length < 6) {
        throw new Error("Password Minimum 6 Character")
      }
      await login(email, password, history)
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: err.message
      })
    }
  }
  if (isAuthenticated) {
    return <Redirect to="/" />
  }
  return (
    <>
      <div className="columns justify-center min-h-screen">
        <div className="column marginless" id="cover-background-login">
          <div id="cover-login"></div>
          <h2 className="title mx-2 text-white">Hire expert freelancers for any job, online</h2>
          <h3 className="sub-title mx-2 text-white">Millions of small businesses use Frelancer to turn their ideas into reality.</h3>
        </div>
        <div className="column">
          <Typography variant="h5" component="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={event => onSubmit(event)}>
            <TextField onChange={event => onChange(event)} value={email ?? ""} name="email" margin="normal" variant="outlined" label="Email" fullWidth />
            <TextField onChange={event => onChange(event)} value={password ?? ""} name="password" margin="normal" variant="outlined" label="Password" fullWidth />
            <div className="margin-normal">
              <Button style={{ margin: 0 }} type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </div>
            <div className="margin-normal">
              <Button style={{ margin: 0 }} type="button" variant="contained" color="primary" component={Link} to="/" fullWidth>
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)
