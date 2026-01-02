import { useEffect, useState, useContext } from "react";
import { cartContext } from "./Context";

function Customorders(){
    const [orders, setOrders] = useState([]);
    const {addtoCart} = useContext(cartContext);

    useEffect(() => {
        fetch("http://localhost:5000/api/custom-order")
        .then(res => res.json())
        .then(data => setOrders(data));
    }, []);

return(
    <div>
        <h1>My custom orders</h1>

        {orders.map(order =>(

         <div key={order._id} style={{border: "1px solid #ccc", padding: 10, marginBottom: 10}}>
            <p><b>Message:</b> {order.message}</p>

            {order.image && (
                <img
                    src={`http://localhost:5000/uploads/${order.image}`}
                    width="150"
                    />
            )}

            {order.status === "pending" && (
                <p style={{color: "orange"}}>Waiting for price... ⏳ </p>
            )}

            {order.status === "priced" && (
                <>
                <p><b>Price:</b> ${order.price} <span style={{ color: "green" }}>✅ Ready to order</span> </p>
                <button onClick={() =>
                    addtoCart({
                        id: order._id,
                        name: "Custom order",
                        price: order.price,
                        quantity: 1
                    })
                }
                >
                    Add to cart
                </button>
                </>
            )}

            {order.status === "completed" && (
                <span style={{ color: "gray" }}>✔ Completed</span>
            )}

        </div>

        ))}

    </div>
);
}

export default Customorders;