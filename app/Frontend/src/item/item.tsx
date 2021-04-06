import Button from '@material-ui/core/Button';
import { Col, Row } from 'react-grid-system';
import styled from 'styled-components';
import Subtitle from '../Components/Subtitle';
// Types
import { CartItemType } from '../Pages/KioskPage';
// Styles
import { Wrapper } from './item.styles';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
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

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    {/* <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <h3>{item.price}Baht</h3>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button> */}
      <Styledlink onClick={() => handleAddToCart(item)}>
        <div style={{ paddingTop: '5px' }}>
          <img
            src={item.image} alt={item.title}
            style={{ width: '70px', height: '70px' }}
          />
        </div>
        <StyledKiosk>
          <Row>
            <Col xs={9}>{item.title}</Col>
            <Col xs={3}>{item.price}</Col>
          </Row>
          <Row>
            <Col>
              <Subtitle>Food name in eng</Subtitle>
            </Col>
          </Row>
        </StyledKiosk>
        </Styledlink>
  </Wrapper>
);

export default Item;
