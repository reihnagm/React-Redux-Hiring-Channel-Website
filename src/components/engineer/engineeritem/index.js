import React from "react"
import { Link } from "react-router-dom"
import { Container, Grid } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import LazyLoad from "react-lazy-load"
import ProfileSkillsItem from "../engineerprofile/profileskillsitem/profileskillsitem"
const EngineerItem = ({ items, handlePage, currentPage, pageCount }) => {
  return (
    <>
      <Container fixed>
        <Grid container direction="row" justify="center" alignItems="center">
          <div className="masonry-container">
            {items &&
              items.map(item => {
                return (
                  <div className="masonry-item" key={item.uid}>
                    <Link className="text-white" to={`engineers/profile/${item.slug}`}>
                      <LazyLoad>
                        <img className="image" src={item.avatar == "null" ? `${process.env.REACT_APP_GET_LOCAL_IMAGES_DEFAULT}/avatar.png` : `${process.env.REACT_APP_GET_LOCAL_IMAGES_ENGINEER}/${item.avatar}`} alt={item.name} />
                      </LazyLoad>
                      <div className="masonry-description">
                        <p className="mb-1">{item.fullname}</p>
                        <p className="mb-1">
                          Expected Salary : <span> {item.salary} </span>
                        </p>
                        <p>
                          Skills :
                          <ProfileSkillsItem items={item.skills} />
                        </p>
                        {/* <p className={`tag-${item.color} margin-normal`}> {item.skills} </p> */}
                      </div>
                    </Link>
                  </div>
                )
              })}
          </div>
          <div className="my-8">
            <Pagination count={pageCount} onChange={(event, page) => handlePage(event, page)} page={currentPage} />
          </div>
        </Grid>
      </Container>
    </>
  )
}
export default EngineerItem
