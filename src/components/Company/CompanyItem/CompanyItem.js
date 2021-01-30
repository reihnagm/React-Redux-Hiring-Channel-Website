import React from "react"
import { Link } from "react-router-dom"
import { Container, Grid, makeStyles } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import ReactHtmlParser from "react-html-parser"
import defaultImage from "../../../images/default.png"
import LazyLoad from "react-lazy-load"
import ProfileSkillsItem from "../CompanyProfile/ProfileSkillsItem/ProfileSkillsItem"

const CompanyItem = ({ companies, handlePage, currentPage, pageCount }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      "& > *": {
        marginBottom: theme.spacing(8)
      }
    }
  }))
  const classes = useStyles()
  return (
    <Container fixed>
      <Grid container direction="row" justify="center" alignItems="center">
        <div className="masonry-container">
          {companies &&
            companies.map(company => (
              <div className="masonry-item text-white" key={company.uid}>
                <Link className="text-white" to={`companies/detail/${company.slug}`}>
                  <LazyLoad>
                    <img className="image rounded" src={`${process.env.REACT_APP_GET_LOCAL_IMAGES_COMPANY}/${company.logo}`} alt={company.name} />
                  </LazyLoad>
                </Link>
                <div className="masonry-description">
                  <h1 className="masonry-job-title mb-1"> {company.title} </h1>
                  <p className="masonry-salary mb-1"> {company.salary} </p>
                  <p className="masonry-content mb-1">Job description & requirements ..........................</p>
                  <div className="mb-1">
                    Requirements :
                    <ProfileSkillsItem items={company.skills} />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className={classes.root}>
          <Pagination count={pageCount ?? 0} onChange={(event, page) => handlePage(event, page)} page={currentPage ?? 1} />
        </div>
      </Grid>
    </Container>
  )
}
export default CompanyItem
