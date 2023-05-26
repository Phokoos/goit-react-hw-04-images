import css from './Modal.module.css';

import { useEffect } from 'react';

const Modal = ({ url, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const clickBackdrop = event => {
    if (event.target === event.currentTarget) closeModal();
  };

  return (
    <div className={css.overlay} onClick={clickBackdrop}>
      <div className={css.modal}>
        <img src={url} alt={url} />
      </div>
    </div>
  );
};

export default Modal;
