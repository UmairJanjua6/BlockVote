// import React from 'react';
// import { useHistory} from 'react-router-dom';
// import { Button } from 'react-bootstrap';

// const EmailSuccess = () => {
//   let history = useHistory();
//   return (
//     <div className="container-fluid">
//       Congratulations! Your email is successfully verified.
//       <br/>
//       <Button className="btnAdmin" onClick= {() => {history.push("/adminlogin")}}>Admin Login</Button>
//     </div>
//   )
// }

// export default EmailSuccess;

import {Container} from '@material-ui/core';
import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { MultiStepForm, Step } from 'react-multi-form';

const EmailSuccess = () => {
const [active, setActive] = React.useState(1)
  return (
    <div>
      <Container maxWidth="xs" style={{marginTop: '100px'}}>
        <MultiStepForm activeStep={active} accentColor="#f0b90b">
            <Step>
                <Form.Group style={{textAlign: 'center'}}>
                    <Button
                        variant="contained"
                        size="lg"
                        style={{backgroundColor: '#f0b90b', color: '#12161C'}}
                        onClick={() => setActive(active + 1)}
                        block
                    >
                        Click here to continue verification
                    </Button>
                </Form.Group>
            </Step>
            <Step>
                <Form.Group>
                    <div style={{textAlign: 'center', alignItems: 'center'}}>
                    <h2>Congratulations! Your email is successfully verified.</h2>
                    </div>
                </Form.Group>
            </Step>
        </MultiStepForm>
      </Container>
    </div>
  );
};

export default EmailSuccess;
