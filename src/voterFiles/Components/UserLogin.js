import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import { useHistory} from 'react-router-dom';
import Modal from './../context/Modal.js';

const UserLogin = () => {
    let history = useHistory();
    const[openModal, setOpenModal] = useState();
    return (
        <div style={{marginTop:'90px'}}> 
            <Button className="btnVoterLogin" onClick= {() => {history.push("/registervoter")}} >Voter Register</Button>
            <button className="openModalBtn" onClick= {() => {setOpenModal(true)}}>Open</button>
            {openModal && < Modal closeModal = {setOpenModal} />}
        </div>
    );
}

export default UserLogin; 