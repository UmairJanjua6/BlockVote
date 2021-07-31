import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import { useHistory} from 'react-router-dom';
import '../../index.css';

const UserLogin = () => {
    let history = useHistory();
    return (
        <div className="user-login"> 
        <div className="user-header">
            <h2>Instructions!</h2>
        </div>
        <div className="user-body">
            <p> &#8594; For login/register, you need to install <a id="metamask-link" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-US">MetaMask</a> extension &nbsp; &nbsp; &nbsp;  to access your blockchain wallet.</p>
            <p> &#8594; For new registration, a working email account is required.</p>
            <p> &#8594; DO NOT SHARE YOUR PRIVATE KEYS WITH ANY OTHER &nbsp; &nbsp; &nbsp;&nbsp;&#160; PERSON.</p>
        </div>
        <div className="user-btn">
        <Button className="btnVoterLogin" onClick={() => {history.push("/user")}}>Login</Button>
        <Button className="btnVoterRegister" onClick= {() => {history.push("/registervoter")}} >Register</Button>
        </div>
        </div>
    );
}

export default UserLogin; 