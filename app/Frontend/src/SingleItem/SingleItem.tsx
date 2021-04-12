import React from "react";
import styles from "./SingleItem.module.css";

import { connect } from "react-redux";
import { addToCart,CartItemType } from "../Redux/Shopping/shopping-action";


const SingleItem = ({current ,addToCart} : any) => {
  const curItem = current.id;
  // console.log('current : ', current);
  return (
    <div className={styles.singleItem}>
      <img
        className={styles.singleItem__image}
        src={curItem.image}
        alt={curItem.title}
      />
      <div className={styles.singleItem__details}>
        <p className={styles.details__title}>{curItem.title}</p>
        <p className={styles.details__description}>{curItem.description}</p>
        <p className={styles.details__price}>$ {curItem.price}</p>

        <button
          onClick={() => addToCart(curItem.id)}
          className={styles.details__addBtn}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state : any) => {
  console.log('state : ',state.shop);
  return {
    current: state.shop.currentItem,
  };
};

const mapDispatchToProps = (dispatch : any) => {
  return {
    addToCart: (id : any) => dispatch(addToCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
