import React from 'react';
import './CloseButton.css'

function CloseButton() {
  return (
    <>
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <p id="btn"> ≡ </p>
        <p id="cancel"> x </p>
      </label>
    </>
  );
}

export default CloseButton;