import React from 'react';
import './Modal.css';

const Modal = ({closeModal, title, body, txLink}) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal (false)}> X </button>
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
          <button onClick={() => closeModal (false)}> OK </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
