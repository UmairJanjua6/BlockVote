import { Box, Container, Toolbar, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import SideBar from '../Components/SideBar';



  
export default class CandidateList extends React.Component{ 
    
     cardInfo = [
        {
            image: "avatar.png", 
            title: "Candidate 1", 
           
        },
        {
            image: "avatar.png", 
            title: "Candidate 2",  
          
        },
        {
            image: "avatar.png", 
            title: "Candidate 3", 
            
        }
        
        
    ];
   renderCard = (card, index) => {
        return (
        <Card style={{ width: '200px'}} key={index} className="box">
                <Card.Img variant="top" src="holder.js/100px180" src={card.image} style={{width: '200px', height:'200px'}} />
                <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Button style={{width: '100px'}} variant={"primary"}  className="btn btn-dark ">Remove</Button>
             </Card.Body>
            </Card>
        );
    }
    render() {
        
        return (
            
            <div>
        <SideBar></SideBar>
        <Toolbar/>
            <main  style={{padding:'25px'}} >
            <Box maxWidth="md" style={{paddingLeft:'250px'}}>
            <Typography variant="h3">Candidate List</Typography>
        <div className="grid" display="flex" >
            {this.cardInfo.map(this.renderCard)}
        </div>
    
      
            </Box>
            </main>
            </div>
    
    )
      }

}