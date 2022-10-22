import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';
//import { Modal } from 'components/Modal/Modal';
//import { Component } from 'react';
//import styles from './ImageGalleryItem.module.css';


export const ImageGalleryItem = ({ imageUrl, alt, id, onClick }) => {
  return (
    <Item>
      <Img
        src={imageUrl}
        alt={alt}
        id={id}
        onClick={evt => {
          onClick(evt.target.id);
        }}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

