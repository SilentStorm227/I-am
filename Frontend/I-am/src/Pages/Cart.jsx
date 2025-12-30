import { useContext } from "react";
import { cartContext } from "./Context";

function Cart() {
    const {cart, removefromCart, incQty, decQty} = useContext(cartContext);

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

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
                    <p>Price: {item.price * item.quantity}</p>


         <div>
                <button onClick={() => decQty(item.id)}>-</button>
                 <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button onClick={() => incQty(item.id)}>+</button>
            </div>

            <button onClick={() => removefromCart(item.id)}>
  Remove
</button>
                    </div>



            ))}

   

        </div>
    );
}

export default Cart;