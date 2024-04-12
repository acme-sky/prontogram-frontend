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

const useStyles = makeStyles({
    table:{
    minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '100vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    },
    messageContainer: {
        backgroundColor: 'rgba(61, 155, 250, 0.3)',
        padding: '10px',
        borderRadius: '25px',
        maxWidth: '60%',
        boxShadow: '5px 10px 5px lightgrey'
    },
    people:{
        backgroundColor: 'rgba(0,136,204, 1)',
        borderRadius: '15px'
    }
})


export default function Chat(){
    const classes = useStyles();
    //const user = React.useContext(userContext)
    const user = localStorage.getItem('user')
    const [messages, setMessages] = React.useState([])
    const navigate = useNavigate()

    React.useEffect(() => {
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
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.message == "User not authenticated"){
          navigate("/login")
          throw new Error("User not authenticated")
        }
      }
    };

    fetchData();

    // Clean-up function to cancel any ongoing requests (if necessary)
    return () => {
      // You can perform cleanup here if needed
    };
  }, [user, navigate]); // Empty dependency array ensures the effect runs only once after the initial render



    return (
    <userContext.Provider value={user}>
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chats</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
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
                <List className={classes.messageArea}>
                    {messages.map((message, index) => (
                        <ListItem key={index}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <div className={classes.messageContainer} dangerouslySetInnerHTML={{ __html: message.full_text }}></div>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary={message.arrived_timestamp}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
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
