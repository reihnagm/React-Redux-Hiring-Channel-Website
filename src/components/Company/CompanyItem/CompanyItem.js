import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { Container, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button, makeStyles } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import ReactHtmlParser from "react-html-parser"
import defaultImage from "../../../images/default.png"
import LazyLoad from "react-lazy-load"
import ProfileSkillsItem from "../CompanyProfile/ProfileSkillsItem/ProfileSkillsItem"

const CompanyItem = ({ companies, handlePage, currentPage, pageCount }) => {
  const [readMore, setReadMore] = useState(false)
  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 280,
      margin: 10
      // "& > *": {
      //   marginBottom: theme.spacing(8)
      // }
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
                    {company.name}
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
                      Job Type : {company.jobtypes.name}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
              {/* <CardActions>
                <Button component={Link} to={`companies/${company.slug}`} size="small" color="primary">
                  Read More
                </Button>
              </CardActions> */}
            </Card>
          ))}
      </Grid>
      <div className="flex justify-c-center my-10">
        <Pagination count={pageCount ?? 0} onChange={(event, page) => handlePage(event, page)} page={currentPage ?? 1} />
      </div>
    </Container>
    // <Container fixed>
    //   <Grid container direction="row" justify="center" alignItems="center">
    //     <div className="masonry-container">
    //       {companies &&
    //         companies.map(company => (
    //           <div className="masonry-item text-white" key={company.uid}>
    //             <Link className="text-white" to={`/companies/${company.slug}`}>
    //               <img className="image rounded" src={`${process.env.REACT_APP_GET_LOCAL_IMAGES_COMPANY}/${company.logo}`} alt={company.name} />
    //             </Link>
    //             <div className="masonry-description">
    //               <h1 className="masonry-job-title mb-1"> {company.title} </h1>
    //               <p className="masonry-salary mb-1"> {company.salary} </p>
    //               <p className="masonry-content mb-1">Job description & requirements <br/> Read More</p>
    //               <div className="mb-1">
    //                 Requirements :
    //                 <ProfileSkillsItem items={company.skills} />
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //     </div>
    //     <div className={classes.root}>
    //       <Pagination count={pageCount ?? 0} onChange={(event, page) => handlePage(event, page)} page={currentPage ?? 1} />
    //     </div>
    //   </Grid>
    // </Container>
  )
}
export default CompanyItem
