import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import AppMenuItem from './AppMenuItem';
import { appMenuItems } from './MenuItems';
import { Avatar, Badge, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import { smd_url } from '../../variable/BaseUrl';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { authentication } from '../../store/Authentication';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function DashboardTemplate(props) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [auth, setAuth] = useRecoilState(authentication)
  const token = localStorage.getItem('token')
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await axios.get(smd_url + 'logout', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(() => {
      setAuth({
        auth: false,
        user: null
      })
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('employee_id')
      navigate('/')
    })
  }

  const handleProfile = () => {
    alert("profile")
  }

  const settings = [
    {
      title: 'Profile', 
      action: handleProfile
    }, 
    {
      title: 'Logout',
      action: handleLogout
    }
  ];
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed"
        open={open}
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Logo
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
              <Box 
                sx={{ 
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleOpenUserMenu}
              >
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt={`${ auth.user.first_name } ${ auth.user.last_name }`} src="https://mui.com/static/images/avatar/2.jpg" />
                </IconButton>
                <Typography mx={2}>
                  { auth.user.first_name } { auth.user.last_name }
                </Typography>
                <KeyboardArrowDownIcon />
              </Box>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={setting.action}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{ 
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper' : {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }} >
          <List>
            {
              appMenuItems.map((item, index) => (
                <AppMenuItem { ...item } key={index}/>
              ))
            }
          </List>
        </Box>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Typography 
          variant="h5" 
          color="initial"
          sx={{ 
            mb: 3
          }}
        >
          {props.title}
        </Typography>
        { props.render }
      </Main>
    </Box>
  )
}

export default DashboardTemplate
