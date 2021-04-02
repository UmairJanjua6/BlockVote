import React from 'react';
import { useHistory} from 'react-router-dom';
import '../index.css';
import logo from'../img/Logo2.png';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { Button } from 'react-bootstrap';

const CardContainer = () => {
  let history = useHistory();
  return (
    <div className="CardContainer">
      <img src={logo} alt="logo"/>
      <Button className="btnUser" onClick= {() => {history.push("/userlogin")}} >User Login</Button>
      <br/>
      <Button className="btnAdmin" onClick= {() => {history.push("/adminlogin")}}>Admin Login</Button>
    </div>
  )
}

export default CardContainer;