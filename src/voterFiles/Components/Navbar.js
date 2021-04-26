import React from 'react';
import '../../index.css';
import Headerlogo from '../img/Logo3.png';
import { useWallet, UseWalletProvider } from 'use-wallet';

const Navbar = () => {
    const wallet = useWallet();
    return (
        <div className="Navbar">
          <div className="logo">
            <img src={Headerlogo} alt="logo"/>
          </div>

          <div className="title">
              <h2>E-Voting Using Blockchain</h2>
          </div>

          <div className="walletBtn" >
          <button id="btn" onClick={() => wallet.connect()}>Connect Wallet</button>
          </div>
        </div>
    );
}
export default () => (
    <UseWalletProvider
      chainId={3}
      connectors={{
        // This is how connectors get configured
        portis: { dAppId: 'my-dapp-id-123-xyz' },
      }}
    >
      <Navbar />
    </UseWalletProvider>
  )