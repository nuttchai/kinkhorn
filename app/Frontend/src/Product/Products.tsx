import React from "react";
import styles from "./Products.module.css";

// Redux
import { connect } from "react-redux";

import Product from "./Product/Product";
import { CartItemType } from '../Redux/Shopping/shopping-action';

const Products = ( products  : any) => {
  // console.log(products.products);
  return (
    <div className={styles.products}>
      {products.products.map((product : any) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

const mapStateToProps = (state : any) => {
  return {
    products: state.shop.products,
  };
};

export default connect(mapStateToProps)(Products);