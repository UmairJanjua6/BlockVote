import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import NotificationsIcon from '@material-ui/icons/Notifications';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router-dom";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:'#12161C'

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



export default  function SideBar() {
  const classes = useStyles();
  let history = useHistory();
  const handleLogout = () => {
    history.push('/');
    
  }

  return (
    <div className={classes.root}>
    <CssBaseline />
    
      <Drawer
      position="fixed"
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        
        <Toolbar />
        <div className={classes.drawerContainer}>
        <List style={{paddingTop:'20px'}}>
              
                <ListItem>
                  <ListItemIcon>
                    <Avatar></Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary="Welcome Admin"
                  />
                </ListItem>
             
            </List>
          <Divider />
          <Typography variant="h5" >Dashboard</Typography>
          <List>
            
              <ListItem button onClick={event =>  window.location.href='admin'} >
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary="Overview"/>
              </ListItem>
              <ListItem button onClick={event =>  window.location.href='AddCandidate'} >
              <ListItemIcon><VisibilityIcon/></ListItemIcon>
                <ListItemText primary="Add Candidate"/>
              </ListItem>
              <ListItem button onClick={event =>  window.location.href='CandidateList'} >
              <ListItemIcon>< ListIcon/></ListItemIcon>
                <ListItemText primary="Candidate List"/>
              </ListItem>
              <ListItem button onClick={event =>  window.location.href='approvevoter'} >
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
                <ListItemText primary="Approve Voters"/>
              </ListItem>
              <ListItem button onClick={event =>  window.location.href='ElectionStatus'} >
              <ListItemIcon><AccountBalanceIcon/></ListItemIcon>
                <ListItemText primary="Update status of Election"/>
              </ListItem>
              <ListItem button onClick={event =>  window.location.href='DisplayResult'} >
              <ListItemIcon><DesktopWindowsIcon/></ListItemIcon>
                <ListItemText primary="Display Result"/>
              </ListItem>
              <ListItem button onClick={event =>  window.location.href='AddAdmin'} >
              <ListItemIcon><AddIcon/></ListItemIcon>
                <ListItemText primary="Add New Admin"/>
              </ListItem>
              <ListItem button onClick={event =>  window.location.href='#'} >
              <ListItemIcon><SettingsIcon/></ListItemIcon>
                <ListItemText primary="Settings"/>
              </ListItem>
              <Divider/>
              <ListItem button  onClick={handleLogout }>
              <ListItemIcon><PowerSettingsNewIcon/></ListItemIcon>
                <ListItemText primary="Logout"/>
              </ListItem>
          
          </List>
        </div>
      </Drawer>
      
    </div>
    
  );
}
