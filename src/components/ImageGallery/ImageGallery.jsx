import css from './ImageGallery.module.css';

import { useState } from 'react';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';

const ImageGallery = ({ cards }) => {
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState('');

  const clickOnPhoto = event => {
    setModal(true);
    setUrl(event.currentTarget.alt);
  };

  const closeModal = () => {
    setModal(false);
    setUrl('');
  };

  return (
    <div>
      <ul className={css.imageGallery}>
        {cards.map(card => (
          <ImageGalleryItem
            openModal={clickOnPhoto}
            key={card.id}
            card={card}
          />
        ))}
      </ul>
      {modal && <Modal closeModal={closeModal} url={url} />}
    </div>
  );
};

export default ImageGallery;
