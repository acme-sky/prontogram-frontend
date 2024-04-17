import { makeStyles } from '@mui/styles'       
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material//Avatar'
import Fab from '@mui/material/Fab'
import SendIcon from '@mui/icons-material/Send'
import logo from '/src/assets/logo-big.jpg'
import { userContext } from './SignInSide'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as React from 'react'
import { BorderTop } from '@mui/icons-material'

const useStyles = makeStyles({
    table:{
    minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '100vh',
        minWidth: '100%'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70%',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '5px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
        }
    },
    messageContainer: {
        backgroundColor: 'rgba(0,136,204, 0.5)',
        padding: '10px',
        borderRadius: '25px',
        maxWidth: '60%',
        minWidth: '50%',
        //boxShadow: '5px 10px 5px lightgrey',
        position: 'relative',
        borderLeft: '20px solid transparent',
        borderRight:'20 px solid transparent',
        borderBottom: '20 px solid rgba(0,136,204,0.5)'
    },
    bubble: {
        border: '0.5px solid black',
        borderRadius: '10px',
        margin: '5px',
        padding: '10px',
        display: 'inline-block'
    },
    triangle: {
        position: 'absolute',
        bottom: '-14.5px',
        left: '+1px',
        width: '0',
        height: '0',
        borderLeft: '20px solid transparent',
        borderRight: '20px solid transparent',
        borderTop: '15px solid rgba(0,136,204, 0.5)', // Same color as container background
    },
    people:{
        backgroundColor: 'rgba(0,0,250, 0.5)',
        borderRadius: '15px'
    }
})


export default function Chat(){
    const classes = useStyles();
    //const user = React.useContext(userContext)
    const user = localStorage.getItem('user')
    const [messages, setMessages] = React.useState()
    const navigate = useNavigate()
    const messageAreaRef = React.useRef(null)

    const fetchData = async () => {
      try {
        const cookie = localStorage.getItem('session')
        // Check if cookie exists before making the request
        if (!cookie) {
          //console.error('Cookie not found in session storage');
          console.log('Cookie not found');
          //popup error with redirection
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User is not authenticated!",
            footer: '<a href="/login">Go to login page</a>'
          });
        }

        // Make the request to the API endpoint with the cookie
        const response = await axios.get(`/api/getMessages/`+user);

        const current_ts = Date.now()

        const valid_messages = response.data.messages.filter(message =>{
            return message.expiring_date > current_ts
        })
        if(valid_messages.length > 0){
            console.log(valid_messages)
            setMessages(valid_messages)
        }else{
            setMessages()
        }
        //setMessages(response.data.messages);
              } catch (error) {
        console.error('Error fetching data:', error);
        if (error.message == "User not authenticated"){
          navigate("/login")
          throw new Error("User not authenticated")
        }
      }
    };

    //fetchData();

    React.useEffect(() => {
        if(messageAreaRef.current){
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    },[messages]);


    React.useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000)
        return () => {
            clearInterval(interval)
        };
    }, [user]);

    return (
    <userContext.Provider value={user}>
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chats</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={2} className={classes.borderRight500}>
                <List>
                    <ListItem button >
                        <ListItemIcon>
                        <Avatar alt="user"/>
                        </ListItemIcon>
                        <ListItemText primary={user}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List className={classes.people}>
                    <ListItem button key="AcmeSky">
                        <ListItemIcon>
                            <Avatar alt="AcmeSky" src={logo}/>
                        </ListItemIcon>
                        <ListItemText primary="AcmeSky">AcmeSky</ListItemText>
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea} ref={messageAreaRef}>
                    {messages && messages.map((message, index) => {
                        // Check if message is not an empty string
                        //if(message.trim() !== '') {
                        if (message.full_text && typeof message.full_text === 'string' && message.full_text.trim() !== '') {
                        return (
                                <ListItem key={index}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <div className={classes.messageContainer}>
                                                <div className={classes.triangle}></div>
                                                <div dangerouslySetInnerHTML={{__html: message.full_text}}></div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText align="left" secondary={message.arrived_timestamp}></ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            );
                        } else {
                            return null; // Return null if message is empty
                        }
                    })}
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
      </userContext.Provider>
  );
}
