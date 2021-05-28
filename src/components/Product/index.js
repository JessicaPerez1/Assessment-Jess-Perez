import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../Button';
import Quantity from '../Quantity';
import { getImage } from '../../utils/images';
import imageTypes from '../../constants/imageTypes';

import styles from './Product.module.scss';

const Product = ({
  className,
  count = 1,
  images,
  isAdded,
  isFeatured,
  onClick,
  onDecrement,
  onIncrement,
  price,
  title,
  id
}) => {
  const isInCart = onIncrement && onDecrement;

  const productClasses = cx(className, styles.product, {
    [styles.inProductLanding]: !isInCart,
    [styles.inCart]: isInCart,
    [styles.featured]: isFeatured,
    [styles.isAddable]: !isAdded
  });
  const imageSrc = isFeatured
    ? getImage(images, imageTypes.DEFAULT_RT)
    : getImage(images);
  const finalPrice = (price * count).toFixed(2);

  const { projectId } = useParams();
  const history = useHistory();
  const onProductClick = () => {
    history.push(`/product/${id}`);
  };

  let loc = window.location.pathname;
  const isTitleVisible = loc.includes('product') ? styles.hidden : styles.title;
  const isPriceVisible = loc.includes('product') ? styles.hidden : styles.price;
  const isAddBagVisible = loc.includes('product')
    ? styles.hidden
    : styles.addButton;

  return (
    <div className={productClasses}>
      <img
        className={styles.image}
        src={imageSrc}
        alt={title}
        onClick={onProductClick}
        style={{ cursor: 'pointer' }}
      />
      <div className={styles.details}>
        <div className={styles.text}>
          <h2
            className={isTitleVisible}
            onClick={onProductClick}
            style={{ cursor: 'pointer' }}
          >
            {title}
          </h2>
          <span className={isPriceVisible}>${finalPrice}</span>
        </div>
        {isInCart ? (
          <Quantity
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            count={count}
          />
        ) : (
          <Button
            className={isAddBagVisible}
            disabled={isAdded}
            onClick={onClick}
          >
            {isAdded ? 'Added' : 'Add to Bag'}
          </Button>
        )}
      </div>
    </div>
  );
};

Product.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    })
  ).isRequired,
  isFeatured: PropTypes.bool,
  onClick: PropTypes.func,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default Product;
