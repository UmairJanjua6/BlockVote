import {Container} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Form , Button , Col} from "react-bootstrap";
import {useStore} from '../context/GlobalState';
import {addVoter} from '../context/async';
import {loadBlockchain} from '../context/async';

const VoterRegister = () => {

const[name, setName] = useState("");
const[cnic, setCnic] = useState();
const[email, setEmail] = useState("");
const[constituency, setConstituency] = useState();
const [address, setAddress] = useState();
const [{ accounts, contract }, dispatch] = useStore();

useEffect (async () => {
  await loadBlockchain (dispatch);
}, []);

const addVoterFunc = async () => {
  try {
    await addVoter(address, name, cnic, email, constituency, contract, accounts, dispatch);
  }
  catch(error) {
    console.log("error: ", error);
  }
};

        return (
          <div>
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
                <Form.Control   value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Enter your Name" />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label> CNIC </Form.Label>
                    <Form.Control pattern="[0-9]{13}" value={cnic} onChange={(e) => setCnic(e.target.value)} type="cnic" placeholder="Enter your CNIC"></Form.Control>
                </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Label> Email </Form.Label>
                    <Form.Control type="email"  placeholder="Enter email" value = {email}  onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                
  <Form.Group>
  <Form.Label>Select Constituency</Form.Label>
  <Form.Control as="select" value={constituency} onChange={(e) => setConstituency(e.target.value)}>
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
    <Form.Control placeholder= "Ethereum wallet address" value = {address}  onChange={(e) => setAddress(e.target.value)} />
  </Form.Group>
                <Form.Group style={{textAlign:'center'}} >
                <Button variant="contained" size="lg" style={{backgroundColor:'#f0b90b' , color:'#12161C'}} onClick= {addVoterFunc} block>Register</Button>
                </Form.Group>
               
            </Form>
            </Container>
            </div>
        );
    }

    export default VoterRegister;