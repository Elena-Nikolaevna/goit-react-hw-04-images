import PropTypes from 'prop-types';
import { useEffect } from 'react';
//import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
//import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

const domNode = document.querySelector('#root');

export const Modal = ({ onCloseModal, imageUrl, alt }) => {
  useEffect(() => {
    const handleEsc = evt => {
      if (evt.code === 'Escape') {
        onCloseModal(evt);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });
  

  return createPortal(
    <Overlay
      onClick={event => {
        if (event.target !== event.currentTarget) {
          return;
        }
        onCloseModal();
      }}
      domNode
    >
      <ModalWindow>
        <img src={imageUrl} alt={alt} />
      </ModalWindow>
    </Overlay>,
    domNode
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
