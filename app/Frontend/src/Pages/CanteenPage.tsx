import { Button, Card, Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ColorLine from '../Components/ColorLine';
import SingleKiosk from '../Components/SingleKiosk/SingleKiosk';
import Subtitle from '../Components/Subtitle';
import {
  fetchKiosks,
  loadCurrentKiosk,
  refreshCart,
} from '../Redux/Shopping/shopping-action';

const StyledCard = styled(Card)`
  margin: 16px 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Styledlink = styled(Link)`
  margin: 10px;
  display: flex;
  flex-flow: row;
  text-decoration: none !important;
  color: #000000;
`;

const StyledRow = styled(Row)`
  padding-left: 8px;
  width: 100%;
`;

const StyledKiosk = styled.div`
  margin-left: 16px;
  display: flex;
  flex-flow: column;
  width: 100%;
`;

export type ShopType = {
  _id: string;
  area: string;
  menu: string[];
  shop: string;
  // more
};
interface CanteenProps {
  fetchkiosks : () => (dispatch : any) =>void,
  kioskData : any,
  loadCurrentKiosk : any,
}

const CanteenPage = ( {fetchkiosks , kioskData, loadCurrentKiosk} : CanteenProps) => {

  useEffect(() => {
    fetchkiosks();
    refreshCart();
  }, []);

  const KioskContent = (
    <>
      {kioskData.map((kiosk : any) => {
        // console.log('kiosk ', kiosk);
        
        return (
          <>
            <StyledRow key={kiosk._id}>
              <Col>
                <Styledlink
                  to={`canteen/kiosk/${kiosk._id}`}
                  onClick={() => loadCurrentKiosk(kiosk) }
                >
                  <img
                    src={`https://picsum.photos/70/70`}
                    alt={'canteen img'}
                    style={{ width: '70px', height: '70px' }}
                  />
                  <StyledKiosk>
                    <div>{kiosk.shop}</div>
                    <Subtitle>Category</Subtitle>
                    <div>
                      <i className="fas fa-star"></i> 4.7 | open
                    </div>
                  </StyledKiosk>
                </Styledlink>
              </Col>
            </StyledRow>
            <ColorLine color="#C1C7CF" />
          </>
        );
      })}
    </>
  );
  // console.log('kiosks : ', kiosks);
  return (
    <>
      <Container maxWidth="sm">
        <div style={{ display : 'flex', flexFlow : 'column', paddingLeft: '8px',paddingTop: '8px' }}>
          <Link to = '/'> <i className="fas fa-chevron-left"/> </Link>
          <h2>Canteen A</h2>
        </div>
        <StyledCard>{KioskContent}</StyledCard>
        <StyledCard>
          {/* {kioskData && kioskData.kiosks.map((obj : any) => console.log('obj',obj))} */}
        </StyledCard>
      </Container>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    kioskData: state.shop.kiosks,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchkiosks : () => dispatch(fetchKiosks()),
    loadCurrentKiosk : (kiosk : any) => dispatch(loadCurrentKiosk(kiosk)),
    refreshCart : () => dispatch(refreshCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CanteenPage);
