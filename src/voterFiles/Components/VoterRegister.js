import {Container} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {useStore} from '../context/GlobalState';
import {addVoter} from '../context/async';
import {loadBlockchain} from '../context/async';
import Modal from '../context/Modal.js';
import Spinner from "./Spinner";

const VoterRegister = () => {
  const [name, setName] = useState ('');
  const [cnic, setCnic] = useState ();
  const [email, setEmail] = useState ('');
  const [constituency, setConstituency] = useState ();
  const [address, setAddress] = useState ();
  const [openModal, setOpenModal] = useState ();
  const [{accounts, contract, handleReceipt}, dispatch] = useStore ();
  const [ loading, setLoading ] = useState(false);
  const [ successConfirmation, setSuccessConfirmation ] = useState(false);
  const [ failConfirmation, setFailConfirmation ] = useState(false);
  const [ modalBody, setModalBody ] = useState("");

  useEffect (async () => {
    await loadBlockchain (dispatch);
  }, []);

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
        await sendEmail(email);
        setOpenModal (true);
      }
    } catch (error) {
      console.log ('error: ', error);
    }
  };

  const sendEmail = async(email) => {
    const url = process.env.REACT_APP_DEV_NODE_URL + process.env.REACT_APP_ROUTE_PATH + process.env.REACT_APP_REGISTER_EMAIL_PATH;
    setLoading(true);
    const response = await fetch(url, { 
        method: 'POST', 
        headers: { 
            'Content-type': 'application/json'
        }, 
        body: JSON.stringify({ email }) 
    }); 
      const resData = await response.json(); 
      if (resData.status === 'success'){
        await setLoading(false);
        await setModalBody("Verification Email Sent.");
        await setSuccessConfirmation (true);
        await setFailConfirmation (false);
    }else if(resData.status === 'fail'){
        await setLoading(false);
        await setModalBody("Verification Email Sending Failed. Please try again")
        await setSuccessConfirmation (false);
        await setFailConfirmation (true);
    }
  };

  return (
    <div>
      {openModal &&
        handleReceipt &&
        <Modal
          closeModal={setOpenModal}
          title={'Vote Status'}
          body={modalBody}
          txLink={
            <a
              href={
                'https://ropsten.etherscan.io/tx/' +
                  handleReceipt.transactionHash
              }
            >
              View on etherscan
            </a>
          }
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
                onChange={e => setName (e.target.value)}
                type="name"
                placeholder="Enter your Name"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label> CNIC </Form.Label>
              <Form.Control
                pattern="[0-9]{13}"
                value={cnic}
                onChange={e => setCnic (e.target.value)}
                type="cnic"
                placeholder="Enter your CNIC"
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label> Email </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail (e.target.value)}
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
          {loading && <Form.Row>Verification Email Sending... <Spinner /></Form.Row>}
          {/* {successConfirmation && !loading && <p class="para">Verification Email Sent!</p>}
          {failConfirmation && !loading && <p class="para-error">Verification Email Sending Failed. Please try again</p>} */}
          <Form.Group style={{textAlign: 'center', marginTop: '30px'}}>
            <Button
              variant="contained"
              size="lg"
              style={{backgroundColor: '#f0b90b', color: '#12161C'}}
              onClick={addVoterFunc}
              block
              disabled={loading}
            >
              Register
            </Button>
          </Form.Group>

        </Form>
      </Container>
    </div>
  );
};

export default VoterRegister;
