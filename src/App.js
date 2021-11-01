
import styles from "./App.module.css";
import Searchbar from "./components/Searchbar/Searchbar";
import Button from "./components/Button/Button";
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';

import { useState, useEffect } from 'react';
import fetchImages from './services/searchApi';

function App() {

  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [imgTags, setImgTags] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    getImages();
    scrollDown();

  }, [query])  /* eslint-disable-line */

  const getImages = async () => {
    setIsLoading(true);
    try {
      const { hits } = await fetchImages(query, page);
      setPictures(prev => [...prev, ...hits]);
      setPage(prevPage => prevPage + 1);
      if (page !== 1) {
        scrollDown();
      }
    } catch (error) {
      alert('Picture not found', error);
      setError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollDown = () => {
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
        <Button onClick={getImages} />
      )}
      {showModal && (
        <Modal showModal={bigImage}>
          <img src={largeImage} alt={imgTags} />
        </Modal>
      )}
    </div>)
}


export default App;
