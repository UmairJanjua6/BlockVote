import React, {useState, useEffect} from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import avatar from '../img/avatar.png';
import {getCandidatesInConsi} from '../context/async';
import {loadBlockchain} from '../context/async';
import {getVoterDetails} from '../context/async';
import {useStore} from '../context/GlobalState';
import '../../index.css';

const UserCanVote = () => {

    const [candidateList, setCandidateList] = useState([]);
    const [voterInfo, setVoterInfo] = useState([]);
    const [ { contract, accounts, getCandidateInfo, singleVoterInfo}, dispatch] = useStore();
    console.log("data: ", accounts[0]);

    useEffect ( async() => {
        await loadBlockchain(dispatch);
    }, []);

    const getCandidateList = async(consNum) => {
        try {
            await getVoterDetails(accounts[0], accounts, contract, dispatch);
            if(singleVoterInfo) {
                setVoterInfo(singleVoterInfo);
            }
            await getCandidatesInConsi(consNum, contract, accounts, dispatch);
            if(getCandidateInfo) {
            setCandidateList(getCandidateInfo);
            }
        } catch (error) {
            console.log("error: ", error);
        }
    }
    
    console.log("details: ", candidateList);
    console.log("voter info: ", voterInfo);
    console.log("authorize: ", voterInfo.authorize);
    const renderCard = (card, index) => {
        return (
        <Card style={{ width: '18rem'}} key={index} className="box">
                <Card.Img variant="top" src="holder.js/100px180" src={avatar} />
                <Card.Body>
                    <Card.Title>{card.candiName}</Card.Title>
                    <Card.Text>{card.candiAddress}</Card.Text>
                    <Button style={{width: '100px'}} variant={card.variant}>Vote</Button>
             </Card.Body>
            </Card>
        );
    }
    return (
        <div>
            <div className="userInstruction">
                <h2>Election 2021</h2>
                <Button variant="primary" onClick={() => getCandidateList(1)}>Click</Button>
                <p>Select a suitable candidate that you <b>prefer</b>.</p>
            </div>
            <div>
                {voterInfo.authorize == true ? <div className="started">
                {candidateList.map(renderCard)}
            </div> : <div className="ended">
                <h1>You are not authorize to vote!</h1>
            </div>}
            </div>
            
        </div>
    );
}

export default UserCanVote;