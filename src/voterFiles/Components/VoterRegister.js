import {Container} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {useStore} from '../context/GlobalState';
import {addVoter} from '../context/async';
import { getVoterList } from '../context/async';
import {loadBlockchain} from '../context/async';
import Modal from '../context/Modal.js';
import Spinner from "./Spinner";
import { ValidateCnic, ValidateEmail } from './Regex';
import { FormControl } from '@material-ui/core';

const VoterRegister = () => {
  const [name, setName] = useState ('');
  const [cnic, setCnic] = useState ();
  const [email, setEmail] = useState ('');
  const [constituency, setConstituency] = useState ();
  const [address, setAddress] = useState ();
  const [openModal, setOpenModal] = useState ();
  const [{accounts, contract, handleReceipt, getVoterData, voterListArray}, dispatch] = useStore ();
  const [ loading, setLoading ] = useState(false);
  const [ successConfirmation, setSuccessConfirmation ] = useState(false);
  const [ failConfirmation, setFailConfirmation ] = useState(false);
  const [ modalBody, setModalBody ] = useState("");
  const [ isError, setError ] = useState(true);

  useEffect (async () => {
    await loadBlockchain (dispatch);
  }, []);
  const validateData = async () => {
    setLoading(true);
    let flag = true;
    if(getVoterData) {
      for(var i = 0; i < getVoterData.length; i++) {
        if(getVoterData[i].cnic === cnic) {
          flag = false;
          setLoading(false);
          alert("CNIC already exists");
        } else if(getVoterData[i].email === email) {
          flag = false;
          setLoading(false);
          alert("Email already exists");
      }
    }

  for(var j = 0; j <voterListArray.length; j++) {
    if(voterListArray[j] === address) {
      flag = false;
      setLoading(false);
      alert("Address already exists");
    }
  }
}
  if(flag === true) {
    addVoterFunc();
    setLoading(false);
  }
}

const loadVoterList = async() => {
  try {
    await getVoterList(dispatch, contract, accounts);
  } catch (error){
    console.log("error: " + error);
  }
}
  const addVoterFunc = async () => {
    try {
      await addVoter (
        address,
        name,
        cnic,
        email,
        constituency,
        contract,
        accounts,
        dispatch
      );

      if ( handleReceipt !== null ) {
        await sendEmail(email, address);
        setOpenModal (true);
        }  else {
        setModalBody("Transaction failed. Verification Email Sending Failed. Please try again");
        await setFailConfirmation (true);
        setOpenModal (true); 
        }
    } catch (error) {
      setLoading(false);
      console.log ('error: ', error);
    }
  };

  const sendEmail = async(email, address) => {
    const url = process.env.REACT_APP_DEV_NODE_URL + process.env.REACT_APP_ROUTE_PATH + process.env.REACT_APP_REGISTER_EMAIL_PATH;
    const response = await fetch(url, { 
        method: 'POST', 
        headers: { 
            'Content-type': 'application/json'
        }, 
        body: JSON.stringify({ email, address }) 
    }); 
      const resData = await response.json(); 
      if (resData.status === 'success'){
        await setLoading(false);
        await setModalBody("Verification Email Sent.");
        await setSuccessConfirmation (true);
        await setFailConfirmation (false);
    }else if(resData.status === 'fail'){
        await setLoading(false);
        await setModalBody("Verification Email Sending Failed. Please try again");
        await setSuccessConfirmation (false);
        await setFailConfirmation (true);
    }
  };

  const handleCnic = e => {
    const value = e.target.value;
    const isValid = ValidateCnic(value);
    if(!isValid){
      setError(true);
      return;
    }
    setCnic(value);
    setError(false);
  }

  const handleEmail = e => {
    const value = e.target.value;
    const isValid = ValidateEmail(value);
    if(!isValid){
      setError(true);
      return;
    }
    setEmail(value);
    setError(false);
  }
  
  return (
    <div >
      {openModal &&
        handleReceipt &&
        <Modal
          closeModal={setOpenModal}
          title={'Registration Status'}
          body={modalBody}
          txLink = {!failConfirmation ? <a
            href={
              'https://ropsten.etherscan.io/tx/' +
                handleReceipt.transactionHash
            }
          >
            View on etherscan
          </a> : ""}
        />}
      <Container maxWidth="xs" style={{marginTop: '100px'}}>
        <Form>

          <Form.Group>
            <div style={{textAlign: 'center', alignItems: 'center'}}>
              <h2>Register</h2>
            </div>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="VoterName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => {setName (e.target.value); loadVoterList();}}
                type="name"
                placeholder="Enter your Name"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label> CNIC </Form.Label>
              <Form.Control
                value={cnic}
                onChange={handleCnic}
                placeholder="Enter your CNIC"
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> Email </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              onChange={handleEmail}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Select Constituency</Form.Label>
            <Form.Control
              as="select"
              value={constituency}
              onChange={e => setConstituency (e.target.value)}
            >
              <option value="0">Choose...</option>
              <option value="1">Constituency 1</option>
              <option value="2">Constituency 2</option>
              <option value="3">Constituency 3</option>
              <option value="4">Constituency 4</option>
              <option value="5">Constituency 5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Voter Ethereum Address</Form.Label>
            <Form.Control
              placeholder="Ethereum wallet address"
              value={address}
              onChange={e => setAddress (e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{textAlign: 'center', marginTop: '30px'}}>
            <Button
              variant="contained"
              type="submit"
              size="lg"
              style={{backgroundColor: '#f0b90b', color: '#12161C'}}
              onClick={validateData}
              block
              disabled={loading || isError}
            >
              <Form.Row style={{justifyContent: 'center'}}>Register {loading ? <Spinner /> : null}</Form.Row>
            </Button>
          </Form.Group>

        </Form>
      </Container>
    </div>
  );
};

export default VoterRegister;
