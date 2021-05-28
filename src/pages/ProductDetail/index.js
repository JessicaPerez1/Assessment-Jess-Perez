import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import Button from '../../components/Button';
import Quantity from '../../components/Quantity';

import styles from './ProductDetail.module.scss';

function ProductDetail({ selectedProductArray, title, isAdded, isFeatured }) {
  // initialize featured image state
  const [featuredImg, setIsFeaturedImg] = useState();
  // as soon as the page loads set featured image to the default featured image
  useEffect(() => {
    let featuredImageSrc = selectedProductArray[0].images[0].src;
    setIsFeaturedImg(featuredImageSrc);
  }, [selectedProductArray]);

  // loop over all images of selected product, push all to the imArr, except the 1st one (default)
  // render each image in square format
  let imArr = [];
  const renderThumbnails = selectedProductArray[0].images
    .slice(1)
    .forEach((im, index) => {
      if (index % 2 === 0) imArr.push(im.src);
    });

  // when a thumbnail is clicked, get its src
  // check its format: featured should be rectangular vs thumbnail is square
  // set the featured image to have the clicked image rt format src
  const onThumbnailClick = event => {
    event.stopPropagation();
    let clickedImgSrc = event.target.getAttribute('src');
    let rtImg;
    if (clickedImgSrc.includes('sq')) rtImg = clickedImgSrc.replace('sq', 'rt');
    setIsFeaturedImg(rtImg);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.productTitle}>
        <h1 className={styles.heading}>{selectedProductArray[0].title}</h1>
        <span className={styles.price}>
          {' '}
          ${selectedProductArray[0].price.toFixed(2)}
        </span>
      </div>

      <div className={styles.products}>
        {/* THUMBNAILS: loop over selected product images and display them */}
        <div className={styles.thumbnails}>
          {imArr.map((p, key) => (
            <img
              className={styles.image}
              key={key}
              src={p}
              alt={title}
              onClick={onThumbnailClick}
              style={{
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
        {/* FEATURED IMAGE */}
        <img
          className={styles.featured}
          alt="featuredImage"
          src={featuredImg}
          isfeatured={isFeatured}
        ></img>
      </div>
      {/* PRODUCT DETAILS */}
      <div className={cx(styles.summary, styles.section)}>
        <div className={styles.details}>
          <h2 className={styles.title}>Details</h2>
          {selectedProductArray.map(key => (
            <p key={key.description}>{key.description}</p>
          ))}
          {/* QUANTITY AND ADD TO BAG BUTTONS */}
          <h2 className={styles.title}>Quantity</h2>
          <div className={styles.qtyBtn}>
            <Quantity className={styles.qty} />
            <Button className={styles.addButton}>
              {isAdded ? 'Added' : 'Add to Bag'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
