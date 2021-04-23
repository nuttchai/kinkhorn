import { Card, Grid, IconButton, Fab } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import ColStyled from '../ColStyled';
import Subtitle from '../Subtitle';
import styles from './SingleKiosk.module.css';
import {
  loadCurrentItem,
  addToCart,
} from '../../Redux/Shopping/shopping-action';
import { ShopType } from '../../Pages/CanteenPage';
import { connect } from 'react-redux';
import ColorLine from '../ColorLine';
import Item from '../../item/item';
import SingleItem from '../../SingleItem/SingleItem';
import { Link } from 'react-router-dom';

const BG = styled.div`
  background-color: #ebecf0;
  width: 100%;
  height: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(IconButton)`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: 50px;
`;

const Wrapper = styled.div`
    padding : 0px 8px;
`;

const SingleKiosk = ({ currentKiosk, loadCurrentItem }: any) => {
  const curKiosk = currentKiosk.id;
  // console.log('currentKiosk : ', currentKiosk);

  const Menu = (
    <>
      {curKiosk.menu.map((ele: any) => {
        console.log('ele : ', ele);
        return (
          <>
            <Grid item key={ele._id} xs={12} sm={4} 
            onClick={() => loadCurrentItem(ele)}
            >
              <Link to ={`menu/${ele._id}`}>
                {/* <SingleItem current={ele}/> */}
                <Item item={ele}/>
                {/* ... */}
                <ColorLine color="#C1C7CF" />
              </Link>
            </Grid>
          </>
        );
      })}
    </>
  );
  return (
    <>
      <BG className="content-wrapper">
        {/* <StyledButton>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton> */}
        <Card>
         <Link to = '/canteen'> <i className="fas fa-chevron-left"/> </Link>
          <img src="https://picsum.photos/414/149/?blur=2" style={{zIndex: -1,position: 'absolute'}}/>
          <ColStyled>
            <h2 style={{ marginBottom: '0px' }}>{curKiosk.shop}</h2>
            <Subtitle>Category</Subtitle>
            <i className="fas fa-star"></i> 4.7
          </ColStyled>
        </Card>
        <Card style={{ marginTop: '16px' }}>
          <Wrapper>
            <Grid container spacing={0}>
              {Menu}
            </Grid>
          </Wrapper>
        </Card>
      </BG>
    </>
  );
};

const mapStateToProps = (state: any) => {
  console.log('state : ', state.shop.currentKiosk.id);
  return {
    currentKiosk: state.shop.currentKiosk,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadCurrentItem: (menu: any) => dispatch(loadCurrentItem(menu)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(SingleKiosk);
