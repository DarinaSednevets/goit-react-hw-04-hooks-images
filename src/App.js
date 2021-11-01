// import React, { Component } from 'react';

import styles from "./App.module.css";
import Searchbar from "./components/Searchbar/Searchbar";
import Button from "./components/Button/Button";
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';
import searchApi from './services/searchApi';
import { useState, useEffect } from 'react';

function App() {

  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [imgTags, setImgTags] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPictures = () => {
    const options = {
      page,
      query,
    };
    setIsLoading(true);
    searchApi(options)
      .then(pictures => {
        setPictures(prev => [...prev, pictures]);
        setPage(prev => prev + 1);
      })
      .catch(() => setError('Picture not found'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchPictures();
    scrollToDown();

  }, [fetchPictures, query]);

  const scrollToDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const bigImage = (largeImage, webformatURL) => {
    setLargeImage(largeImage);
    setImgTags(webformatURL);
    toggleModal();
  }

  const onChangeQuery = query => {
    setQuery(query);
    setPage(1);
    setPictures([]);
    setError(null);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={onChangeQuery} />
      {error && <h1>{error}</h1>}
      <ImageGallery pictures={pictures} bigImage={bigImage} />
      {isLoading && <Loader />}
      {pictures.length > 11 && !isLoading && (
        <Button onClick={fetchPictures} />
      )}
      {showModal && (
        <Modal showModal={bigImage}>
          <img src={largeImage} alt={imgTags} />
        </Modal>
      )}
    </div>)
}


export default App;
