import Button from '@material-ui/core/Button';
import Item from '../item/item';
// Types
import { CartItemType } from '../Pages/KioskPage';
// Styles
import { Wrapper } from './CartItem.styles';

type Props = {
    item :  CartItemType;
    addToCart : (clickedItem : CartItemType) => void;
    removeFromcart : (id : number) => void;
}

const CartItem : React.FC<Props> = ({ item, addToCart, removeFromcart}) => (
    <Wrapper>
            <h3>
                {item.title}
            </h3>
            <div>
                <p>Price : {item.price} </p>
                <p>Total : {(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div>
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
            </div>
            <img src={item.image} alt={item.title}/>
    </Wrapper>
);

export default CartItem;