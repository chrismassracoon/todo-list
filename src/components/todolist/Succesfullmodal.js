import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import './successModal.scss';

const SuccessModal = ({ visible, reg }) => {
  return (
    <CSSTransition in={visible} timeout={300} classNames="success-modal" unmountOnExit>
      <div className="success-modal">
        <div className="success-modal-content">
          <div className="success-icon">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <h3>{reg ? 'Successful registration!' : 'Successful entry!'}</h3>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SuccessModal;
