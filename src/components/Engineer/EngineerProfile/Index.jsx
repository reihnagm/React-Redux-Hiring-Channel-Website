import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Button, Avatar, makeStyles } from '@material-ui/core';
import Swal from 'sweetalert2';
import Spinner from '../../Spinner/Index';
import defaultImage from '../../../images/default.png';
import { getCurrentProfileEngineer, deleteProfileEngineer } from '../../../actions/engineer';
const Profile = ({ getCurrentProfileEngineer, deleteProfileEngineer, engineer: { engineer, loading }, history }) => {
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
    let avatar = engineer.data && engineer.data.avatar;
    let engineer_id = engineer.data && engineer.data.id;
    let user_id = engineer.data && engineer.data.user_id;
    let name = engineer.data && engineer.data.name;
    let email = engineer.data && engineer.data.email;
    let description = engineer.data && engineer.data.description;
    let skills = engineer.data && engineer.data.skills;
    let location = engineer.data && engineer.data.location;
    let showcase = engineer.data && engineer.data.showcase;
    let birthdate = engineer.data && engineer.data.birthdate;
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
    { getCurrentProfileEngineer, deleteProfileEngineer }
)(Profile)
