import React, { useCallback} from "react";
import '../../index.css';
import Headerlogo from '../img/Logo3.png';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {loadBlockchain} from '../context/async';
import { useStore } from "../context/GlobalState";



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height:"80px"

  },
}));
const Navbar = () => {
  const [{ web3 }, dispatch] = useStore();
  console.log(web3)
  const handleWeb3 = useCallback(async () => {
    loadBlockchain(dispatch);
    console.log("web3")
  }, []);
  
  const classes = useStyles();

    return (
      
        <div >
          <AppBar  position="fixed" className={classes.appBar}>
        <div className="Navbar" >
          <div className="logo" >
            <img src={Headerlogo} alt="logo"/>
          </div>

          <div className="title">
              <h2 >E-Voting Using Blockchain</h2>
          </div>

          <div className="walletBtn" >
          <button id="btn" onClick={handleWeb3}>Connect Wallet</button>
           </div>
        </div>
        </AppBar>
        </div>
    );
}

export default Navbar;
