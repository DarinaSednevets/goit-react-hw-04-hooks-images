import React, { Component } from 'react';

import styles from "./App.module.css";
import Searchbar from "./components/Searchbar/Searchbar";
import Button from "./components/Button/Button";
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';
import searchApi from './services/searchApi';


class App extends Component {
  state = {
    pictures: [],
    page: 1,
    query: '',
    largeImage: '',
    imgTags: '',
    error: '',
    showModal: false,
    isLoading: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchPictures();
    }
    if (this.state.page !== 2 && prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }


  toggleModal = () => {
    this.setState(state => (
      { showModal: !state.showModal, }
    ))
  }
  bigImage = (largeImage = '') => {
    this.setState({ largeImage });
    this.toggleModal();
  }

  fetchPictures = () => {
    const { page, query } = this.state;
    const options = {
      page,
      query,
    };
    this.setState({ isLoading: true });

    searchApi(options)
      .then(pictures => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error: 'Picture not found' }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onChangeQuery = query => {
    this.setState({
      query: query,
      page: 1,
      pictures: [],
      error: null,
    })
  };

  render() {
    const {
      pictures,
      isLoading,
      error,
      showModal,
      largeImage,
      imgTags,
    } = this.state;


    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onChangeQuery} />

        {error && <h1>{error}</h1>}

        <ImageGallery pictures={pictures} bigImage={this.bigImage} />

        {isLoading && <Loader />}

        {pictures.length > 11 && !isLoading && (
          <Button onClick={this.fetchPictures} />
        )}

        {showModal && (
          <Modal showModal={this.bigImage}>
            <img src={largeImage} alt={imgTags} />
          </Modal>
        )}

      </div>
    )
  }
}

export default App;
