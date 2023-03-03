import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './successModal.scss';

const SuccessModal = () => {
  return (
    <div className="success-modal">
      <div className="success-modal-content">
        <div className="success-icon">
          <FontAwesomeIcon icon={faCheckCircle} />
			 
        </div>
        <h3>Реєстрація успішна!</h3>
      </div>
    </div>
  );
};

export default SuccessModal;
