import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

const MyVerticallyCenteredModal = (props) => {
    const [check1, setCheck1] = useState();
    const [check2, setCheck2] = useState();
    const onChange = (e) => {
        setCheck1(e.target.checked);
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <form>
              <h1>Do you Agree: {check1 ? "Yes" : "No"}</h1>
              <label>
                  Agree: 
                  <input type="checkbox"
                      checked={check1}
                      onChange={onChange}
                  />
              </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal;
  
//   function App() {
//     const [modalShow, setModalShow] = React.useState(false);
  
//     return (
//       <>
//         <Button variant="primary" onClick={() => setModalShow(true)}>
//           Launch vertically centered modal
//         </Button>
  
//         <MyVerticallyCenteredModal
//           show={modalShow}
//           onHide={() => setModalShow(false)}
//         />
//       </>
//     );
//   }
  
//   render(<App />);