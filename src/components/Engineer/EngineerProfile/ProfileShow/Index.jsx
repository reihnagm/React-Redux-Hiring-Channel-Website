import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Button, Modal, Input, makeStyles } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';
import store from '../../../../store';
import { CHECK_CONVERSATIONS } from '../../../../actions/types'
import Spinner from '../../../Spinner/Index';
import AvatarComponent from '../../../Avatar/Index';
import MessageLists from './MessageLists/Index';
import ConversationLists from './ConversationLists/Index';
import { getProfileEngineerBySlug } from '../../../../actions/engineer';
import { 
	getConversationLists,
	getConversationId,
    getReplyConversationReplies, 
    checkConversations,
	InsertIntoConversationReplies
} from '../../../../actions/message';
const Profile = ({
	getProfileEngineerBySlug,
	getConversationLists,
	getConversationId,
    getReplyConversationReplies, 
    checkConversations,
	InsertIntoConversationReplies,
	message: { conversation_lists, conversation_id, check_conversations, replies },
	engineer: { engineer, loading }, 
	user: { user },
	match }) => {
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
    let birthdate = engineer.birthdate;
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
        const fetchData = async () => {
            await getProfileEngineerBySlug(slug);    
            await getConversationLists(user_two);
            await checkConversations(user_two);
        }
        fetchData();
    }, [getProfileEngineerBySlug, 
		getConversationLists, 
        getReplyConversationReplies, 
        checkConversations,
        user_two,
        slug]);
    const handleOpen = async () => {
        setOpen(true);
        store.dispatch({
            type: CHECK_CONVERSATIONS,
            payload: check_conversations
        });
        await getReplyConversationReplies(check_conversations); // ini udah dinamis karena udah gua store dispatch
        // jadi otomatis ketika di open conversation_id nya berubah-ubah
    };
    const handleClose = () => {
        setOpen(false);
    };   
    const handleMessage = (event) => {
        setInputMessage(event.target.value);
    }
    const handleEnterMessage = (event) => {
        let obj = {
            id: new Date(),
            reply: inputMessage,
            name: user_session_name
		}
        if(event.which === 13) {
			InsertIntoConversationReplies(user_two, obj, inputMessage);
            setMessageMask(state => [...state, obj]);
            setInputMessage('');
        }
    }
    let n = new Date(birthdate);
    let y = n.getFullYear();
    let d = n.getDate();
    let m = n.getMonth()+1;
    let months = ["January","February","March","April","May","June",'July',"August","September","October","November","December"];
    let thisMonth  = months[m-1];
    if(isNaN(y) || isNaN(d) || typeof y === "undefined") {
        y = '';
        d = '';
        thisMonth = '';
	}
	let displayDate = d +' '+ thisMonth +' '+ y ;    
    return loading ? ( <Spinner /> ) : (
        <>
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
                                                    <>
                                                        <ConversationLists 
                                                            conversation_lists={conversation_lists} 
                                                        />
                                                    </>
                                                )}
                                            </Paper>
                                        </Modal>
                                    </Grid>
                                </Grid>
                                <p className="my-2"> {name} </p>
                                <p className="my-2"> {email} </p>
                                <p className="my-2"> {displayDate} </p>
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
        </>
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
		getConversationId,
        getReplyConversationReplies, 
        checkConversations,
		InsertIntoConversationReplies
    }
)(Profile);
