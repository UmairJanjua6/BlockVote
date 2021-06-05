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

const useStyles = makeStyles (theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing (3),
  },
}));

export default function MintVote () {
  const [consNum, setConsNum] = useState (0);
  const [votes, setVotes] = useState (0);
  const classes = useStyles ();
  const [{contract, accounts}, dispatch] = useStore ();
  useEffect (() => {
    loadBlockchain (dispatch);
  }, []);
  const mintVoteFunc = () => {
    mintVotes (
      consNum,
      votes,
      '',
      consNum,
      '0x00',
      accounts,
      contract,
      dispatch
    );
  };
  return (
    <div>
      <CssBaseline />

      <SideBar />
      <Toolbar />
      <div>
        <CssBaseline />
        <main className={classes.content}>
          <Box maxWidth="md" style={{paddingLeft: '250px'}}>
            <Typography variant="h3">Mint Vote</Typography>
            <Form>
              <Form.Group controlId="constiNum">
                <Form.Label>Constituency Number</Form.Label>
                <Form.Control
                  placeholder="Cons Number"
                  onChange={e => setConsNum (e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="vote">
                <Form.Label>Total Votes</Form.Label>
                <Form.Control
                  placeholder="No. of votes"
                  onChange={e => setVotes (e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="btn btn-dark "
                onClick={mintVoteFunc}
              >
                Mint Votes
              </Button>
            </Form>

          </Box>
        </main>
      </div>

    </div>
  );
}
