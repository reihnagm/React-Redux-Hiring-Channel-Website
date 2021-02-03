import React, { useState, useEffect, useRef, Suspense } from "react"
import { Container, Grid, Badge, Paper, Button, Modal, Input, makeStyles } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import * as moment from "moment"
import Pusher from "pusher-js"
import PersonIcon from "@material-ui/icons/Person"
import EmailIcon from "@material-ui/icons/Email"
import CakeIcon from "@material-ui/icons/Cake"
import PhoneIcon from "@material-ui/icons/Phone"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import SlideshowIcon from "@material-ui/icons/Slideshow"
import MessageIcon from "@material-ui/icons/Message"
import AvatarComponent from "../../../../Avatar/Avatar"
import ConversationLists from "../ConversationLists/ConversationLists"
import MessageLists from "../MessageLists/MessageLists"
import Spinner from "../../../../Spinner/Spinner"
const ProfileSkillsItem = React.lazy(() => import("../../ProfileSkillsItem/ProfileSkillsItem"))

const ProfileShowItem = ({ engineer, user, replies, getConversationLists, getReplyConversationReplies, conversationLists, changesReplyToRealtime, getCheckConversations, checkConversations, InsertIntoConversationReplies }) => {
  const messagesEndRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState("")
  useEffect(() => {
    const pusher = new Pusher("f0c968ffa2c271711c29", {
      cluster: "ap1",
      forceTLS: true
    })
    const fetchData = async () => {
      await getConversationLists(engineer.user_uid)
      await getCheckConversations(engineer.user_uid)
      await getReplyConversationReplies(checkConversations)
    }
    fetchData()
    const channel = pusher.subscribe("my-channel")
    channel.bind("my-event", async data => {
      try {
        await changesReplyToRealtime(data)
      } catch (err) {
        console.log(err)
      } finally {
        if (messagesEndRef.current !== null) {
          messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
        }
      }
    })
    return () => {
      channel.unbind("my-event")
      channel.unsubscribe("my-channel")
    }
  }, [engineer, changesReplyToRealtime, checkConversations, getCheckConversations, getConversationLists, getReplyConversationReplies])

  const StyledBadge = withStyles(theme => ({
    badge: {
      right: 8,
      top: 8,
      fontSize: 14,
      backgroundColor: "#ff002a",
      overlap: "circle",
      borderRadius: "50%",
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "14px 10px"
    }
  }))(Badge)
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2)
    }
  }))
  const classes = useStyles()
  const history = useHistory()
  const toggleMsgOpen = async () => {
    await getConversationLists(engineer.user_uid)
    setOpen(!open)
  }
  const handleMessage = event => {
    setInputMessage(event.target.value)
  }
  const handleEnterMessage = async event => {
    let data = {
      id: new Date(),
      reply: inputMessage,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
    }
    if (event.which === 13) {
      try {
        await InsertIntoConversationReplies(engineer.user_uid, data)
      } catch (err) {
        console.log(err)
      } finally {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
        setInputMessage("")
      }
    }
  }
  return (
    <div>
      <div className="backdrop-top"></div>
      <Container className="mt-64" fixed>
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={6} md={6}>
                    <AvatarComponent imageSource={engineer.avatar} altName={engineer.name} type="engineers" width="80" height="80" spaceBottom="20" />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    {/* <StyledBadge badgeContent={4} color="secondary"> */}
                    <Button variant="contained" color="primary" onClick={toggleMsgOpen} startIcon={<MessageIcon />}>
                      Messages
                    </Button>
                    {/* </StyledBadge> */}
                    <Modal open={open} onClose={toggleMsgOpen}>
                      <Paper className="p-5 conversation-lists">
                        {user.uid !== engineer.user_uid && (
                          <div className="p-5 relative container-direct-message">
                            <MessageLists replies={replies} userGuestUid={engineer.user_uid} messagesEndRef={messagesEndRef} />
                            <div className="bar-bottom-message p-2">
                              <Input fullWidth name="message" value={inputMessage} onChange={handleMessage} onKeyPress={handleEnterMessage} />
                            </div>
                          </div>
                        )}
                        {user.uid === engineer.user_uid && (
                          <div>
                            {conversationLists.length === 0 && <p className="center">No conversations.</p>}
                            <ConversationLists getCheckConversations={getCheckConversations} conversationLists={conversationLists} />
                          </div>
                        )}
                      </Paper>
                    </Modal>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <PersonIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p>{engineer.fullname}</p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <EmailIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {engineer.email} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <CakeIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {moment(engineer.birthdate).format("D MMMM YYYY")} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <LocationOnIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p className="leading-loose"> {engineer.location} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <PhoneIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {engineer.telephone} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <SlideshowIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {engineer.showcase} </p>
                  </Grid>
                </Grid>
                <Button type="button" variant="contained" color="primary" onClick={() => history.go(-1)}>
                  Back
                </Button>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <p> {engineer.description} </p>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <p className="mb-2">
                  skills
                  <Suspense fallback={<Spinner />}>
                    <ProfileSkillsItem items={engineer.skills} />
                  </Suspense>
                </p>
              </Paper>
              <div className="mt-6">
                <Paper className={classes.paper}>
                  <p className="mb-2">Expected Salary</p>
                  <p>{engineer.salary}</p>
                </Paper>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default ProfileShowItem
