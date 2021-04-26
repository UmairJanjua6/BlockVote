import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:'#12161C'

  },
}));



export default  function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
           <img src="logoB.png" style={{height:'50px', width:'50px'}}></img>
            <Typography variant="h5" display="inline" style={{color:'#f0b90b'}}>BlockVote</Typography>
          </Typography>
        </Toolbar>
      </AppBar>
     
    
    </div>
    
  );
}
