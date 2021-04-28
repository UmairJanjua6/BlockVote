import { Avatar, Container , Grid , Link } from "@material-ui/core";
import React, { Component } from "react";
import { Form , Button , Col} from "react-bootstrap";
import web3 from 'web3';

export default class VoterRegister extends Component {

  
async loadBlockchainData() {
  const Web3 = window.web3
    const accounts = await Web3.eth.getAccounts()
    console.log(accounts);
  }
    render() {
        return (
          <div >
            <Container maxWidth="xs" style={{ marginTop:'100px'}} >
            <Form>
            
              <Form.Group>
                <div style={{textAlign:'center', alignItems:"center" }}>
                  
                  <h2 >Register</h2>
                </div>
                </Form.Group>
                <Form.Row>
                <Form.Group as={Col}  controlId="VoterName">
                <Form.Label>Name</Form.Label>
                <Form.Control  pattern="[A-Za-z]{1-30}" type="name" placeholder="Enter your Name" />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label> CNIC </Form.Label>
                    <Form.Control pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}" type="cnic" placeholder="Enter your CNIC"></Form.Control>
                </Form.Group>
                </Form.Row>
                
  <Form.Group>
  <Form.Label>Select Constituency</Form.Label>
  <Form.Control as="select" >
  <option value="0">Choose...</option>
    <option value="1">Constituency 1</option>
    <option value="2">Constituency 2</option>
    <option value="3">Constituency 3</option>
    <option value="4">Constituency 4</option>
    <option value="5">Constituency 5</option>
  </Form.Control>
  </Form.Group>
  <Form.Group>
    <Form.Label>Voter Ethereum Address</Form.Label>
    <Form.Control placeholder="Connect your Wallet" disabled />
  </Form.Group>
                <Form.Group>
                    <Form.Label> Fingerprint Scan </Form.Label>
                    <Form.Control type=""  placeholder=""></Form.Control>
                </Form.Group>
                <Form.Group style={{textAlign:'center'}} >
                <Button variant="contained" size="lg" type="submit" style={{backgroundColor:'#f0b90b' , color:'#12161C'}} block>Register</Button>
                </Form.Group>
               
            </Form>
            </Container>
            </div>
        );
    }
}