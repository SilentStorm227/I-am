import { useContext } from "react";
import { cartContext } from "./Context";
import "../Style/cart.css"
import sad from "../assets/sad.jpg"

function Cart() {
    const {cart, removefromCart, incQty, decQty} = useContext(cartContext);

    const totalPrice = cart.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
        0
    );

    return(
        <div>
            <h1>Your cart</h1>

                {cart.length === 0 && <p className="carttoptext" >
                                    <img src={sad} /> <br />
                                    cart is empty
                    </p>}

        {cart.map((item) => (
  <div key={item.id} className="cart-item">
    {item.image && (
      <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} />
    )}
    <div className="cart-item-details">
      <h4>{item.name}</h4>
      <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>

      <div className="quantity-controls">
        <button onClick={() => decQty(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => incQty(item.id)}>+</button>
      </div>

      <button className="remove-btn" onClick={() => removefromCart(item.id)}>Remove</button>
    </div>
  </div>
))}

<h2 className="h2" style={{marginTop:"20px"}}>
                Total: ${totalPrice.toFixed(2)}
            </h2>

        </div>
    );
}

export default Cart;