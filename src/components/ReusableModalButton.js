import React from 'react';

function ReusableModalButton({ buttonText, onModalButtonClick }) {
  return (
    <button className="modal-button" onClick={onModalButtonClick}>
      {buttonText}
    </button>
  );
}

export default ReusableModalButton;
