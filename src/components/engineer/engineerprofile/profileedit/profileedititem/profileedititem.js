import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"
import { Container, Chip, Grid, Button, TextField, Avatar, Badge, makeStyles } from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import { isImage, bytesToSize, Toast } from "../../../../../utils/helper"
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp"
import Autocomplete from "@material-ui/lab/Autocomplete"
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined"
import * as moment from "moment"
import MaskedInput from "react-text-mask"
import NumberFormat from "react-number-format"
import DateFnsUtils from "@date-io/date-fns"

const renderFunction = ({ getInputProps, suggestions, getSuggestionItemProps }) => (
  <div>
    <TextField {...getInputProps()} margin="normal" variant="outlined" label="Location" fullWidth />
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
                height: "200px",
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
const ProfileEditItem = ({ engineer, allSkills, update, history }) => {
  let fileRef
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
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [location, setLocation] = useState("")
  const [avatarNotEdited, setAvatarNotEdited] = useState("")
  const [avatarDefault, setDefaultAvatar] = useState("")
  const [avatarFile, setAvatarFile] = useState("")
  const [skillsSelectedMask, setSkills] = useState([])
  const [skillsDeleted, setSkillsDeleted] = useState([])
  const [formData, setFormData] = useState({
    uid: "",
    fullname: "",
    nickname: "",
    email: "",
    description: "",
    showcase: "",
    salary: "",
    telephone: ""
  })

  useEffect(() => {
    setFormData({
      uid: engineer && engineer.uid === null ? "" : engineer.uid,
      fullname: engineer && engineer.fullname === null ? "" : engineer.fullname,
      nickname: engineer && engineer.nickname === null ? "" : engineer.nickname,
      email: engineer && engineer.email === null ? "" : engineer.email,
      description: engineer && engineer.description === null ? "" : engineer.description,
      showcase: engineer && engineer.showcase === null ? "" : engineer.showcase,
      salary: engineer && engineer.salary === null ? "" : engineer.salary,
      telephone: engineer && engineer.telephone === null ? "" : engineer.telephone
    })
    engineer && engineer.location === null ? setLocation("") : setLocation(engineer.location)
    engineer && engineer.birthdate === null ? setSelectedDate(moment(new Date()).format("YYYY-MM-DD")) : setSelectedDate(moment(engineer.birthdate).format("YYYY-MM-DD"))
    setDefaultAvatar(`${process.env.REACT_APP_GET_LOCAL_IMAGES_ENGINEER}/${engineer.avatar}`)
    setAvatarNotEdited(engineer.avatar)
    setSkills(engineer.skills)
  }, [engineer])
  const renderedSkills =
    skillsSelectedMask &&
    skillsSelectedMask.map((option, i) => {
      return (
        <span className={classes.chip} key={i}>
          <Chip
            label={option.name}
            deleteIcon={<RemoveIcon />}
            onDelete={() => {
              setSkills(skillsSelectedMask.filter(entry => entry !== option))
              setSkillsDeleted(oldArray => [...oldArray, skillsSelectedMask.filter(entry => entry === option)])
            }}
          />
        </span>
      )
    })
  const { uid, fullname, nickname, email, description, showcase, telephone, salary } = formData
  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  const handleDate = value => {
    setSelectedDate(value)
  }
  const handleChange = address => {
    setLocation(address)
  }
  const handleSelect = async address => {
    try {
      const results = await geocodeByAddress(address)
      setLocation(results[0].formatted_address)
    } catch (err) {
      console.log(err)
    }
  }
  const handleFile = _ => {
    fileRef.click()
  }
  const handleAvatar = e => {
    if (e.target.files && e.target.files[0]) {
      let size = bytesToSize(e.target.files[0].size)
      let ext = e.target.files[0].name.split(".").pop()
      let reader = new FileReader()
      try {
        if (size > process.env.REACT_APP_IMAGE_SIZE) {
          throw new Error("File size cannot larger than 1MB")
        }
        if (!isImage(ext)) {
          throw new Error("File type allowed: PNG, JPG, JPEG, GIF, SVG, BMP")
        }
        setAvatarFile(e.target.files[0])
        reader.onload = e => {
          setDefaultAvatar(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: err.message
        })
      }
    }
  }
  const onSubmit = async e => {
    e.preventDefault()
    let convertDate = moment(selectedDate).format("YYYY-MM-DD")
    let avatar
    if (avatarFile === "") {
      avatar = avatarNotEdited
    } else {
      avatar = avatarFile
    }
    try {
      if (fullname.length < 3) {
        throw new Error("Fullname Minimum 3 Character")
      }
      if (nickname.length < 3) {
        throw new Error("Nickname Minimum 3 Character")
      }
      let fd = new FormData()
      fd.set("uid", uid)
      fd.set("avatar", avatar)
      fd.set("fullname", fullname)
      fd.set("nickname", nickname)
      fd.set("email", email)
      fd.set("birthdate", convertDate)
      fd.set("description", description)
      fd.set("skillsStore", JSON.stringify(skillsSelectedMask))
      fd.set("skillsDestroy", JSON.stringify(skillsDeleted))
      fd.set("showcase", showcase)
      fd.set("telephone", telephone)
      fd.set("salary", salary)
      fd.set("location", location)
      update(fd)
        .then(_ => {
          Toast.fire({
            icon: "success",
            title: "Profile Updated"
          })
          history.push("/engineers")
        })
        .catch(_ => {
          throw new Error("Bad Connection or Server Unreachable")
        })
    } catch (e) {
      Toast.fire({
        icon: "error",
        title: e.message
      })
    }
  }
  return (
    <div>
      <Container fixed>
        <Grid container className="my-5" direction="row" justify="center" alignItems="center">
          <Grid className="p-5 white rounded" item md={8} xs={12}>
            <form onSubmit={event => onSubmit(event)}>
              <div className={classes.root}>
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
                  <Avatar className={classes.large} alt={fullname} src={`${avatarDefault}`} />
                </Badge>
              </div>
              <TextField onChange={onChange} value={fullname ?? ""} name="fullname" margin="normal" variant="outlined" label="Fullname" fullWidth />
              <TextField onChange={onChange} value={nickname ?? ""} name="nickname" margin="normal" variant="outlined" label="Nickname" fullWidth />
              <TextField onChange={onChange} value={email ?? ""} name="email" margin="normal" variant="outlined" label="E-mail Address" fullWidth disabled />
              <TextField onChange={onChange} value={description ?? ""} multiline rows="4" name="description" margin="normal" variant="outlined" label="Description" fullWidth />
              <Autocomplete
                multiple
                filterSelectedOptions
                freeSolo
                renderTags={() => {}}
                value={skillsSelectedMask ?? ""}
                options={allSkills}
                onChange={(_, value) => {
                  setSkills(value)
                }}
                getOptionLabel={allSkills => allSkills.name ?? ""}
                getOptionSelected={(option, value) => {
                  return option.uid === value.uid
                }}
                renderInput={params => <TextField {...params} margin="normal" label="Skills" placeholder="Skills" variant="outlined" fullWidth />}
              />
              <div>{renderedSkills}</div>
              <PlacesAutocomplete value={location ?? ""} onChange={handleChange} onSelect={handleSelect}>
                {renderFunction}
              </PlacesAutocomplete>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  onChange={handleDate}
                  value={selectedDate}
                  KeyboardButtonProps={{
                    onFocus: _ => {
                      setIsOpen(true)
                    }
                  }}
                  PopoverProps={{
                    disableRestoreFocus: true,
                    onClose: () => {
                      setIsOpen(false)
                    }
                  }}
                  InputProps={{
                    onFocus: () => {
                      setIsOpen(true)
                    }
                  }}
                  margin="normal"
                  variant="inline"
                  inputVariant="outlined"
                  label="Birthdate"
                  format="yyyy-MM-d"
                  fullWidth
                  open={isOpen}
                />
              </MuiPickersUtilsProvider>
              <TextField onChange={e => onChange(e)} value={showcase ?? ""} name="showcase" margin="normal" variant="outlined" label="Showcase" fullWidth />
              <MaskedInput mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} placeholderChar={"_"} onChange={e => onChange(e)} render={(ref, props) => <TextField value={telephone ?? ""} name="telephone" margin="normal" variant="outlined" label="Telephone" fullWidth inputRef={ref} {...props} />} />
              <NumberFormat onChange={e => onChange(e)} value={salary ?? ""} name="salary" margin="normal" variant="outlined" label="salary" decimalSeparator="," thousandSeparator="." prefix="Rp " allowNegative={false} customInput={TextField} fullWidth />
              <Grid container direction="row" justify="center" alignItems="center">
                <Button type="button" variant="contained" color="primary" component={Link} to="/engineers">
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default ProfileEditItem
