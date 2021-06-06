import {Box, Toolbar} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {Card} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SideBar from '../Components/SideBar';
import avatarImg from '../../../voterFiles/img/avatar.png';
import {useStore} from '../../../voterFiles/context/GlobalState';
import {getCandidatesInConsi} from '../../../voterFiles/context/async';
import {loadBlockchain} from '../../../voterFiles/context/async';
import '../../App.css';

const CandidateList = () => {
  const [consNum, setConsNum] = useState ();
  const [{contract, accounts, getCandidateInfo}, dispatch] = useStore ();
  useEffect (() => {
    loadBlockchain (dispatch);
  }, []);
  const getCandidateData = async () => {
    try {
      await getCandidatesInConsi (consNum, contract, accounts, dispatch);
    } catch (error) {
      console.log ('addCandidate error: ', error);
    }
  };

  const renderCard = (card, index) => {
    return (
      <Card style={{width: '18rem'}} key={index} className="box">
        <Card.Img variant="top" src="holder.js/100px180" src={avatarImg} />
        <Card.Body>
          <Card.Title>{card.candiName}</Card.Title>
          <Card.Text>{card.candiAddress}</Card.Text>
        </Card.Body>
      </Card>
    );
  };
  return (
    <Box>
      <SideBar />
      <Toolbar />
      <main style={{padding: '24px'}}>
        <Box maxWidth="md" style={{paddingLeft: '250px'}}>
          <h2>Candidate List</h2>
          <h6>Select Constituency</h6>
          <select id="selectCandi" onChange={e => setConsNum (e.target.value)}>
            <option value="1">1</option>
            <option value="2" selected>2</option>
            <option value="3">3</option>
          </select>
          <Button variant="dark" onClick={getCandidateData}>Search</Button>
          <div className="grid" display="flex">
            {getCandidateInfo ? getCandidateInfo.map (renderCard) : ''}
          </div>
        </Box>
      </main>
    </Box>
  );
};

export default CandidateList;
