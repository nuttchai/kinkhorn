import { Button, Card } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-grid-system';
import styled from 'styled-components';
import ColorLine from '../Components/ColorLine';
import Subtitle from '../Components/Subtitle';

const StyledCard = styled(Card)`
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Styledlink = styled.a`
    margin: 10px;
    display: flex;
    flex-flow: row;
    text-decoration : none!important;
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
  id : number;
  area : string;
  menu : string[];
  shop : string;
  // more
};


export default function CanteenPage() {
  const [kioskData,setKioskData] = useState<ShopType[]>([]);

  useEffect(() => {
    axios.get('http://143.198.208.245:9000/api/shops/customer')
      .then((res)=>{
        // console.log(res.data.data);
        setKioskData(res.data.data);
        // console.log('kioskData : ',kioskData);
      })
  })
  // console.log('kioskData : ',kioskData);

  const KioskContent = (<>
  {kioskData.map((data : ShopType,id : any) => {
    // console.log('data ', data.shop);
    return(
      <>
    <StyledRow key={id}>
        <Col>
              <Styledlink href="/canteen/kiosk">
                  <img
                    src={`https://picsum.photos/70/70`}
                    alt={'canteen img'}
                    style={{ width: '70px', height: '70px' }}
                  />
                  <StyledKiosk>
                    <div>{data.shop}</div>
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

    
  )})
}
  </>);
  return (
    <>
      <div style={{paddingLeft : '16px'}}>
        <div>Home / CanteenA</div>
        <h2>Canteen A</h2>
      </div>
      <StyledCard>
        {/* <StyledRow> */}
          {/* <Col>
                <Styledlink href="/canteen/kiosk">
                    <img
                      src={`https://picsum.photos/70/70`}
                      alt={'canteen img'}
                      style={{ width: '70px', height: '70px' }}
                    />
                    <StyledKiosk>
                      <div>Kiosk1</div>
                      <Subtitle>Category</Subtitle>
                      <div>
                        <i className="fas fa-star"></i> 4.7 | open
                      </div>
                    </StyledKiosk>
                </Styledlink>
          </Col>
        </StyledRow>
        <ColorLine color="#C1C7CF" />
        <StyledRow>
          <Col>
            <Styledlink href='/'>
                <img
                  src={`https://picsum.photos/70/70`}
                  alt={'canteen img'}
                  style={{ width: '70px', height: '70px' }}
                />
                <StyledKiosk>
                  <div>Kiosk Name</div>
                  <Subtitle>Category</Subtitle>
                  <div>
                    <i className="fas fa-star"></i> 4.7 | open
                  </div>
                </StyledKiosk>
            </Styledlink>
          </Col> */}
          {KioskContent}
        {/* </StyledRow> */}
      </StyledCard>
    </>
  );
}
