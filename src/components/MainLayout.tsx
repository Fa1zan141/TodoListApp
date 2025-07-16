import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  ListItemButton,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const drawerWidth = 240;

const MainLayout = ({ children }: MainLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
const navigate = useNavigate();

const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); 
    return () => clearInterval(timer);
  }, []);

const options: Intl.DateTimeFormatOptions = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric', 
  hour: '2-digit', 
  minute: '2-digit', 
  second: '2-digit' 
};


  const formattedDateTime = currentDateTime.toLocaleString('en-US', options);



const drawer = (
    <div>
      <Box sx={{ p: 2, textAlign: 'center', display:"flex", alignItems:"center", flexDirection:"column" }}>
        <Avatar sx={{width:'100px', height:'100px', }} src="3551739.jpg" draggable={false}/>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Muhammad Faizan
        </Typography>
        <Typography variant="body2" color="inherit">
          muhammadFaizan@gmail.com
        </Typography>
      </Box>
      <Divider />
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/'  },
          { text: 'My Task', icon: <AssignmentIcon />, path:"/myTask" },
          { text: 'Logout', icon: <LogoutIcon />, path:"/login" },
        ].map(({ text, icon, path }) => (
        <ListItem key={text} disablePadding>
        <ListItemButton onClick={() => path && navigate(path)}>
            <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
        </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{fontSize:{xs:"26px"}, width:"100%", fontWeight:800}} >
            Todo List App
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" sx={{ mr: 2 }}>
            {formattedDateTime}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: {
            xs: '100%',
            sm: '100%',
            md: '100%',
            lg: `calc(100% - ${drawerWidth}px)`,
          },
          mt: { xs: 7, sm: 8 },
          userSelect: 'none',  
          WebkitUserDrag: 'none', 
        }}
      >
        {children}
      </Box>


    </Box>
  );
};

export default MainLayout;
