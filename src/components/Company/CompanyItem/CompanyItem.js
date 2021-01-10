import React from "react"
import { Link } from "react-router-dom"
import { Container, Grid, makeStyles } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import defaultImage from "../../../images/default.png"
import LazyLoad from "react-lazy-load"
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
                <Link className="text-white" to={`companies/profile/${company.slug}`}>
                  <LazyLoad>
                    <img className="image rounded" src={`${process.env.REACT_APP_GET_LOCAL_IMAGES_COMPANY}/${company.logo}`} alt={company.name} />
                  </LazyLoad>
                </Link>
                <div className="masonry-description">
                  <p className="mb-1"> {company.name} </p>
                  <p className="mb-1"> {company.telephone} </p>
                  <p className="mb-1"> {company.email} </p>
                  <p className="mb-1"> {company.location} </p>
                  <p className="mb-1">{company.description}</p>
                </div>
              </div>
            ))}
        </div>
        <div className={classes.root}>
          <Pagination count={pageCount} onChange={(event, page) => handlePage(event, page)} page={currentPage} />
        </div>
      </Grid>
    </Container>
  )
}
export default CompanyItem
