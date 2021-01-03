import React, { useState } from "react"
import CryptoJS from "crypto-js"
import { Link, Redirect } from "react-router-dom"
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"
import { Button, InputLabel, Grid, Avatar, Badge, FormControl, makeStyles, TextField, MenuItem, Select, Typography } from "@material-ui/core"
import { connect } from "react-redux"
import { registerEngineer, registerCompany } from "../../actions/auth"
import { isImage, bytesToSize, arrayBufferToWordArray } from "../../utils/helper"
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined"
import Swal from "sweetalert2"
import MaskedInput from "react-text-mask"
import "react-dropdown/style.css"
const fs = require("fs")

const renderFunction = ({ getInputProps, suggestions, getSuggestionItemProps }) => (
  <div>
    <TextField {...getInputProps()} margin="normal" variant="outlined" label="* Company Location" fullWidth />
    <div className="autocomplete-dropdown-container">
      {suggestions.map((suggestion, i) => {
        const className = suggestion.active ? "suggestion-item--active" : "suggestion-item"
        const style = suggestion.active ? { backgroundColor: "#fafafa", cursor: "pointer" } : { backgroundColor: "#ffffff", cursor: "pointer" }
        return (
          <div
            {...getSuggestionItemProps(suggestion, {
              className,
              style
            })}
            key={i}
          >
            <span
              style={{
                backgroundColor: "#ea80fc",
                display: "inline-block",
                height: "200",
                padding: "8px",
                color: "white"
              }}
            >
              {suggestion.description}
            </span>
          </div>
        )
      })}
    </div>
  </div>
)
const Register = ({ registerEngineer, registerCompany, isAuthenticated, history }) => {
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
  const [role, setRole] = useState(1)
  const onChangeRole = element => {
    setRole(element.target.value)
  }
  if (isAuthenticated) {
    return <Redirect to="/" />
  }
  const EngineerInput = () => {
    const [formData, setFormData] = useState({
      fullname: "",
      nickname: "",
      email: "",
      password: ""
    })
    const { fullname, nickname, email, password } = formData
    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value })
    const onSubmit = event => {
      event.preventDefault()
      registerEngineer(fullname, nickname, email, password, role, history)
    }
    return (
      <form onSubmit={event => onSubmit(event)}>
        <TextField onChange={onChange} value={fullname} name="fullname" margin="normal" variant="outlined" label="Fullname" fullWidth />
        <TextField onChange={onChange} value={nickname} name="nickname" margin="normal" variant="outlined" label="Nickname" fullWidth />
        <TextField onChange={onChange} value={email} name="email" margin="normal" variant="outlined" label="Email" fullWidth />
        <TextField onChange={onChange} value={password} name="password" margin="normal" variant="outlined" label="Password" type="password" fullWidth />
        <div className="margin-normal">
          <Button style={{ margin: 0 }} type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </div>
        <div className="margin-normal">
          <Button style={{ margin: 0 }} type="button" variant="contained" color="primary" component={Link} to="/" fullWidth>
            Back
          </Button>
        </div>
      </form>
    )
  }
  const CompanyInput = () => {
    let fileRef
    const [formData, setFormData] = useState({
      fullname: "",
      nickname: "",
      companyname: "",
      companyemail: "",
      companytelp: "",
      companydesc: "",
      email: "",
      password: ""
    })
    const useStyles = makeStyles(theme => ({
      root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > *": {
          margin: theme.spacing(0.5)
        }
      },
      chip: {
        "& > *": {
          margin: theme.spacing(0.5)
        }
      },
      small: {
        width: theme.spacing(3),
        height: theme.spacing(3)
      },
      large: {
        width: theme.spacing(10),
        height: theme.spacing(10)
      }
    }))
    const classes = useStyles()
    const [logoFile, setLogoFile] = useState("")
    const [logoDefault, setDefaultLogo] = useState("")
    const [companylocation, setCompanyLocation] = useState("")
    const handleFile = _ => {
      fileRef.click()
    }
    const handleAvatar = async event => {
      if (event.target.files && event.target.files[0]) {
        let size = bytesToSize(event.target.files[0].size)
        let extension = event.target.files[0].name.split(".").pop()
        let reader = new FileReader()
        try {
          if (size > process.env.REACT_APP_SIZE_IMAGE) {
            throw new Error("File size cannot larger than 1MB")
          }
          if (!isImage(extension)) {
            throw new Error("File type allowed: PNG, JPG, JPEG, GIF, SVG, BMP")
          }
          setLogoFile(event.target.files[0])
          reader.onload = e => {
            setDefaultLogo(e.target.result)
          }
          reader.onprogress = e => {
            const percent = (e.loaded / e.total) * 100
            console.log(`Progress: ${Math.round(percent)}`)
          }
          reader.readAsDataURL(event.target.files[0])
        } catch (error) {
          Toast.fire({
            icon: "error",
            title: error.message
          })
        }
      }
    }
    const onChangeLocation = address => {
      setCompanyLocation(address)
    }
    const handleSelectLocation = async address => {
      try {
        const results = await geocodeByAddress(address)
        setCompanyLocation(results[0].formatted_address)
      } catch (error) {
        console.log(error)
      }
    }
    const { fullname, nickname, companyname, companyemail, companytelp, companydesc, email, password } = formData
    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value })
    const onSubmit = async event => {
      event.preventDefault()
      let fd, regexp, checkEmail
      regexp = /[a-zA-z-0-9_]+@[a-zA-Z]+\.(com|net|org)$/
      checkEmail = regexp.test(email)
      try {
        if (fullname.trim() === "") {
          throw new Error("Fullname Required")
        }
        if (nickname.trim() === "") {
          throw new Error("Nickname Required")
        }
        if (email.trim() === "") {
          throw new Error("Email Required")
        }
        if (logoFile === "") {
          throw new Error("Logo Required")
        }
        if (!checkEmail) {
          throw new Error("Invalid Email. e.g : johndoe@gmail.com")
        }
        if (password.trim() === "") {
          throw new Error("Password Required")
        }
        if (password.length < 6) {
          throw new Error("Password Minimum 6 Character")
        }
        if (companyname.trim() === "") {
          throw new Error("Company Name Required")
        }
        if (companyemail.trim() === "") {
          throw new Error("Company Email Required")
        }
        if (companydesc.trim() === "") {
          throw new Error("Company Description required")
        }
        if (companytelp.trim() === "") {
          throw new Error("Company Telephone Required")
        }
        if (companylocation.trim() === "") {
          throw new Error("Company Location required")
        }
        if (typeof role === "undefined") {
          throw new Error("Role Required")
        }
        fd = new FormData()
        fd.set("fullname", fullname)
        fd.set("nickname", nickname)
        fd.set("email", email)
        fd.set("password", password)
        fd.set("logo", logoFile)
        fd.set("role", role)
        fd.set("companyname", companyname)
        fd.set("companyemail", companyemail)
        fd.set("companytelp", companytelp)
        fd.set("companydesc", companydesc)
        fd.set("companylocation", companylocation)
        registerCompany(fd).then(_ => {
          history.push("/companies")
          Toast.fire({
            icon: "success",
            title: "Successful Register"
          })
        })
      } catch (error) {
        if (error.response && error.response.data.message.name === "UserAlreadyExists") {
          Toast.fire({
            icon: "error",
            title: "User already exists"
          })
        } else {
          Toast.fire({
            icon: "error",
            title: error.message
          })
        }
      }
    }
    return (
      <form onSubmit={event => onSubmit(event)}>
        <TextField onChange={onChange} value={fullname} name="fullname" margin="normal" variant="outlined" label="User Fullname" fullWidth />
        <TextField onChange={onChange} value={nickname} name="nickname" margin="normal" variant="outlined" label="User Nickname" fullWidth />
        <TextField onChange={onChange} value={email} name="email" margin="normal" variant="outlined" label="User Email" fullWidth />
        <Grid container className="my-5" direction="column" justify="center" alignItems="center">
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            badgeContent={
              <Grid
                item
                className="p-1 rounded"
                style={{
                  backgroundColor: "#ea80fc"
                }}
              >
                <CreateOutlinedIcon
                  onClick={handleFile}
                  className="text-white"
                  style={{
                    cursor: "pointer"
                  }}
                />
                <input ref={input => (fileRef = input)} onChange={handleAvatar} style={{ display: "none" }} type="file" />
              </Grid>
            }
          >
            <Avatar className={classes.large} alt={fullname} src={`${logoDefault}`} />
          </Badge>
        </Grid>
        <TextField onChange={onChange} value={companyname} name="companyname" margin="normal" variant="outlined" label="* Company Name" fullWidth />
        <TextField onChange={onChange} value={companyemail} name="companyemail" margin="normal" variant="outlined" label="* Company Email" fullWidth />
        <MaskedInput mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} placeholderChar={"_"} onChange={e => onChange(e)} render={(ref, props) => <TextField value={companytelp} name="companytelp" margin="normal" variant="outlined" label="* Company Telp" fullWidth inputRef={ref} {...props} />} />
        <TextField onChange={onChange} value={companydesc} multiline rows="4" name="companydesc" margin="normal" variant="outlined" label="* Company Description" fullWidth />
        <PlacesAutocomplete onChange={onChangeLocation} value={companylocation} onSelect={handleSelectLocation}>
          {renderFunction}
        </PlacesAutocomplete>
        <TextField onChange={onChange} value={password} name="password" margin="normal" variant="outlined" label="Password" type="password" fullWidth />
        <div className="margin-normal">
          <Button style={{ margin: 0 }} type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </div>
        <div className="margin-normal">
          <Button style={{ margin: 0 }} type="button" variant="contained" color="primary" component={Link} to="/" fullWidth>
            Back
          </Button>
        </div>
      </form>
    )
  }
  return (
    <div className="columns justify-center min-h-screen">
      <div className="column marginless" id="cover-background-register">
        <div id="cover-register"></div>
        <h2 className="title mx-3 text-white">Hire expert freelancers for any job, online</h2>
        <h3 className="sub-title mx-3 text-white">Millions of small businesses use Frelancer to turn their ideas into reality.</h3>
      </div>
      <div className="column">
        <Typography variant="h5" component="h5" gutterBottom>
          Register
        </Typography>
        <FormControl margin="normal" variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-role">Select your Role</InputLabel>
          <Select
            inputProps={{
              name: "role",
              id: "outlined-role"
            }}
            value={role}
            label="Select your Role"
            onChange={event => onChangeRole(event)}
          >
            <MenuItem value={1}>Engineer</MenuItem>
            <MenuItem value={2}>Company</MenuItem>
          </Select>
        </FormControl>
        {role == 1 && <EngineerInput />}
        {role == 2 && <CompanyInput />}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { registerEngineer, registerCompany })(Register)
