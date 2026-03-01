import { useEffect, useState } from "react";

function Admin({ logout }) {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() =>{
        fetch("http://localhost:5000/api/custom-order", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }) 
        .then(res => res.json())
        .then(data => setOrders(data));
    }, []);

    const updateOrder = async (id, price) => {
        await fetch(`http://localhost:5000/api/custom-order/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({
                price: Number(price),
                status: "priced"
            })
        });

        // refresh list
        const update = await fetch("http://localhost:5000/api/custom-order/all", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setOrders(await update.json());
    };

    return(
        <div>
            <h1>Admin custom orders</h1>

            {orders.map(order => (
                <div key={order._id} style={{border: "1px solid gray", padding: 10, marginBottom: 10}}>

                    <p><b>User:</b> {order.user?.name}</p>
                    <p><b>Message:</b> {order.message} </p>

                    {order.image && (
                        <img src={`http://localhost:5000/uploads/${order.image}`} width="120" alt="order image" />
                    )}

                    <p>Status: <b>{order.status || "pending..."}</b></p>

                    {order.status === "pending" && (
                        <>
                            <input type="Number" placeholder="price" 
                            
                            onChange={(e) => setOrders(prev =>
                                prev.map(o =>
                                    o._id === order._id
                                    ? { ...o, newPrice: e.target.value}
                                    : o
                                )
                            ) } />

                            <button onClick={() => updateOrder(order._id, order.newPrice)}>Set price</button>
                        </>
                    )}

                    </div>

            ))}


        <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Admin;