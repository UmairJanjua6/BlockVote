import React from 'react';
import '../../index.css';
import Headerlogo from '../img/Logo3.png';
import Web3 from 'web3';
const onClickConnect = async () => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  console.log(account);
};
const Navbar = () => {
  
  

    return (
        <div className="Navbar">
          <div className="logo">
            <img src={Headerlogo} alt="logo"/>
          </div>

          <div className="title">
              <h2>E-Voting Using Blockchain</h2>
          </div>

          <div className="walletBtn" >
          <button id="btn" onClick={() => onClickConnect()}>Connect Wallet</button>
           </div>
        </div>
    );
}

export default Navbar;
