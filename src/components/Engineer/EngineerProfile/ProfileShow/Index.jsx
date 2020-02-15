import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Button, Avatar, makeStyles } from '@material-ui/core';
import Swal from 'sweetalert2';
import Spinner from '../../../Spinner/Index';
import defaultImage from '../../../../images/default.png';
import { getProfileEngineerBySlug } from '../../../../actions/engineer';
const Profile = ({ getProfileEngineerBySlug, engineer: { engineer, loading }, history, match }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2)
        },
        large: {
            width: theme.spacing(10),
            height: theme.spacing(10)
        },
    }));
    const classes = useStyles();
    let avatar = engineer.avatar;
    let name = engineer.name;
    let email = engineer.email;
    let description =  engineer.description;
    let skills = engineer.skills;
    let location = engineer.location;
    let showcase =  engineer.showcase;
    let birthdate = engineer.birthdate;
    let telephone = engineer.telephone;
    useEffect(() => {
       const _fetchData = async () => {
           await getProfileEngineerBySlug(match.params.slug);
       }
       _fetchData();
   }, [getProfileEngineerBySlug, match.params.slug]);
    let n = new Date(birthdate);
    let y = n.getFullYear();
    let d = n.getDate();
    let m = n.getMonth()+1;
    let months = ["January","February","March","April","May","June",'July',"August","September","October","November","December"];
    let thisMonth  = months[m-1];
    if(isNaN(y) || isNaN(d) || typeof y === "undefined") {
        y = '';
        d = '';
        thisMonth = '';
    }
    let displayDate = d +' '+ thisMonth +' '+ y ;
    return loading ? ( <Spinner /> ) : (
        <>
            <div style={{
                background: '#ea80fc',
                position:"absolute",
                zIndex: -1,
                width:'100%',
                top: "0px",
                left: "0px",
                right: "0px",
                height: "300px" }}>
            </div>
            <Container className="mt-64" Fixed>
                <div className={classes.root}>
                    <Grid container spacing={8}>
                        <Grid item md={4} xs={12}>
                            <Paper className={classes.paper}>
                                <Avatar
                                    className={classes.large}
                                    src={avatar ? `http://localhost:5000/images/engineer/${avatar}` : ''} alt={name}
                                />
                                <p className="my-2"> {name} </p>
                                <p className="my-2"> {email} </p>
                                <p className="my-2"> {telephone} </p>
                                <p className="my-2"> {showcase} </p>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    component={ Link } to="/engineers">
                                    Back
                                </Button>
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
        </>
    )
}
const mapStateToProps = state => ({
    engineer: state.engineer
})
export default connect(
    mapStateToProps,
    { getProfileEngineerBySlug }
)(Profile)
