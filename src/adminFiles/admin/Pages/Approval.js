import React, {useContext} from 'react'
import { Button } from 'react-bootstrap';       
import {GlobalContext} from '../../../voterFiles/context/GlobalState';

export const Approval = ({voter}) => {
    const {deleteVoter} = useContext(GlobalContext);
    return (
        <tr>
      <td>{voter.name}</td>
      <td>{voter.cnic}</td>
      <td>{voter.constituency}</td>
      <td>{voter.address}</td>
      <td><Button variant="success">Approve</Button></td>
      <td><Button variant="danger" onClick={() => deleteVoter(voter.cnic)}>Reject</Button></td>
    </tr>
    )
}
