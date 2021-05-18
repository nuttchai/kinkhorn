import React, { useState } from 'react';
import styles from './SingleItem.module.css';

import { connect } from 'react-redux';
import { addToCart, CartItemType } from '../Redux/Shopping/shopping-action';
import styled from 'styled-components';
import { Col, Row } from 'react-grid-system';
import Subtitle from '../Components/Subtitle';
import { Button, Card } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Styledlink = styled.div`
  display: flex;
  flex-flow: column;
  color: #000000;
`;

const StyledKiosk = styled.div`
  margin-left: 16px;
  display: flex;
  flex-flow: column;
  width: 100%;
`;

// interface ItemsProps {
//   current : any,
//   addToCart : () => void,
// }

const SingleItem = ({ current, addToCart }: any) => {
  const [quantity, setQuantity] = useState(1);
  const curItem = current.id;
  // console.log('current : ', current.id);
  let minusButton = (
    <Button variant="contained" disabled onClick={() => minusQuantity()} color="primary">
      -
    </Button>
  );
  if(quantity >= 2){
    minusButton = (
      <Button variant="contained" onClick={() => minusQuantity()} color="primary">
        -
      </Button>
    );
  }
  const minusQuantity = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1);
    } else {
      minusButton = (
        <Button variant="contained" disabled>
          -
        </Button>
      );
    }
  };

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };
  return (
    <>
      <Styledlink>
        <div>
          {/* FIXME : src={item.image} */}
          <img
            src={'https://picsum.photos/414/150 '}
            alt={curItem.name}
            style={{ width: '100%', height: '150px' }}
          />
        </div>
        <StyledKiosk>
          <Row>
            <Col xs={9}>{curItem.name}</Col>
            <Col xs={3} style={{ fontWeight: 'bold' }}>
              {curItem.price}
            </Col>
          </Row>
          <Row>
            <Col>
              <Subtitle>Food name in eng</Subtitle>
            </Col>
          </Row>
        </StyledKiosk>
      </Styledlink>
      <div style={{ display: 'flex', flexFlow: 'column'}}>
        <div style={{ textAlign: 'center' }}>
          {minusButton}{' '}
          {quantity}{' '}
          <Button variant="contained" color="primary" onClick = {()=>addQuantity()}>
            +
          </Button>
        </div>
        <Link to="/canteen/kiosk/:id">
        <Button
          variant="contained"
          color="primary"
          onClick={() => addToCart(curItem,quantity)}
        >
          Add to Basket
        </Button>
        </Link>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  // console.log('state : ',state.shop);
  return {
    current: state.shop.currentItem,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToCart: (id: any,quantity : number) => dispatch(addToCart(id,quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
