import React from 'react';
import './Modal.css';

const userModal = ({closeModal, title, body, txLink}) => {
  const refreshPage = () => {
    window.location.reload(false);
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {closeModal (false); refreshPage();}}> X </button>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="body">
          <p>{body}</p>
        </div>
        <div className="txLink">
          <p>{txLink}</p>
        </div>
        <div className="footer">
          <button onClick={() => {closeModal (false); refreshPage();}}> OK </button>
        </div>
      </div>
    </div>
  );
};

export default userModal;
