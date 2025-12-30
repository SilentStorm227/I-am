import { useContext } from "react";
import { cartContext } from "./Context";

function Cart() {
    const {cart, removefromCart} = useContext(cartContext);

    if(cart.length === 0 ){
        return <h1>Your cart is empty!!! <br /> Go get something!!!!!!</h1>;
    }

    return(
        <div>
            <h1>Your cart</h1>

            {cart.map((item) =>(
                <div key={item.id}>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price}</p>
                    </div>
            ))}

            <button onClick={() => removeFromCart(item.id)}>
  Remove
</button>

        </div>
    );
}

export default Cart;