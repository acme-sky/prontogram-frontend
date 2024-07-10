import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

  const [error, setError] = React.useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //check empty fields
    const isEmptyField = Object.values({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
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
      //throw new Error("Empty fields ")
      setError("Empty fields")
      return;
    }else{
    const postData = {
        username: data.get('username'),
        password: data.get('password'),
        name: data.get('firstName'),
        surname: data.get('lastName'),
        sid: ''
    };

    try {
      const response = await axios.post("/api/register", postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data['status'] === 1){
        throw new Error(response.data['message'])
      }else{
        setError(null)
        // pop up successo + link a login      
        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "The user "+postData.username+" has been successfully registered!",
          footer: '<a href="/login">Go to login page</a>'
        });
      }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
        //setError(error.message); // Set error message
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Choose a different username!",
        });
      }
    };
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/*<Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
        </Grid>*/}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}