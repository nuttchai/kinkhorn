import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Badge, Card, CircularProgress, Drawer, Grid } from '@material-ui/core';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import ColorLine from '../Components/ColorLine';
import ColStyled from '../Components/ColStyled';
import Subtitle from '../Components/Subtitle';
import { Wrapper } from '../item/item.styles';
import Item from '../item/item';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

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

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

export default function KioskPage() {

  return (
    <>
      <BG className="content-wrapper">
        {/* <StyledButton>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton> */}
        <Card>
          <img src="https://picsum.photos/414/149/?blur=2" />
          <ColStyled>
            <h2 style={{ marginBottom: '0px' }}>Kiosk Name</h2>
            <Subtitle>Category</Subtitle>
            <i className="fas fa-star"></i> 4.7
          </ColStyled>
        </Card>
        <Card style={{ marginTop: '16px' }}>
          <Wrapper>
            <Grid container spacing={0}>
              {/* {data?.map((item : any) => (
                <Grid item key={item.id} xs={12} sm={4}>
                  <Item item={item} handleAddToCart={handleAddToCard} />
                  <ColorLine color="#C1C7CF" />
                </Grid>
              ))} */}
              ...
            </Grid>
          </Wrapper>
        </Card>
      </BG>
    </>
  );
}
