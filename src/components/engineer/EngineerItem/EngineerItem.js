import React, { Suspense } from "react"
import { Link, useHistory } from "react-router-dom"
import { Container, Grid, makeStyles, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import Spinner from "../../Spinner/Spinner"
const ProfileSkillsItem = React.lazy(() => import("../EngineerProfile/ProfileSkillsItem/ProfileSkillsItem"))
const EngineerItem = ({ engineers, handlePage, currentPage, pageCount }) => {
  const useStyles = makeStyles({
    root: {
      maxWidth: 250,
      margin: 10
    },
    media: {
      height: 200
    }
  })
  const classes = useStyles()
  const history = useHistory()
  return (
    <Container fixed>
      <Grid container direction="row" justify="start" alignItems="center">
        {engineers &&
          engineers.map(engineer => (
            <Card className={classes.root}>
              <CardActionArea onClick={() => history.push(`engineers/profile/${engineer.slug}`)}>
                <CardMedia className={classes.media} image={`${process.env.REACT_APP_GET_LOCAL_IMAGES_ENGINEER}/${engineer.avatar}`} title="Contemplative Reptile" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {engineer.fullname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Expected Salary : <span className="card-salary"> {engineer.salary} </span>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Skills :
                    <Suspense fallback={<Spinner />}>
                      <ProfileSkillsItem items={engineer.skills} />
                    </Suspense>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </Grid>
      <div className="flex justify-c-center my-10">
        <Pagination count={pageCount ?? 0} onChange={(event, page) => handlePage(event, page)} page={currentPage ?? 1} />
      </div>
    </Container>
    // <div>
    //   <Container fixed>
    //     <Grid container direction="row" justify="center" alignItems="center">
    //       <div className="masonry-container">
    //         {engineers &&
    //           engineers.map(engineer => {
    //             return (
    //               <div className="masonry-item text-white" key={engineer.uid}>
    //                 <Link to={`engineers/profile/${engineer.slug}`}>
    //                   <LazyLoad>
    //                     <img className="image masonry-image" src={`${process.env.REACT_APP_GET_LOCAL_IMAGES_ENGINEER}/${engineer.avatar}`} alt={engineer.fullname} />
    //                   </LazyLoad>
    //                 </Link>
    //                 <div className="masonry-description">
    //                   <p className="mb-1">{engineer.fullname}</p>
    //                   <p>
    //                     Expected Salary : <span className="masonry-salary"> {engineer.salary} </span>
    //                   </p>
    //                   <p>
    //                     Skills :
    //                     <ProfileSkillsItem items={engineer.skills} />
    //                   </p>
    //                 </div>
    //               </div>
    //             )
    //           })}
    //       </div>
    //     </Grid>
    //     <div className="flex justify-c-center my-10">
    //       <Pagination count={pageCount ?? 0} onChange={(event, page) => handlePage(event, page)} page={currentPage ?? 1} />
    //     </div>
    //   </Container>
    // </div>
  )
}
export default EngineerItem
