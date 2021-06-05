import React, {useState, useEffect} from 'react';
import {Card, Modal} from 'react-bootstrap';
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
    {
      contract,
      accounts,
      getCandidateInfo,
      singleVoterInfo,
      electionStatus,
      voteCast,
    },
    dispatch,
  ] = useStore ();
  const [modalShow, setModalShow] = useState (false);
  const [showList, setShowList] = useState (false);
  const [text, setText] = useState ('Show');
  useEffect (async () => {
    await loadBlockchain (dispatch);
    setModalShow (true);
  }, []);
  let constituency;
  if (singleVoterInfo) {
    constituency = singleVoterInfo.voteConstituency;
  }

  const getCandidateList = async () => {
    try {
      await electionStatusGet (accounts, contract, dispatch);
      await getVoterDetails (accounts[0], accounts, contract, dispatch);
      await getCandidatesInConsi (constituency, contract, accounts, dispatch);
    } catch (error) {
      console.log ('error: ', error);
    }
  };

  const castVote = async candidateAddress => {
    try {
      await vote (candidateAddress, constituency, accounts, contract, dispatch);
    } catch (error) {
      console.log ('error: ', error);
    }
  };

  const handleText = () => {
    if (text === 'Show') {
      setText ('Hide');
    } else {
      setText ('Show');
    }
  };

  function MyVerticallyCenteredModal (props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Terms &amp; Conditions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Code of Conduct for voter
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Agree</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const renderCard = (card, index) => {
    return (
      <Card style={{width: '18rem'}} key={index} className="box">
        <Card.Img variant="top" src="holder.js/100px180" src={avatar} />
        <Card.Body>
          <Card.Title>{card.candiName}</Card.Title>
          <Card.Text>{card.candiAddress}</Card.Text>
          <Button
            style={{width: '100px'}}
            variant={card.variant}
            onClick={() => {
              castVote (card.candiAddress);
            }}
          >
            Vote
          </Button>
        </Card.Body>
      </Card>
    );
  };
  return (
    <div className="container-fluid">
      <div className="userInstruction">
        <h2>Election 2021</h2>
        <Button
          variant="primary"
          onClick={() => {
            getCandidateList ();
            setShowList (!showList);
            handleText ();
          }}
        >
          {text} Candidates List
        </Button>
      </div>
      <div>
        {showList
          ? <div>
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
                                  : ''}
                              </div>
                            : <div>
                                <h1>Election not started yet!</h1>
                              </div>}
                        </div>
                      : <div className="notVoter">
                          <h1>You are not authorize to vote!</h1>
                        </div>}
                  </div>
                : ''}
            </div>
          : null}
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow (false);
          getCandidateList ();
        }}
      />
    </div>
  );
};

export default UserCanVote;
