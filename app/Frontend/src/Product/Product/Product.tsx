import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Product.module.css';
import { CartItemType } from '../../Redux/Shopping/shopping-action';
// Redux
import { connect } from 'react-redux';
import {
  loadCurrentItem,
  addToCart,
} from '../../Redux/Shopping/shopping-action';
import styled from 'styled-components';

const Product = ({ product, addToCart, loadCurrentItem }: any) => {
  return (
    <>
      <div className={styles.product}>
        <img
          className={styles.product__image}
          src={product.image}
          alt={product.title}
        />

        <div className={styles.product__details}>
          <p className={styles.details__title}>{product.title}</p>
          <p className={styles.details__desc}>{product.description}</p>
          <p className={styles.details__price}>$ {product.price}</p>
        </div>

        <div className={styles.product__buttons}>
          <Link to={`/product/${product.id}`}>
            <button
              onClick={() => loadCurrentItem(product)}
              className={`${styles.buttons__btn} ${styles.buttons__view}`}
            >
              View Item
            </button>
          </Link>
          <button
            onClick={() => addToCart(product)}
            className={`${styles.buttons__btn} ${styles.buttons__add}`}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // addToCart: (id: CartItemType) => dispatch(addToCart(id)),
    // loadCurrentItem: (item: any) => dispatch(loadCurrentItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(Product);
