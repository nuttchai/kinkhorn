import { Card, Grid, IconButton } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

import ColStyled from "../ColStyled";
import Subtitle from "../Subtitle";
import styles from "./SingleKiosk.module.css";
import {
  loadCurrentItem,
  addToCart,
} from '../../Redux/Shopping/shopping-action';
import {ShopType} from '../../Pages/CanteenPage';

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

const SingleKiosk = ( data : any ) => {
  // const curKiosk = data.id;
  console.log('currentKiosk : ', data);

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
      </BG>
    </>
  );
};

export default (SingleKiosk);
