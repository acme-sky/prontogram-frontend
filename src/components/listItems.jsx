import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    const cookie = localStorage.getItem('session');

    const postData = {
      sid: cookie
    };

    try {
      const response = await axios.post("/api/logout", postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data['status'] === 1) { // error
        throw new Error(response.data['message']);
      } else { // logout success
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error('There was a problem with the login operation:', error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error!",
        // footer: '<a href="/login">Go to login page</a>'
      });
    }
  };

  return (
    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  );
};

export default LogoutButton;
