import React, {useState, useEffect} from 'react';
import {Card} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import avatar from '../img/avatar.png';
import {getCandidatesInConsi} from '../context/async';
import {loadBlockchain} from '../context/async';
import {getVoterDetails} from '../context/async';
import {electionStatusGet} from '../context/async';
import {vote} from '../context/async';
import {useStore} from '../context/GlobalState';

import '../../index.css';

const UserCanVote = () => {
  const [
    {contract, accounts, getCandidateInfo, singleVoterInfo, electionStatus},
    dispatch,
  ] = useStore ();
  let constituency;
  console.log ('data: ', accounts[0]);

  useEffect (async () => {
    await loadBlockchain (dispatch);
    console.log ('handle');
  }, []);

  console.log ('status: ', electionStatus);
  if(singleVoterInfo) {
    constituency = singleVoterInfo.voteConstituency;
    console.log("inner constituency: ", constituency);
  }

  const getCandidateList = async () => {
    try {
      await electionStatusGet (accounts, contract, dispatch);
      await getVoterDetails (accounts[0], accounts, contract, dispatch);
      console.log("outer constituency: ", constituency);
      await getCandidatesInConsi (constituency, contract, accounts, dispatch);
    } catch (error) {
      console.log ('error: ', error);
    }
  };

  const castVote = async (candidateAddress) => {
      try {
        await vote(candidateAddress, constituency, accounts, contract);
      } catch (error) {
          console.log ('error: ', error);
      }
  }
  console.log ('details: ', getCandidateInfo);
  console.log ('voter info: ', singleVoterInfo);
  const renderCard = (card, index) => {
    return (
      <Card style={{width: '18rem'}} key={index} className="box">
        <Card.Img variant="top" src="holder.js/100px180" src={avatar} />
        <Card.Body>
          <Card.Title>{card.candiName}</Card.Title>
          <Card.Text>{card.candiAddress}</Card.Text>
          <Button style={{width: '100px'}} variant={card.variant} onClick={ () => {castVote(card.candiAddress)}}>Vote</Button>
        </Card.Body>
      </Card>
    );
  };
  return (
    <div>
      <div className="userInstruction">
        <h2>Election 2021</h2>
        <Button
          variant="primary"
          style={{marginTop: '100px'}}
          onClick={getCandidateList}
        >
          Click
        </Button>
        <p>Select a suitable candidate that you <b>prefer</b>.</p>
      </div>
      <div>
        {singleVoterInfo !== undefined
          ? <div>
              {singleVoterInfo.authorize == true
              ? <div>
                {electionStatus == true
                  ? <div>
                      {getCandidateInfo !== undefined
                        ? <div className="voter">
                            {getCandidateInfo.map (renderCard)}
                          </div>
                        : ""}
                    </div>
                  : <div>
                      <h1>Election not started yet!</h1>
                    </div>}
              </div>
              : <div className="notVoter">
                <h1>You are not authorize to vote!</h1>
              </div>}
            </div>
          : ""}
      </div>

    </div>
  );
};

export default UserCanVote;
