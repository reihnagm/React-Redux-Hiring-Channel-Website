import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pusher from 'pusher-js';
import * as moment from 'moment';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import CakeIcon from '@material-ui/icons/Cake';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import { Container, Grid, Paper, Button, Badge, Modal, Input, makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Spinner from '../../../Spinner/Index';
import ConversationLists from './ConversationLists/Index';
import MessageIcon from '@material-ui/icons/Message';
import AvatarComponent from '../../../Avatar/Index';
import MessageLists from './MessageLists/Index';
import { getProfileEngineerBySlug } from '../../../../actions/engineer';
import { 
	getConversationLists,
  getReplyConversationReplies, 
  checkConversations,
	InsertIntoConversationReplies,
  changesReplyToRealtime
} from '../../../../actions/message';
const Profile = ({
	getProfileEngineerBySlug,
	getConversationLists,
  getReplyConversationReplies, 
  checkConversations,
  InsertIntoConversationReplies,
  changesReplyToRealtime,
	message: { conversation_lists, check_conversations, replies },
	engineer: { engineer, loading }, 
	user: { user },
	match }) => {
  const messagesEndRef = useRef(null)
  const [open, setOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  let user_two = engineer.user_id;
  let user_one = user && user.data && user.data.id;
  let user_session_name = user && user.data && user.data.name;
  let slug = match.params.slug;
  let name = engineer.name;
  let email = engineer.email;
  let description = engineer.description;
  let skills = engineer.skills;
  let location = engineer.location;
  let showcase = engineer.showcase;
  let birthdate = moment(engineer.birthdate).format("D MMMM YYYY");
  let telephone = engineer.telephone;
  const styles = theme => ({
    customBadge: {
      backgroundColor: "#00AFD7",
      color: "white"
    }
  });
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 8,
      top: 8,
      fontSize: 14,
      backgroundColor: '#ff002a',
      overlap: 'circle',
      borderRadius: '50%',
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '14px 10px',
    },
  }))(Badge);
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2)
    }
  }));
  const classes = useStyles();
  useEffect(() => {
    const pusher = new Pusher('20b3b98bfc23f9164876', {
      cluster: 'ap1',
      forceTLS: true
    });
    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event',  async data => {
      try {
        await changesReplyToRealtime(data);
      } catch(error) {
        console.log(error);
      } finally {
        if(messagesEndRef.current !== null) { 
          messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
      } 
    });
    const fetchData = async () => {
      await getProfileEngineerBySlug(slug);    
      await getConversationLists(user_two);
      await checkConversations(user_two);
      await getReplyConversationReplies(check_conversations);
    }
    fetchData();
    // agar data pesan ngga dua kali tampil 
    return () => {
      channel.unbind('my-event');
      channel.unsubscribe('my-channel');
    };
  }, [getProfileEngineerBySlug, 
      getConversationLists, 
      checkConversations,
      changesReplyToRealtime,
      getReplyConversationReplies, 
      check_conversations,
      messagesEndRef,
      user_two,
      slug]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };   
  const handleMessage = (event) => {
    setInputMessage(event.target.value);
  }
  const handleEnterMessage = async (event) => {
    let data = {
      id: new Date(),
      reply: inputMessage,
      name: user_session_name,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    if(event.which === 13) { // code to enter keyboard 
      try {
        await InsertIntoConversationReplies(user_two, data);
      } catch(error) {
        console.log(error);
      } finally {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        setInputMessage("");
      }
    }
  }
  return loading ? ( <Spinner /> ) : (
    <Fragment>
      <div className="backdrop-top"></div>
      <Container className="mt-64" fixed>
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={6} md={6}>
                    <AvatarComponent 
                      imageSource={engineer.avatar} 
                      altName={engineer.name}
                      type="avatar" 
                      width="80"
                      height="80"
                      spaceBottom="20"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <StyledBadge 
                      badgeContent={4} 
                      color="secondary">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpen}
                        startIcon={<MessageIcon />}>
                        Message
                      </Button>
                    </StyledBadge>
                    <Modal open={open} onClose={handleClose}>
                      <Paper className="p-5 conversation-lists">
                        { user_one !== user_two &&  ( 
                          <div className="p-5 relative container-direct-message">
                            <MessageLists
                              replies={replies}
                              userTwo={user_two}
                              messagesEndRef={messagesEndRef}
                            /> 
                            <div className="bar-bottom-message p-2">
                              <Input 
                                fullWidth
                                name="message" 
                                value={inputMessage}
                                onChange={handleMessage}
                                onKeyPress={handleEnterMessage}
                              />      
                            </div>   
                          </div>
                        )}
                        { user_one === user_two && (
                          <div>
                            { conversation_lists.length === 0 && (
                              <p className="center">No conversations.</p>
                            )}
                            <ConversationLists 
                              conversation_lists={conversation_lists} 
                            />
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
                    <p> {name} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <EmailIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {email} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <CakeIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {birthdate} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <LocationOnIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p className="leading-loose"> {location} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <PhoneIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {telephone} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <SlideshowIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {showcase} </p>
                  </Grid>
                </Grid>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  component={ Link } to="/engineers">
                  Back
                </Button>
                </Paper>
              </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <p> {description} </p>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <p className="mb-2">Skills</p>
                <p>{skills}</p>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Fragment>
  )
}
const mapStateToProps = state => ({
  engineer: state.engineer,
  user: state.auth,
  message: state.message
});
export default connect(
  mapStateToProps,
  {
    getProfileEngineerBySlug,
    getConversationLists,
    getReplyConversationReplies, 
    checkConversations,
    InsertIntoConversationReplies,
    changesReplyToRealtime
  }
)(Profile);
