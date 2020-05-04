import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SkillsComponent from './Skills/Index';
import {
  Container,
  Grid,
  Button,
  TextField,
  Avatar,
  Badge,
  makeStyles
} from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import DateFnsUtils from '@date-io/date-fns';
import * as moment from 'moment';
import { connect } from 'react-redux';
import {
  getCurrentProfileEngineer,
  getSkills,
  updateProfileEngineer 
} from '../../../../actions/engineer';
import Spinner from '../../../Spinner/Index';

const renderFunction = ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
  <div>
    <TextField
      {...getInputProps()} 
      margin="normal"
      variant="outlined"
      label="Location"
      fullWidth
    />
    <div className="autocomplete-dropdown-container">
      {loading && <Spinner />}
      {suggestions.map(suggestion => {
        const className = suggestion.active
          ? 'suggestion-item--active'
          : 'suggestion-item';
        const style = suggestion.active
          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
          : { backgroundColor: '#ffffff', cursor: 'pointer' };
        return (
          <div
            {...getSuggestionItemProps(suggestion, {
              className,
              style,
            })}
          >
            <span style={{
              backgroundColor: '#ea80fc',
              display: 'inline-block',
              height: '200',
              padding: '8px',
              color: 'white',
            }}>{suggestion.description}</span>
          </div>
        );
      })}
    </div>
  </div>
);

