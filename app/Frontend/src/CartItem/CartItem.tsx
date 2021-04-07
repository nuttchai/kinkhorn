import Button from '@material-ui/core/Button';
import Item from '../item/item';
// Types
import { CartItemType } from '../Pages/KioskPage';
// Styles
import { Wrapper } from './CartItem.styles';
import styled from 'styled-components';

type Props = {
    item :  CartItemType;
    addToCart : (clickedItem : CartItemType) => void;
    removeFromcart : (id : number) => void;
}
const Amount = styled.div`
    display : flex;
    justify-content : flex-start;
`;
const CartItem : React.FC<Props> = ({ item, addToCart, removeFromcart}) => (
    <Wrapper>
            <h3>
                {item.title}
            </h3>
            <div>
                <p>Price : {item.price} </p>
                <p>Total : {(item.amount * item.price).toFixed(2)}</p>
            </div>
            <Amount>
                <Button
                size = 'small'
                disableElevation
                variant='contained'
                onClick={() => removeFromcart(item.id)}
                >
                    -
                </Button>
                <p>{item.amount}</p>
                <Button
                size = 'small'
                disableElevation
                variant='contained'
                onClick={() => addToCart(item)}
                >
                    +
                </Button>
            </Amount>
            <img src={item.image} alt={item.title} width='100px' height='100px'/>
    </Wrapper>
);

export default CartItem;