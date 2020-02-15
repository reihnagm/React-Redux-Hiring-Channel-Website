import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Button, Avatar, makeStyles } from '@material-ui/core';
import Swal from 'sweetalert2';
import Spinner from '../../../Spinner/Index';
import defaultImage from '../../../../images/default.png';
import { getProfileCompanyBySlug, deleteProfileCompany } from '../../../../actions/company';
const Profile = ({ getProfileCompanyBySlug, deleteProfileCompany, company: { company, loading }, history, match }) => {
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
    let logo = company.logo;
    let name = company.name;
    let email = company.email;
    let description = company.description;
    let telephone = company.telephone;
    useEffect(() => {
        const fetchData = async () => {
            await getProfileCompanyBySlug(match.params.slug);
        }
        fetchData();
    }, [getProfileCompanyBySlug, match.params.slug]);
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
                                    src={`http://localhost:5000/images/company/${logo}`} alt={name}
                                />
                                <p className="my-2"> {name} </p>
                                <p className="my-2"> {email} </p>
                                <p className="my-2"> {telephone} </p>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    component={ Link } to="/companies">
                                    Back
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Paper className={classes.paper}>
                                <p> {description} </p>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
}
const mapStateToProps = state => ({
    company: state.company
})
export default connect(
    mapStateToProps,
    { getProfileCompanyBySlug }
)(Profile)
