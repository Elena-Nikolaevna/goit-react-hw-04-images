import { useState, useEffect } from 'react'; //+
import { getImages } from '../services/ImagesAPI'; //+
import { Searchbar } from './Searchbar/Searchbar'; //+
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn'; //+
import { ImageGallery } from './ImageGallery/ImageGallery'; //+
import  {Loader}  from './Loader/Loader'; //+
import { Modal } from './Modal/Modal';
import { GlobalStyle } from './GlobalStyles';
import { Container, Text } from './App.styled';
//import axios from 'axios';
//import Notiflix from 'notiflix';

//import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
//import Modal from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [currentImage, setCurrentImage] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');
    getImages(query, pageNumber)
      .then(data => {
        if (data.hits.length === 0) {
          return Promise.reject(new Error(`Cannot find ${query}`));
        }
        const totalPages = Math.ceil(data.totalHits / 12);

        const requiredHits = data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          }
        );
        setImages(state => [...state, ...requiredHits]);
        setTotalPages(totalPages);
      })
      .then(() => {
        setStatus('done');
        setError('');
      })
      .catch(error => {
        setStatus('error');
        setError(error.message);
      });
  }, [query, pageNumber]);

  const onSearchHandle = value => {
    if(query !== value) {
      setQuery(value);
      setPageNumber(1);
      setImages([]);
      setTotalPages(0);
    }
    
  };

  const onLoadMoreHandle = () => {
    setPageNumber(state => state + 1);
  };

  const onGalleryClickHandle = imageId => {
    const currentImage = images.find(item => {
      return item.id === Number(imageId);
    });
    setCurrentImage(currentImage);
    setIsModal(true);
  };

  const onCloseModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <Container>
        <Searchbar onSubmit={onSearchHandle} />
        {status === 'idle' && <Text>Enter your request please</Text>}
        {images.length !== 0 && (
          <ImageGallery images={images} onClick={onGalleryClickHandle} />
        )}
        {totalPages > pageNumber && (
          <LoadMoreBtn onClick={onLoadMoreHandle}>Load more</LoadMoreBtn>
        )}

        {status === 'pending' && <Loader />}
        {isModal && (
          <Modal
            imageUrl={currentImage.largeImageURL}
            alt={currentImage.tags}
            onCloseModal={onCloseModal}
          />
        )}
        {status === 'error' && <p>{error}</p>}
      </Container>
      <GlobalStyle />
    </>
  );
}
