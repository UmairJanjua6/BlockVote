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
import userModal from '../../../voterFiles/context/Modal.js';

const useStyles = makeStyles (theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing (3),
  },
}));
export default function AddCandidate () {
  const classes = useStyles ();
  const [conNum, setConNum] = useState (0);
  const [candidateAddress, setCandidateAddress] = useState (0);
  const [name, setName] = useState ('');
  const [openModal, setOpenModal] = useState ();
  const [{contract, accounts, handleReceipt}, dispatch] = useStore ();

  useEffect (() => {
    loadBlockchain (dispatch);
  }, []);

  const addCandidateFunc = async () => {
    try {
      await addCandidate (
        conNum,
        candidateAddress,
        name,
        contract,
        accounts,
        dispatch
      );
      if (handleReceipt) {
        setOpenModal (true);
        console.log("handleReceipt: " + handleReceipt);
      }
    } catch (error) {
      console.log ('addCandidate error: ', error);
    }
  };

  return (
    <div>
      <SideBar />
      <Toolbar />
      <div>
        <CssBaseline />
        {openModal &&
          handleReceipt &&
          <userModal
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
                <Form.Label>Candidate Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Name"
                  value={name}
                  onChange={e => setName (e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="CandidateAddress">
                <Form.Label>Candidate Address</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Ethereum address"
                  value={candidateAddress}
                  onChange={e => setCandidateAddress (e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Select Constituency</Form.Label>
                <Form.Control
                  as="select"
                  onChange={e => setConNum (e.target.value)}
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
              >
                Add candidate
              </Button>
            </Form>
          </Box>
        </main>
      </div>

    </div>
  );
}
