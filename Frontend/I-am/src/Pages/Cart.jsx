import { useContext } from "react";
import { cartContext } from "./Context";

function Cart() {
    const {cart, removefromCart, incQty, decQty} = useContext(cartContext);

    const totalPrice = cart.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
        0
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
                {item.image && (
                        <img 
                            src={`http://localhost:5000/uploads/${item.image}`}
                            width="100"
                        />
                    )}

                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}</p>
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

<h2 style={{marginTop:"20px"}}>
                Total: ${totalPrice.toFixed(2)}
            </h2>

        </div>
    );
}

export default Cart;