const ProfileEdit = ({
  getCurrentProfileEngineer,
  getSkills,
  updateProfileEngineer,
  engineer: { engineer, skills, loading },
  auth: { user },
  history
  }) => {
  const Toast = Swal.mixin({
    position: 'top-end',
    toast: true,
    timer: 3000,
    showConfirmButton: false,
    timerProgressBar: false,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  let datasSkillsEngineer = engineer.data && engineer.data.skills;
  let datasSkillsIdEngineer = engineer.data && engineer.data.skills_id;
  let idProps = engineer.data && engineer.data.id;
  let avatarProps = engineer.data && engineer.data.avatar;
  let nameProps = engineer.data && engineer.data.name;
  let emailProps = engineer.data && engineer.data.email;
  let descriptionProps = engineer.data && engineer.data.description;
  let telephoneProps = engineer.data && engineer.data.telephone;
  let showcaseProps = engineer.data && engineer.data.showcase;
  let salaryProps = engineer.data && engineer.data.salary;
  let locationProps = engineer.data && engineer.data.location;
  let user_id = user.data && user.data.id;
  let birthdate = engineer.data && engineer.data.birthdate
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    description: "",
    showcase: "",
    salary: "",
    telephone: ""
  });
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      }
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10)
    },
  }));
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [avatarNotEdited, setAvatarNotEdited] = useState("");
  const [avatarDefault, setDefaultAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState("");
  const [skillsMask, setSkills] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfileEngineer();
      await getSkills();
    }
    fetchData();
    setFormData({
      id: idProps,
      name: nameProps,
      email: emailProps,
      description: descriptionProps,
      showcase: showcaseProps,
      salary: salaryProps,
      telephone: telephoneProps
    });
    if(typeof birthdate === "undefined" || birthdate === "0000-00-00") {
      setSelectedDate(new Date());
    } else {
      setSelectedDate(new Date(birthdate));
    }
    setDefaultAvatar(`http://localhost:5000/images/engineer/${avatarProps}`);
    setLocation(`${locationProps}`);
    setAvatarNotEdited(`${avatarProps}`);
  },[getCurrentProfileEngineer, getSkills, idProps, avatarProps, nameProps, emailProps, descriptionProps, showcaseProps, salaryProps, telephoneProps, locationProps, birthdate]);
  const { id, name, email, description, showcase, telephone, salary } = formData;
  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  const handleChange = address => {
    setLocation(address);
  };
  const handleSelect = async address => {
    try {
      const results = await geocodeByAddress(address);
      setLocation(results[0].formatted_address);
    } catch(error) {
      console.log(error);
    }
  };
  const handleDate = (value) => {
    setSelectedDate(value);
  }
  let getFile;
  const handleFile = (event) => {
    getFile.click();
  }
  const handleAvatar = (event) => {
    if (event.target.files && event.target.files[0]) {
      let error = false;
      let size = event.target.files[0].size;
      let extension = event.target.files[0].name.split(".")[1];
      let reader = new FileReader();
      try {
        if(size > 1024000) {
          error = true;
          throw new Error("File size cannot larger than 1MB.");
        }
        if(!isImage(extension)) {
          error = true;
          throw new Error("File type allowed: PNG, JPG, JPEG, GIF, SVG, BMP.");
        }
        if(error === false) {
          setAvatarFile(event.target.files[0]);
          reader.onload = (e) => {
            setDefaultAvatar(e.target.result);
          }
          reader.readAsDataURL(event.target.files[0]);
        }
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        });
      }
    }
  }
  const isImage = (extension) => {
    switch (extension) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
      case 'bmp':
        return true;
      default:
    }
    return false;
  }
  const onSubmit = async (event) =>  {
    event.preventDefault();
    let convert_date = moment(selectedDate).format("YYYY-MM-DD");
    let avatar;
    if(avatarFile === "") {
      avatar = avatarNotEdited;
    } else {
      avatar = avatarFile
    }
    try {
      if(name.length < 3) {
        throw new Error("Name Minimum 3 Character.");
      }
      if(description.length < 200) {
        throw new Error("Description Minimum 200 Character.");
      }
      let data = new FormData();
      data.set("user_id", user_id);
      data.set("avatar", avatar);
      data.set("name", name ? name : "");
      data.set("email", email ? email: "");
      data.set("birthdate", convert_date);
      data.set("description", description ? description : "");
      data.set("skills", JSON.stringify(skillsMask));
      // menggunakan JSON.stringify agar tidak [object object] datanya
      // di JSON.parse di backend
      // cek array length pake 0 bukan null
      data.set("showcase", showcase ? showcase : "");
      data.set("telephone", telephone ? telephone : "");
      data.set("salary", salary ? salary : "");
      data.set("location", location ? location : "");
      const engineer_id = id;
      await updateProfileEngineer(engineer_id, data);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message
      });
    } finally {
      history.push("/engineers");
      Toast.fire({
        icon: "success",
        title: "Yay ! Profile Updated."
      });
    }
  }
  return loading ? ( <Spinner /> ) : (
    <>
      <div className="backdrop-bottom"></div>
      <Container fixed>
        <Grid
          container
          className="my-5"
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid className="p-5 white rounded" item md={8} xs={12}>
            <form onSubmit={(event) => onSubmit(event)}>
              <div className={classes.root}>
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent={
                    <Grid
                      item
                      className="p-1 rounded"
                      style={{
                        backgroundColor: '#ea80fc'
                      }}
                    >
                    <CreateOutlinedIcon
                      onClick={handleFile}
                      className="text-white"
                      style={{
                        cursor: 'pointer'
                      }}
                    />
                    <input
                      ref={input => getFile = input}
                      onChange={handleAvatar}
                      style={{ display: 'none' }}
                      type="file"
                    />
                    </Grid>
                  }
                >
                <Avatar
                  className={classes.large}
                  alt={name}
                  src={`${avatarDefault}`}
                />
                </Badge>
              </div>
              <TextField
                onChange={onChange}
                value={name}
                name="name"
                margin="normal"
                variant="outlined"
                label="Name"
                fullWidth
              />
              <TextField
                onChange={onChange}
                value={email}
                name="email"
                margin="normal"
                variant="outlined"
                label="E-mail Address"
                fullWidth
                disabled
                />
              <TextField
                onChange={onChange}
                value={description}
                multiline
                rows="4"
                name="description"
                margin="normal"
                variant="outlined"
                label="Description"
                fullWidth
              />
              <SkillsComponent
                datasSkillsEngineer={datasSkillsEngineer}
                datasSkillsIdEngineer={datasSkillsIdEngineer}
                skills={skills}
                setSkills={setSkills} 
                skillsMask={skillsMask}
              />
              <PlacesAutocomplete
                value={location}
                onChange={handleChange}
                onSelect={handleSelect}
              >
              { renderFunction }
              </PlacesAutocomplete>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  onChange={handleDate}
                  value={selectedDate}
                  margin="normal"
                  inputVariant="outlined"
                  label="Birthdate"
                  format="yyyy-MM-d"
                  fullWidth
                />
              </MuiPickersUtilsProvider>
              <TextField
                onChange={e => onChange(e)}
                value={showcase}
                name="showcase"
                margin="normal"
                variant="outlined"
                label="Showcase"
                fullWidth
              />
              <MaskedInput
                mask={['(',/[1-9]/,/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                placeholderChar={'_'}
                onChange={e => onChange(e)}
                showMask
                render={(ref, props) => {
                  return (
                    <TextField
                      value={telephone}
                      name="telephone"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      inputRef={ref}
                      {...props}
                    />
                  )
                }}
              />
              <NumberFormat
                onChange={(e) => onChange(e)}
                value={salary}
                name="salary"
                margin="normal"
                variant="outlined"
                label="salary"
                decimalSeparator=","
                thousandSeparator="."
                prefix="Rp "
                customInput={TextField}
                fullWidth
              />
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  component={ Link } to="/engineers"
                >
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Update Profile
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  ) 
}
const mapStateToProps = state => ({
  engineer: state.engineer,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfileEngineer, getSkills, updateProfileEngineer }
)(withRouter(ProfileEdit));
