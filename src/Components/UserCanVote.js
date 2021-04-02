import React from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ImranKhanImg from '../img/imran_khan.jpg';
import BrackObamaImg from '../img/barack_obama.jpg';
import DonaldTrumpImg from '../img/donald_trump.jpg';
import VladimirPutinImg from '../img/vladmir_putin.jpeg';
import '../index.css';

const UserCanVote = () => {
    return (
        <div>
            <div className="UCVNavbar">
                <h2>Election 2021</h2>
                <p>Select a suitable candidate that you <b>prefer</b>.</p>
            </div>
            <div className="candidateList">
            <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={ImranKhanImg} />
                <Card.Body>
                    <Card.Title>Imran Khan</Card.Title>
                    <Card.Text>
                        Pakistan Tehreek Insaf
                   </Card.Text>
                  <Button variant="success">Vote</Button>
             </Card.Body>
            </Card>

            <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={BrackObamaImg} />
                <Card.Body>
                    <Card.Title>Barack Obama</Card.Title>
                    <Card.Text>
                        Democratic Party
                   </Card.Text>
                  <Button variant="primary">Vote</Button>
             </Card.Body>
            </Card>

            <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={DonaldTrumpImg} />
                <Card.Body>
                    <Card.Title>Donald Trump</Card.Title>
                    <Card.Text>
                        Republician
                   </Card.Text>
                  <Button variant="danger">Vote</Button>
             </Card.Body>
            </Card>

            <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={VladimirPutinImg} />
                <Card.Body>
                    <Card.Title>Vladimir Putin</Card.Title>
                    <Card.Text>
                        GOAT
                   </Card.Text>
                  <Button variant="warning">Vote</Button>
             </Card.Body>
            </Card>
            </div>
        </div>
    );
}

export default UserCanVote;