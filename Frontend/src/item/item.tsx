import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { Col, Row } from 'react-grid-system';
import styled from 'styled-components';
import Subtitle from '../Components/Subtitle';
import { menuType } from '../Pages/CreateStorePage';
// Types

// Styles
import { Wrapper } from './item.styles';

type Props = {
  item: menuType;
  isEdit?: boolean;
};

const Styledlink = styled.div`
  display: flex;
  flex-flow: row;
  color: #000000;
`;

const StyledKiosk = styled.div`
  margin-left: 16px;
  display: flex;
  flex-flow: column;
  width: 100%;
`;

const Item: React.FC<Props> = ({ item, isEdit }) => {
  
  return (
  
    <Wrapper>
      {/* <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <h3>{item.price}Baht</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to cart</Button> */}
        <Styledlink>
          <div style={{ paddingTop: '5px' }}>
            {/* FIXME : src={item.image} */}
            <img
              src={'https://picsum.photos/70/70'} alt={item.name}
              style={{ width: '70px', height: '70px' }}
            />
          </div>
          <StyledKiosk>
            <Row>
              <Col xs={9}>{item.name}</Col>
              <Col xs={3} style = {{fontWeight : 'bold'}}>{item.price}</Col>
            </Row>
            <Row>
              <Col>
                <Subtitle>{item.description}</Subtitle>
              </Col>
            </Row>
          </StyledKiosk>
          </Styledlink>
    </Wrapper>
  );
}

export default Item;
