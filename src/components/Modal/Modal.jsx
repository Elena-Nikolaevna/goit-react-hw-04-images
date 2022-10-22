import PropTypes from 'prop-types';
//import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

const domNode = document.querySelector('#root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = evt => {
    if (evt.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  render() {
    const { onCloseModal, imageUrl, alt } = this.props;
    return createPortal(
      <Overlay 
        onClick={event => {
          if (event.target !== event.currentTarget) {
            return;
          }
          onCloseModal();
        }} domNode
      >
        <ModalWindow>
          <img src={imageUrl} alt={alt} />
        </ModalWindow>
      </Overlay>,
      domNode
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

