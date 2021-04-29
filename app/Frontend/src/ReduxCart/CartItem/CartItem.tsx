import React, { useState } from "react";
import styles from "./CartItem.module.css";

import { connect } from "react-redux";
import {
  adjustItemQty,
  removeFromCart,
} from "../../Redux/Shopping/shopping-action";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

const Wrap = styled.div`
  display : flex;
  justify-conetent : space-between;
`;

const Price = styled.div`
  font-weight : bold;
`;

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
    <Grid container spacing={3}>
      <Grid item xs={2}>
        {item.qty}
      </Grid>
      <Grid item xs={7}>
        {item.name}
      </Grid> 
      <Grid item xs={3}>
      <Price>{item.price}</Price>
      </Grid>
    </Grid>
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
