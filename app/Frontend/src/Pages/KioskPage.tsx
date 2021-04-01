import { Card } from '@material-ui/core';
import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import ColorLine from '../Components/ColorLine';
import ColStyled from '../Components/ColStyled';
import Subtitle from '../Components/Subtitle';

const BG = styled.div`
  background-color: #ebecf0;
  width: 100%;
  height: 100%;
`;

const Styledlink = styled.a`
  display: flex;
  flex-flow: row;
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

export default function KioskPage() {
  return (
    <>

          <BG className="content-wrapper">
            <Card>
              <img src="https://picsum.photos/414/149/?blur=2" />
              <ColStyled>
                <h2 style={{ marginBottom: '0px' }}>Kiosk Name</h2>
                <Subtitle>Category</Subtitle>
                <i className="fas fa-star"></i> 4.7
              </ColStyled>
            </Card>
            <Card style={{ marginTop: '16px' }}>
              <ColStyled>
                <h4>Menu</h4>
                <div>
                  <Styledlink href="/">
                    <div style ={{paddingTop:'5px'}}>
                        <img
                          src={`https://picsum.photos/70/70`}
                          alt={'canteen img'}
                          style={{ width: '70px', height: '70px' }}
                        />
                    </div>
                    <StyledKiosk>
                        <Row >
                        <Col xs={9} >Food Name</Col>
                        <Col xs={3} >269</Col>
                        </Row>
                        <Row>
                            <Col>
                                <Subtitle>
                                    Food name in eng
                                </Subtitle>
                            </Col>
                        </Row>
                    </StyledKiosk>
                  </Styledlink>
                </div>
              </ColStyled>
              <ColorLine color="#C1C7CF" />
              <ColStyled>
                <div>
                  <Styledlink href="/">
                    <div style ={{paddingTop:'5px'}}>
                        <img
                          src={`https://picsum.photos/70/70`}
                          alt={'canteen img'}
                          style={{ width: '70px', height: '70px' }}
                        />
                    </div>
                    <StyledKiosk>
                        <Row >
                        <Col xs={9} >Food Name</Col>
                        <Col xs={3} >269</Col>
                        </Row>
                        <Row>
                            <Col>
                                <Subtitle>
                                    Food name in eng
                                </Subtitle>
                            </Col>
                        </Row>
                    </StyledKiosk>
                  </Styledlink>
                </div>
              </ColStyled>
            </Card>
          </BG>
    </>
  );
}
