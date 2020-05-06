import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import CakeIcon from '@material-ui/icons/Cake';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import { Container, Grid, Paper, Button, Avatar, makeStyles } from '@material-ui/core';
import Swal from 'sweetalert2';
import Spinner from '../../Spinner/Index';
import { getCurrentProfileEngineer, deleteProfileEngineer } from '../../../actions/engineer';
const Profile = ({ 
  getCurrentProfileEngineer, 
  deleteProfileEngineer, 
  engineer: { engineer, loading }, 
  history }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      position: 'relative'
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginBottom: '20px' 
    },
  }));
  const classes = useStyles();
  let avatar = engineer.data && engineer.data.avatar;
  let engineer_id = engineer.data && engineer.data.id;
  let user_id = engineer.data && engineer.data.user_id;
  let name = engineer.data && engineer.data.name;
  let email = engineer.data && engineer.data.email;
  let description = engineer.data && engineer.data.description;
  let skills = engineer.data && engineer.data.skills;
  let location = engineer.data && engineer.data.location;
  let showcase = engineer.data && engineer.data.showcase;
  let birthdate = engineer.data && moment(engineer.data.birthdate).format("D MMMM YYYY");
  let telephone = engineer.data && engineer.data.telephone;
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfileEngineer();
    }
    fetchData();
  }, [getCurrentProfileEngineer]);
  const deleteProfileAccount = async () => {
    let result = await Swal.fire({
      title: 'are your sure want to delete account ?',
      text: 'IMPORTANT: data is not back again when you decided to delete an account.',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'red',
      cancelButtonColor: 'rgb(201, 152, 227)',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    });
    if (result.value) {
      deleteProfileEngineer(engineer_id, user_id);
      setTimeout(() => {
        history.push("/");
      }, 800)
    }
  }
  return loading ? ( <Spinner /> ) : (
    <Fragment>
      <div className="backdrop-top"></div>
        <Container className="mt-64" fixed>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Paper className={classes.paper}>
                  <Avatar
                    className={classes.avatar}
                    src={avatar ? `http://localhost:5000/images/engineer/${avatar}` : ''} 
                    alt={name}
                  />
                  <Grid container>
                    <Grid item md={2} xs={2}>
                      <PersonIcon />
                    </Grid>
                    <Grid item md={10} xs={10}>
                      <p> {name} </p>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={2} xs={2}>
                      <EmailIcon />
                    </Grid>
                    <Grid item md={10} xs={10}>
                      <p> {email} </p>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={2} xs={2}>
                      <CakeIcon />
                    </Grid>
                    <Grid item md={10} xs={10}>
                      <p> {birthdate} </p>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={2} xs={2}>
                      <LocationOnIcon />
                    </Grid>
                    <Grid item md={10} xs={10}>
                      <p className="leading-loose"> {location} </p>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={2} xs={2}>
                      <PhoneIcon />
                    </Grid>
                    <Grid item md={10} xs={10}>
                      <p> {telephone} </p>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={2} xs={2}>
                      <SlideshowIcon />
                    </Grid>
                    <Grid item md={10} xs={10}>
                      <p> {showcase} </p>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary">
                      Delete Account
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      component={ Link } to="/engineers">
                      Back
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item md={4} xs={12}>
                <Paper className={classes.paper}>
                  <p> {description} </p>
                </Paper>
              </Grid>
              <Grid item md={4} xs={12}>
                <Paper className={classes.paper}>
                  <p className="mb-2">Skills</p>
                  <p>{skills}</p>
                </Paper>
              </Grid>
            </Grid>
          </div>
      </Container>
    </Fragment>
  )
}
const mapStateToProps = state => ({
  engineer: state.engineer
})
export default connect(
  mapStateToProps,
  { getCurrentProfileEngineer, deleteProfileEngineer }
)(Profile)
