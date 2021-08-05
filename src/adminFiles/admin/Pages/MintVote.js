import {Box, Typography} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import SideBar from '../Components/SideBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import {useStore} from '../../../voterFiles/context/GlobalState';
import {mintVotes} from '../../../voterFiles/context/async';
import {loadBlockchain} from '../../../voterFiles/context/async';
import Modal from '../../../voterFiles/context/Modal.js';

const useStyles = makeStyles (theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing (3),
  },
}));

export default function MintVote () {
  const [consNum, setConsNum] = useState (0);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState (0);
  const classes = useStyles ();
  const [openModal, setOpenModal] = useState ();
  const [consStates, setConsStates] = useState(true);
  const [voteState, setVoteState] = useState(true);
  const [{contract, accounts, handleReceipt, ownerAddress}, dispatch] = useStore ();
  
  useEffect (() => {
    const loadWeb3 = async () => {
      await loadBlockchain (dispatch);
      await setTimeout(() => {
      setLoading(false)
   }, 1);
    }
    loadWeb3();
  }, []);

  const mintVoteFunc = async () => {
    try{
    await mintVotes (
      consNum,
      votes,
      '',
      consNum,
      '0x00',
      accounts,
      contract,
      dispatch
    );
    if (handleReceipt != null) {
      setOpenModal (true);
      console.log ('handleReceipt: ' + handleReceipt);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
  };

  const handleConstituency = e => {
    const value = e.target.value;
    setConsNum(value);
    if(value < 1 || value > 3) {
      setConsStates(true);
      return;
    }
    setConsStates(false);
  }

  const handleVotes = e => {
    const value = e.target.value;
    setVotes(value);
    if(value < 1) {
      setVoteState(true);
      return;
    }
    setVoteState(false);
  }
  return (
    <div>
      <CssBaseline />
      <SideBar />
      <Toolbar />
        <CssBaseline />
    { !loading ?
    ownerAddress === accounts[0] ?
    <div>
      {openModal &&
        handleReceipt &&
        <Modal
          closeModal={setOpenModal}
          title={'New Votes'}
          body={'New votes has been added in Constituency no:' + consNum}
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
      <div>
        <main className={classes.content}>
          <Box maxWidth="md" style={{paddingLeft: '250px'}}>
            <Typography variant="h3">Mint Votes</Typography>
            <Form>
              <Form.Group controlId="constiNum">
                <Form.Label>Constituency Number* (1 - 3)</Form.Label>
                <Form.Control
                  placeholder="Cons Number"
                  onChange={handleConstituency}
                />
              </Form.Group>
              <Form.Group controlId="vote">
                <Form.Label>Total Votes*</Form.Label>
                <Form.Control
                  placeholder="No. of votes"
                  onChange={handleVotes}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="btn btn-dark "
                onClick={mintVoteFunc}
                disabled = {consStates || voteState}
              >
                Mint Votes
              </Button>
            </Form>

          </Box>
        </main>
      </div>
      </div>
      : alert ('Kindly login from owner account') : ""}
    </div>
  );
}
