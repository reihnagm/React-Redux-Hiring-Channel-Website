import React from "react"
import { Container, Grid, Paper, Button, Avatar, makeStyles } from "@material-ui/core"
import { Link } from "react-router-dom"
import { Editor } from "@tinymce/tinymce-react"
import { API_KEY_TINYMCE } from "../../../../configs/constants"
import ReactHtmlParser from "react-html-parser"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"
import EmailIcon from "@material-ui/icons/Email"
import PhoneIcon from "@material-ui/icons/Phone"
import LocationOnIcon from "@material-ui/icons/LocationOn"

const ProfileItem = ({ company }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      position: "relative"
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginBottom: "20px"
    }
  }))
  const classes = useStyles()
  return (
    <div>
      <div className="backdrop-top"></div>
      <Container className="mt-64" fixed>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar} src={`${process.env.REACT_APP_GET_LOCAL_IMAGES_COMPANY}/${company.logo}`} alt={company.name} />
                <Grid container>
                  <Grid item md={2} xs={10}>
                    <AccountBalanceIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {company.name} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <EmailIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {company.email} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <LocationOnIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p className="leading-loose"> {company.location === null ? "" : company.location} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <PhoneIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {company.telephone === null ? "" : company.telephone} </p>
                  </Grid>
                </Grid>
                <Grid>
                  <Button type="button" variant="contained" color="primary" component={Link} to="/engineers">
                    Back
                  </Button>
                </Grid>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <p> {company.description} </p>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <Editor value={company.content} init={{ menubar: false, toolbar: false }} inline={false} disabled={true} apiKey={API_KEY_TINYMCE} />
                {/* <div dangerouslySetInnerHTML={{ __html: company.content }} /> */}
                {/* {ReactHtmlParser(company.content)} */}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default ProfileItem
