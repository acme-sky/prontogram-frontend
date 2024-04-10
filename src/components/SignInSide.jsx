import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const userContext = React.createContext()
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {
  const [user, setUser] = React.useState();
  const [error, setError] = React.useState(null);
  const navigate = useNavigate()

  // useEffect to log the effect of setUser
  React.useEffect(() => {
      console.log("User set to:", user);
    }, [user]); // Run the effect whenever 'user' changes

  


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const isEmptyField = Object.values({
      username: data.get('username'),
      password: data.get('password')
    }).some(value => value.trim() === '');

    if (isEmptyField) {
      // If any field is empty, display an error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the fields.",
      });
      return;
    }


  const postData = {
    username: data.get('username'),
    password: data.get('password')
  };
    try {
      const response = await axios.post("/api/login", postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data['status'] === 1){
        throw new Error(response.data['message'])
      }else{
        setError(null); // Clear any previous error
        setUser(postData.username)
        localStorage.setItem('session', response.data['sid'])
        navigate("/dashboard")
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
      setError(error.message); // Set error message
    }
  };

  //};
  return (
    <><userContext.Provider value={user} />
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: 'auto', width:'50%', marginLeft: 'auto', marginRight:'auto' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(src/assets/logo-big.jpg)', //'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password" /> {error && ( // Display error if exists
                  <Typography color="error" align="center" variant="body2" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
              {/*<FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
/>*/}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/*<Grid item xs>
      <Link href="#" variant="body2">
        Forgot password?
      </Link>
</Grid>*/}
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/*<Copyright sx={{ mt: 5 }} />*/}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider></>
  );
}