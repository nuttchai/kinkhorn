import React, { useState } from "react";
import styles from "./CartItem.module.css";

import { connect } from "react-redux";
import {
  adjustItemQty,
  removeFromCart,
} from "../../Redux/Shopping/shopping-action";

const CartItem = ({ item, adjustQty, removeFromCart } : any) => {
  const [input, setInput] = useState(item.qty);
  const onChangeHandler = (e : any) => {
    console.log('item : ',item);
    console.log('e : ',e.target.value);
    setInput(e.target.value);
    adjustQty(item, e.target.value);
  };

  
  console.log('before return : ',item);

  return (
    <>
    {item.qty} {item.name} {item.price}
    {/* ... */}
    {/* <div className={styles.cartItem}>
      <img
        className={styles.cartItem__image}
        src={item.image}
        alt={item.title}
      />
      <div className={styles.cartItem__details}>
        <p className={styles.details__title}>{item.title}</p>
        <p className={styles.details__desc}>{item.description}</p>
        <p className={styles.details__price}>$ {item.price}</p>
      </div>
      <div className={styles.cartItem__actions}>
        <div className={styles.cartItem__qty}>
          <label htmlFor="qty">Qty</label>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            value={input}
            onChange={onChangeHandler}
          />
        </div>
        <button
          onClick={() => removeFromCart(item)}
          className={styles.actions__deleteItemBtn}
        >
          <img
            src="https://image.flaticon.com/icons/svg/709/709519.svg"
            alt=""
          />
        </button>
      </div>
    </div> */}
    </>
  );
};

const mapDispatchToProps = (dispatch : any) => {
  return {
    adjustQty: (id : any, value : any) => dispatch(adjustItemQty(id, value)),
    removeFromCart: (id : any) => dispatch(removeFromCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
