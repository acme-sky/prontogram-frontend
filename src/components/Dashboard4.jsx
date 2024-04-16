import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import LogoutButton from './listItems';
import { userContext } from './SignInSide';
import logo from '/src/assets/PRONTOGRAM-h.png';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Chat from './Dashboard3';

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const user = React.useContext(userContext);

  return (
    <userContext.Provider value={user}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box sx={{ backgroundColor: 'white', color: 'rgba(0,136,204, 0.6)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center', flexGrow:1 }}>
                {/*<Typography variant="h4" noWrap>
                Prontogram
                </Typography>*/}
                <img src={logo}  style={{ height: '100px', margin: '0 auto' }} />
            </Box>
            <Box sx={{ flexShrink: 0 }}>
                <LogoutButton />
            </Box>
            </Toolbar>
          <Divider />
          {/* Content */}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Box sx={{ flexGrow: 1}}>
              <Chat />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </userContext.Provider>
  );
}
