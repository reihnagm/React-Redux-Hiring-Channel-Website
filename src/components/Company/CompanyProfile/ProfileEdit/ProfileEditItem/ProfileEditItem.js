import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"
import { Container, Grid, Button, TextField, Avatar, Badge, makeStyles } from "@material-ui/core"
import { auth, bytesToSize, isImage, Toast } from "../../../../../utils/helper"
import { API_KEY_TINYMCE } from "../../../../../configs/constants"
import { Editor } from "@tinymce/tinymce-react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined"
import MaskedInput from "react-text-mask"

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
const ProfileEditItem = ({ company, update, history }) => {
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
  const [postJob, setPostJob] = useState("")
  const [location, setLocation] = useState("")
  const [logoNotEdited, setLogoNotEdited] = useState("")
  const [logoDefault, setDefaultLogo] = useState("")
  const [logoFile, setLogoFile] = useState("")
  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    email: "",
    description: "",
    telephone: ""
  })

  useEffect(() => {
    setFormData({
      uid: company.uid === null ? "" : company.uid,
      name: company.name === null ? "" : company.name,
      email: company.email === null ? "" : company.email,
      description: company.description === null ? "" : company.description,
      telephone: company.telephone === null ? "" : company.telephone
    })
    company.content === null ? setPostJob("") : setPostJob(company.content)
    company.location === null ? setLocation("") : setLocation(company.location)
    setDefaultLogo(`${process.env.REACT_APP_GET_LOCAL_IMAGES_COMPANY}/${company.logo}`)
    setLogoNotEdited(company.logo)
  }, [company])

  const { uid, name, email, description, telephone } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  // const onEditorChange = (content, editor) => {
  //   setPostJob(content)
  // }
  const onEditorChange = content => {
    setPostJob(content)
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
  const handleLogo = e => {
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
        setLogoFile(e.target.files[0])
        reader.onload = e => {
          setDefaultLogo(e.target.result)
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
    let logo
    if (logoFile === "") {
      logo = logoNotEdited
    } else {
      logo = logoFile
    }
    try {
      let fd = new FormData()
      fd.set("uid", uid)
      fd.set("userUid", auth().uid)
      fd.set("logo", logo)
      fd.set("name", name)
      fd.set("email", email)
      fd.set("description", description)
      fd.set("telephone", telephone)
      fd.set("location", location)
      fd.set("postJob", postJob)
      await update(fd, history)
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: err.message
      })
    }
  }
  return (
    <>
      <Container fixed>
        <Grid container className="my-5" direction="row" justify="center" alignItems="center">
          <Grid className="p-5 white rounded" item md={8} xs={12}>
            <form onSubmit={e => onSubmit(e)}>
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
                      <input ref={input => (fileRef = input)} onChange={handleLogo} style={{ display: "none" }} type="file" />
                    </Grid>
                  }
                >
                  <Avatar className={classes.large} alt={name} src={`${logoDefault}`} />
                </Badge>
              </div>
              <TextField onChange={onChange} value={name ?? ""} name="name" margin="normal" variant="outlined" label="Name" fullWidth />
              <TextField onChange={onChange} value={email ?? ""} name="email" margin="normal" variant="outlined" label="E-mail Address" fullWidth disabled />
              <TextField onChange={onChange} value={description ?? ""} multiline rows="4" name="description" margin="normal" variant="outlined" label="Description" fullWidth />
              <PlacesAutocomplete value={location ?? ""} onChange={handleChange} onSelect={handleSelect}>
                {renderFunction}
              </PlacesAutocomplete>
              <MaskedInput mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} placeholderChar={"_"} onChange={e => onChange(e)} render={(ref, props) => <TextField value={telephone ?? ""} name="telephone" margin="normal" variant="outlined" label="Telephone" fullWidth inputRef={ref} {...props} />} />
              {/* <Editor
                value={postJob}
                apiKey={API_KEY_TINYMCE}
                init={{
                  height: 400,
                  menubar: false,
                  plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount"],
                  toolbar: "undo redo | formatselect | link image | code | bold italic backcolor |  alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help"
                }}
                onEditorChange={onEditorChange}
              /> */}
              <ReactQuill theme="snow" value={postJob} onChange={onEditorChange} />
              <Grid container direction="row" justify="center" alignItems="center">
                <Button type="button" variant="contained" color="primary" component={Link} to="/companies">
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
    </>
  )
}

export default ProfileEditItem
