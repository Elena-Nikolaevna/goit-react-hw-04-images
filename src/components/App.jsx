import { Component } from 'react'; //+
import { getImages } from '../services/ImagesAPI'; //+
import { Searchbar } from './Searchbar/Searchbar'; //+
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn'; //+
import { ImageGallery } from './ImageGallery/ImageGallery'; //+
import  {Loader}  from './Loader/Loader'; //+
import { Modal } from './Modal/Modal';
import { GlobalStyle } from './GlobalStyles';
import { Container } from './App.styled';
//import axios from 'axios';
//import Notiflix from 'notiflix';

//import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
//import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    pageNumber: 1,
    totalPages: 0,
    status: 'idle',
    images: [],
    isModal: false,
    currentImage: {},
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, pageNumber } = this.state;
    const currentQuery = query;
    const currentPage = pageNumber;

    if (
      prevState.query !== currentQuery ||
      prevState.pageNumber !== currentPage
    ) {
      this.setState({ status: 'pending' });
      getImages(currentQuery, currentPage)
        .then(data => {
          if (data.hits.length === 0) {
            return Promise.reject(new Error(`Cannot find ${currentQuery}`));
          }
          const totalPages = Math.ceil(data.totalHits / 12);

          const requiredHits = data.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            }
          );
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...requiredHits],
              totalPages: totalPages,
            };
          });
        })
        .then(() => {
          this.setState({ status: 'done', error: '' });
        })
        .catch(error => {
          this.setState({ status: 'error', error: error.message });
        });
      return;
    }
  }

  onSearchHandle = value => {
    this.setState({ query: value, pageNumber: 1, images: [] });
  };

  onLoadMoreHandle = () => {
    this.setState(prevState => {
      return { pageNumber: prevState.pageNumber + 1 };
    });
  };

  onGalleryClickHandle = imageId => {
    const currentImage = this.state.images.find(item => {
      return item.id === Number(imageId);
    });
    this.setState({ currentImage: currentImage, isModal: true });
  };

  onCloseModal = () => {
    this.setState({ isModal: false });
  };

  render() {
    const {
      status,
      images,
      isModal,
      currentImage,
      error,
      totalPages,
      pageNumber,
    } = this.state;

    return (
      <>
        <Container>
          <Searchbar onSubmit={this.onSearchHandle} />
          {images.length !== 0 && (
            <ImageGallery images={images} onClick={this.onGalleryClickHandle} />
          )}
          {totalPages > pageNumber && (
            <LoadMoreBtn onClick={this.onLoadMoreHandle}>Load more</LoadMoreBtn>
          )}

          {status === 'pending' && <Loader />}
          {isModal && (
            <Modal
              imageUrl={currentImage.largeImageURL}
              alt={currentImage.tags}
              onCloseModal={this.onCloseModal}
            />
          )}
          {status === 'error' && <p>{error}</p>}
        </Container>
        <GlobalStyle />
      </>
    );
  }
}
