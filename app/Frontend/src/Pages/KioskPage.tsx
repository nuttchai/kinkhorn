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
import Cart from '../Cart/Cart';

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
  position: fixed;
  z-index: 100;
  right: -85%;
  top: 0%;
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
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  if (isLoading)
    return (
      <LogoContainer>
        <CircularProgress />
      </LogoContainer>
    );
  if (error) return <LogoContainer>Something went wrong ...</LogoContainer>;

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCard = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. is the item already added in the card?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id : number ) => {
    setCartItems(prev => (
      prev.reduce((ack,item) => {
        if (item.id === id){
          if (item.amount === 1) return ack;
          return [...ack, {...item, amount : item.amount - 1}]
        } else {
          return [...ack, item]
        }
      }, [] as CartItemType[])
    ))
  };

  return (
    <>
      <BG className="content-wrapper">
      <Cart
          cartItems={cartItems}
          addToCart={handleAddToCard}
          removeFromCart={handleRemoveFromCart}
        />
        <StyledButton>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
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
              {data?.map((item : any) => (
                <Grid item key={item.id} xs={12} sm={4}>
                  <Item item={item} handleAddToCart={handleAddToCard} />
                  <ColorLine color="#C1C7CF" />
                </Grid>
              ))}
            </Grid>
          </Wrapper>
        </Card>
      </BG>
    </>
  );
}
