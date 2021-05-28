import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import AppContext from '../../contexts/AppContext';

import cx from 'classnames';
import ProductDetail from '../ProductDetail';

import close from '../../assets/close.svg';

import styles from './ProductModal.module.scss';

function ProductModal() {
  const { products } = useContext(AppContext);
  const { productId } = useParams();
  // clicked item index will be the id at the end of current URL -1
  const currIndex = productId - 1;

  // loop over the products array
  // check if a product has matching index with the clicked item index
  // if yes, then push it into selectedProductArray
  let selectedProductArray = [];
  const productSelected = products.forEach(prod => {
    if (products.indexOf(prod) === currIndex) selectedProductArray.push(prod);
    return selectedProductArray;
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Link to="/" className={styles.closeBtn}>
          <img src={close} alt="close" />
        </Link>
        {selectedProductArray.length === 1 && (
          <>
            <div className={cx(styles.products, styles.section)}>
              <ProductDetail selectedProductArray={selectedProductArray} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductModal;
