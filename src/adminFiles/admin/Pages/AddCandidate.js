import React, {useState, useEffect} from 'react';
import {Box, Typography} from '@material-ui/core';
import {Form, Button} from 'react-bootstrap';
import SideBar from '../Components/SideBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import {useStore} from '../../../voterFiles/context/GlobalState';
import {loadBlockchain} from '../../../voterFiles/context/async';
import {addCandidate} from '../../../voterFiles/context/async';
import Modal from '../../../voterFiles/context/Modal.js';
import {getCandidatesInConsi} from '../../../voterFiles/context/async';
import { ValidateAddress } from '../../../voterFiles/Components/Regex.js';

const useStyles = makeStyles (theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing (3),
  },
}));
export default function AddCandidate () {
  const classes = useStyles ();
  const [loading, setLoading] = useState(true);
  const [conNum, setConNum] = useState (0);
  const [candidateAddress, setCandidateAddress] = useState (0);
  const [name, setName] = useState ('');
  const [openModal, setOpenModal] = useState ();
  const [nameStatus, setNameStatus] = useState(true);
  const [consStatus, setConsStatus] = useState(true);
  const [addressStatus, setAddressStatus] = useState(true);
  const [{contract, accounts, handleReceipt, ownerAddress, getCandidateInfo}, dispatch] = useStore ();

  useEffect (() => {
    const loadWeb3 = async () => {
      await loadBlockchain (dispatch);
      await setTimeout(() => {
      setLoading(false)
   }, 1);
    }
    loadWeb3();
  }, []);
  const getCandidateData = async (consNum) => {
    try {
      await getCandidatesInConsi (consNum, contract, accounts, dispatch);
    } catch (error) {
      console.log ('addCandidate error: ', error);
    }
  };
  const addCandidateFunc = async () => {
    let flag = false;
    for(var i = 0; i < getCandidateInfo.length; i++) {
      if(getCandidateInfo[i].candiAddress === candidateAddress) {
        flag = true;
        alert("Candidate already exists in current constituency");
      }
    }
     if(flag === false) {
    try {
      await addCandidate (
        conNum,
        candidateAddress,
        name,
        contract,
        accounts,
        dispatch
      );
      console.log("inner handle: ", handleReceipt);
      if (handleReceipt !== null) {
        console.log("handle: ", handleReceipt);
        setOpenModal (true);
      }
    } catch (error) {
      console.log ('addCandidate error: ', error);
    }
    await getCandidateData(conNum);
    }
  };

  const handleName = e => {
    const value = e.target.value;
    setName(value);
    if(value.length > 5) {
      setNameStatus(false);
      return;
    }
    setNameStatus(true);
  }

  const handleAddress = e => {
    const value = e.target.value;
    const isValid = ValidateAddress(value);
    setCandidateAddress(value);
    if(!isValid) {
      setAddressStatus(true);
      return;
    }
    setAddressStatus(false);
  }

  const handleConstituency = e => {
    const value = e.target.value;
    getCandidateData(e.target.value)
    if(value != 0) {
      setConNum(value);
      setConsStatus(false);
      return;
    }
    setConsStatus(true);
  }
  return (
    <div>
      <SideBar />
      <Toolbar />
      { !loading ?
      ownerAddress === accounts[0] ?
      <div>
        <CssBaseline />
        {openModal &&
          handleReceipt &&
          <Modal
            closeModal={setOpenModal}
            title={'Transaction Success'}
            body={'New Candidate has been added successfully.'}
            txLink={
              <a
                href={
                  'https://ropsten.etherscan.io/tx/' +
                    handleReceipt.transactionHash
                }
              >
                See on etherscan
              </a>
            }
          />}
        <main className={classes.content}>
          <Box maxWidth="md" style={{paddingLeft: '250px'}}>
            <Typography variant="h3">Add Candidate</Typography>

            <br />
            <Form>
              <Form.Group controlId="CandidateName">
                <Form.Label>Candidate Name*</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Name"
                  value={name}
                  onChange={handleName}
                />
              </Form.Group>
              <Form.Group controlId="CandidateAddress">
                <Form.Label>Candidate Address*</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Ethereum address"
                  value={candidateAddress}
                  onChange={handleAddress}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Select Constituency*</Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleConstituency}
                >
                  <option value="0">Choose...</option>
                  <option value="1">Constituency 1</option>
                  <option value="2">Constituency 2</option>
                  <option value="3">Constituency 3</option>
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                className="btn btn-dark "
                onClick={addCandidateFunc}
                disabled = {nameStatus || addressStatus || consStatus}
              >
                Add candidate
              </Button>
            </Form>
          </Box>
        </main>
      </div>
      : alert ('Kindly login from owner account') : ""}
    </div>
  );
}
