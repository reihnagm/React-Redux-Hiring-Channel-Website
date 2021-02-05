import React from "react"
import { useHistory } from "react-router-dom"
import { Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Button, makeStyles } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import ReactHtmlParser from "react-html-parser"
import ProfileSkillsItem from "../CompanyProfile/ProfileSkillsItem/ProfileSkillsItem"

const CompanyItem = ({ companies, handlePage, currentPage, pageCount }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 280,
      margin: 10
    },
    media: {
      height: 200
    }
  }))
  const classes = useStyles()
  const history = useHistory()
  return (
    <Container fixed>
      <Grid container direction="row" justify="start" alignItems="center">
        {companies &&
          companies.map(company => (
            <Card className={classes.root}>
              <CardActionArea onClick={() => history.push(`companies/detail/${company.slug}`)}>
                <CardMedia className={classes.media} image={`${process.env.REACT_APP_IMAGES_COMPANY}/${company.logo}`} title={company.logo} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {company.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <span className="card-salary"> {company.salary} </span>
                  </Typography>
                  <div className="my-3">
                    <div className="my-3">
                      <Typography variant="body2" color="textSecondary" component="p">
                        Job description & requirements
                      </Typography>
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <div style={{ height: "45px", overflow: "hidden" }}>{ReactHtmlParser(company.content)}</div>
                    </Typography>
                  </div>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Requirements : <ProfileSkillsItem items={company.skills} />
                  </Typography>
                  <div className="mt-3">
                    <Typography variant="body2" color="textSecondary" component="p">
                      Job Type : {company.jobtypes}
                    </Typography>
                  </div>
                  <div className="mt-3">
                    <Typography variant="body2" color="textSecondary" component="p">
                      Vacancies : {company.vacancies}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </Grid>
      <div className="flex justify-c-center my-10">
        <Pagination count={pageCount ?? 0} onChange={(event, page) => handlePage(event, page)} page={currentPage ?? 1} />
      </div>
    </Container>
  )
}
export default CompanyItem
