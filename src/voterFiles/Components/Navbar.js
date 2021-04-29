import React from 'react';
import '../../index.css';
import Headerlogo from '../img/Logo3.png';
import Web3 from 'web3';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
const onClickConnect = async () => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  console.log(account);
};

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
          <button id="btn" onClick={() => onClickConnect()}>Connect Wallet</button>
           </div>
        </div>
        </AppBar>
        </div>
    );
}

export default Navbar;
