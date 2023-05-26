import { useState, useEffect } from 'react';
import { findPhotoApi } from 'api/api';

import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

let prevSearchingValue = '';

const App = () => {
  const [searchingValue, setSearchingValue] = useState('');
  const [page, setPage] = useState(1);
  const [photoData, setPhotoData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(true);

  const clickSearch = event => {
    event.preventDefault();

    const { value } = event.target.input;

    if (value === searchingValue) {
      return alert('Please write another name');
    }

    setPage(1);
    setSearchingValue(value);
    setPhotoData([]);
    setShowBtn(true);
  };

  useEffect(() => {
    if (searchingValue === '') {
      return;
    }
    try {
      setLoader(true);

      findPhotoApi(searchingValue, page)
        .then(data => {
          if (data.total <= 12 * page) {
            setShowBtn(false);
            alert('You see all pictures now');
          }
          const newData = [];

          data.hits.forEach(obj => {
            const { id, webformatURL, largeImageURL } = obj;

            newData.push({ id, webformatURL, largeImageURL });
          });

          if (prevSearchingValue === searchingValue) {
            setPhotoData(state => {
              return [...state, ...newData];
            });
          } else {
            prevSearchingValue = searchingValue;
            setPhotoData([...newData]);
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          setLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [searchingValue, page]);

  const clickLoadMore = () => {
    setPage(state => state + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={clickSearch} />
      <ImageGallery cards={photoData} />

      {photoData.length !== 0 && showBtn && loader !== true && (
        <Button loadMoreBtnClick={clickLoadMore} />
      )}

      {loader && <Loader />}
    </div>
  );
};

export default App;
