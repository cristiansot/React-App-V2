import React from 'react';

function ResubaleModalButton({ buttonText, onModalButtonClick }) {
  return (
    <button className="modal-button" onClick={onModalButtonClick}>
      {buttonText}
    </button>
  );
}

export default ResubaleModalButton;
