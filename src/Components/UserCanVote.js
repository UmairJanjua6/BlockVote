import React from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ImranKhanImg from '../img/imran_khan.jpg';
import BrackObamaImg from '../img/barack_obama.jpg';
import DonaldTrumpImg from '../img/donald_trump.jpg';
import VladimirPutinImg from '../img/vladmir_putin.jpeg';
import '../index.css';

const UserCanVote = () => {
    const cardInfo = [
        {
            image: `${ImranKhanImg}`, 
            title: "Imran Khan", 
            text: "Pakistan Peoples Party",
            variant: "primary",
        },
        {
            image: `${DonaldTrumpImg}`, 
            title: "Donald Trump", 
            text: "Republician",
            variant: "secondary",
        },
        {
            image: `${BrackObamaImg}`, 
            title: "Brack Obama", 
            text: "Democratic Party",
            variant: "danger"
        },
        {
            image: `${VladimirPutinImg}`, 
            title: "Vladimir Putin", 
            text: "Russia KGB",
            variant: "warning",
        },
    ];

    const renderCard = (card, index) => {
        return (
        <Card style={{ width: '18rem'}} key={index} className="box">
                <Card.Img variant="top" src="holder.js/100px180" src={card.image} />
                <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.text}</Card.Text>
                    <Button style={{width: '100px'}} variant={card.variant}>Vote</Button>
             </Card.Body>
            </Card>
        );
    }
    return (
        <div>
            <div className="userInstruction">
                <h2>Election 2021</h2>
                <p>Select a suitable candidate that you <b>prefer</b>.</p>
            </div>
            <div className="grid">
                {cardInfo.map(renderCard)}
            </div>
        </div>
    );
}

export default UserCanVote;