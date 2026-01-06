import { useEffect, useState } from "react";

function Admin() {
    const [orders, setOrders] = useState([]);

    useEffect(() =>{
        fetch("http://localhost:5000/api/custom-order")
        .then(res => res.json())
        .then(data => setOrders(data));
    }, []);

    const updateOrder = async (id, price) => {
        await fetch(`http://localhost:5000/api/custom-order/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                price,
                status: "priced"
            })
        });

        // refresh list
        const update = await fetch("http://localhost:5000/api/custom-order");
        setOrders(await updateOrder.json());
    };

    return(
        <div>
            <h1>Admin custom orders</h1>

            {orders.map(order => {
                <div key={order._id} style={{border: "1px solid gray", padding: 10, marginBottom: 10}}>
                    <p><b>Message:</b> {order.message} </p>

                    {order.image && (
                        <img src={`http://localhost:5000/uploads/${order.image}`} width="120" />
                    )}

                    <p>Status: <b>{order.status}</b></p>

                    {order.status === "pending" && (
                        <>
                            <input type="Number" placeholder="price" onChange={(e) => order.newPrice = e.target.value } />

                            <button onClick={() => updateOrder(order._id, order.newPrice)}>Set price</button>
                        </>
                    )}

                    </div>

            })}

        </div>
    );
}

export default Admin;