import React from 'react';
import '../../css/AddProjectPopup.css'

const ConfirmPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="overlay">
      <div className="popup-inner">
        <h2>Confirm</h2>
        <p>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmPopup;
