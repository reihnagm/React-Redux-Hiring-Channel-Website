import React, { Suspense, useEffect, useCallback, useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import { changeQueryParam } from "../../../actions/engineer-router"
import { parse } from "../../../lib/query-string"
import { Container, Grid, makeStyles, Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core"
// import { Pagination } from "@material-ui/lab"
import { getEngineersMoreData } from "../../../actions/engineer"
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from "../../Spinner/Spinner"
const ProfileSkillsItem = React.lazy(() => import("../EngineerProfile/ProfileSkillsItem/ProfileSkillsItem"))

const EngineerItem = ({ engineers, loadingMoreData, getEngineersMoreData }) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      await getEngineersMoreData(offset)
    }
    fetchData()
  }, [offset])

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
      <InfiniteScroll dataLength={engineers.length} next={() => setOffset(offset + 10)} hasMore={true} loading={loadingMoreData}>
          <Grid container direction="row" justify="center" alignItems="center">
            {engineers.map((engineer, i) => {
              return (
                <Card key={i} className={classes.root}>
                  <CardActionArea onClick={() => history.push(`engineers/profile/${engineer.slug}`)}>
                    <CardMedia className={classes.media} image={`${process.env.REACT_APP_GET_LOCAL_IMAGES_ENGINEER}/${engineer.avatar}`} title={engineer.slug} />
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
              )
            })}
          </Grid>
  
      </InfiniteScroll>
    </Container>
  )
}

const mapStateToProps = state => ({
  loadingMoreData: state.engineer.loadingMoreData
})

export default connect(mapStateToProps, { getEngineersMoreData })(EngineerItem)
