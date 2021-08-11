import {Container} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import { MultiStepForm, Step } from 'react-multi-form';
import { useHistory} from 'react-router-dom';
import {verifyEmail} from '../context/async';
import {useStore} from '../context/GlobalState';
import {loadBlockchain} from '../context/async';
import '../../index.css';

const EmailSuccess = (props) => {
const [active, setActive] = useState(1);
const [address, setAddress] = useState();
const history = useHistory();
const [{verificationSuccess, contract, accounts}, dispatch] = useStore();

useEffect(async() => {
    await loadBlockchain(dispatch);
    setAddress(props.match.params.address);
}, []);
console.log("success: ", verificationSuccess);
const approveEmail = async () => {
    try {
        await verifyEmail(address, contract, accounts, dispatch);
        if(verificationSuccess !== null) {
            await setActive(active + 1);
        }
    } catch (err) {
        console.log("EmailSuccess: verify email error: ", err);
    }
}
 return (
    <div className="email-success">
        <Container maxWidth="xs" style={{marginTop: '100px'}}>
        <MultiStepForm activeStep={active} accentColor="#f0b90b">
            <Step>
                <Form.Group style={{textAlign: 'center'}}>
                    <span>You are about to complete verification against the email <strong>{ props.match.params.email }</strong></span>
                    <br/>
                    <p>{ props.match.params.address }</p>
                    <Button
                        variant="contained"
                        size="lg"
                        style={{backgroundColor: '#f0b90b', color: '#12161C', marginLeft: 'auto', marginRight: 'auto', display: 'flex', fontWeight: '500'}}
                        onClick={approveEmail}
                    >
                        Continue Verification
                    </Button>
                </Form.Group>
            </Step>
            <Step>
                <Form.Group>
                    <div style={{textAlign: 'center', alignItems: 'center'}}>
                        <h2>Congratulations! Your email is successfully verified.</h2>
                    </div>
                    <Button
                        variant="contained"
                        size="lg"
                        style={{backgroundColor: '#f0b90b', color: '#12161C', marginLeft: 'auto', marginRight: 'auto', display: 'flex', fontWeight: '500'}}
                        onClick={() => {history.push("/userlogin")}}
                    >
                        Finish
                    </Button>
                </Form.Group>
            </Step>
        </MultiStepForm>
        </Container>
    </div>
  );
};

export default EmailSuccess;
