import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pusher from 'pusher-js';
import * as moment from 'moment';
import { Container, Grid, Paper, Button, Modal, Input, makeStyles } from '@material-ui/core';
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
    const [messageMask, setMessageMask] = useState([]);
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
        channel.bind('my-event', data => {
            setMessageMask(state => [...state, data]); 
            changesReplyToRealtime(data);
        })
        const fetchData = async () => {
            await getProfileEngineerBySlug(slug);    
            await getConversationLists(user_two);
            await checkConversations(user_two);
            await getReplyConversationReplies(check_conversations);
        }
        fetchData();
        return () => {
            channel.unbind('my-event');
            channel.unsubscribe('my-channel');
        };
    }, [getProfileEngineerBySlug, 
        getConversationLists, 
        checkConversations,
        getReplyConversationReplies, 
        check_conversations,
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
    const handleEnterMessage = (event) => {
        let data = {
            id: new Date(),
            reply: inputMessage,
            name: user_session_name,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        if(event.which === 13) { // code to enter keyboard 
            setTimeout(() => { 
                messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
            }, 800);
            InsertIntoConversationReplies(user_two, data);
            setInputMessage("");
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
                                            width="100"
                                            height="100"
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleOpen}
                                            startIcon={<MessageIcon />}>
                                            Message
                                        </Button>
                                        <Modal open={open} onClose={handleClose}>
                                            <Paper className="p-5 conversation-lists">
                                                { user_one !== user_two &&  ( 
													<div className="p-5 relative container-direct-message">
                                                        <MessageLists
                                                            replies={replies}
                                                            userTwo={user_two}
                                                            messagesEndRef={messagesEndRef}
                                                            messageMask={messageMask}
                                                            setMessageMask={setMessageMask}
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
                                <p className="my-2"> {name} </p>
                                <p className="my-2"> {email} </p>
                                <p className="my-2"> {birthdate} </p>
                                <p className="my-2"> {telephone} </p>
                                <p className="my-2"> {showcase} </p>
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
