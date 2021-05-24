import { Box, Container, Toolbar, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import SideBar from '../Components/SideBar';
import avatarImg from '../../../voterFiles/img/avatar.png';
import { useStore } from '../../../voterFiles/context/GlobalState';
import { getCandidatesInConsi } from '../../../voterFiles/context/async';
import '../../App.css';


const CandidateList = () => {
    const [consNum, setConsNum] = useState();
    console.log("consNum: ", consNum);
    const [{ contract, accounts, getCandidateInfo }, dispatch] = useStore();

    const getCandidateData = async () => {
        try {
            await getCandidatesInConsi(consNum, contract, accounts, dispatch);
        }
        catch (error) {
            console.log("addCandidate error: ", error);
        }
    }

    let renderCard = (card, index) => {
        return (
            <Card style={{ width: '18rem' }} key={index} className="box">
                <Card.Img variant="top" src="holder.js/100px180" src={avatarImg} />
                <Card.Body>
                    <Card.Title>{card.candiName}</Card.Title>
                    <Card.Text>{card.candiAddress}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
    return (
        <Box>
            <SideBar></SideBar>
            <Toolbar />
            <main style={{ padding: '24px' }}  >
                <Box maxWidth="md" style={{ paddingLeft: '250px' }} >
                    <h3>Candidate List</h3>
                    <h6>Select Constituency</h6>
                    <select id= "selectCandi" onChange={(e) => setConsNum(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2" selected>2</option>
                        <option value="3">3</option>
                    </select>
                    <Button variant="secondary" onClick={getCandidateData}>Search</Button>
                    <div className="grid" display="flex" >
                        {getCandidateInfo.map(renderCard)}
                    </div>
                </Box>
            </main>
        </Box>

    )
}

export default CandidateList;