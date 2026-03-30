import {useEffect, useState, useContext} from "react";
import p1 from "../assets/2.jpg"
import Slideshow from "./Slideshow";
import "../Style/chains.css"
import { cartContext } from "./Context";

function Chains1() {

const {addtoCart} = useContext(cartContext)
const [reviewMessage, setReviewMessage] = useState("");
const [rating, setRating] = useState(5);
const [reviewImage, setReviewImage] = useState(null);
const [reviews, setReviews] = useState([]);

const handleReviewSubmit = async (e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("productId", 1);
    formData.append("message", reviewMessage);
    formData.append("rating", rating);
    if (reviewImage) formData.append("image", reviewImage);

    await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        body: formData
    });

    setReviewMessage("");
    setRating(5);
    setReviewImage(null);
};

const [quantity, setQuantity] = useState(1)
const stock = 10;

const inc = ()=>{
    if (quantity < stock){
        setQuantity(quantity + 1);
    }
};

const dec = ()=>{
    if (quantity > 1){
        setQuantity(quantity - 1)
    }
};

useEffect(()=>{
    localStorage.setItem("cartQuantity", quantity);
}, [quantity]);

useEffect(() => {
    fetch("http://localhost:5000/api/reviews/1")
        .then(res => res.json())
        .then(data => setReviews(data));
}, []);

const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0;

    return(
        <div>
            <h1 className="text">Flower trouser/skirt chain</h1>
            <h2>Overall rating: {average.toFixed(1)} / 5 ⭐</h2>

            <Slideshow />

            <button className="inc" onClick={inc} disabled={quantity === stock} >+</button>

            <input className="num" type="number" min="1" max={stock} step="1" value={quantity}
            onChange={(e) =>{
                let value = Number(e.target.value);

                if (value < 1) value = 1;
                if (value > stock) value = stock;

                setQuantity(value);
            }}></input>

            <button className="dec" onClick={dec} disabled={quantity === 1} >-</button>

            <br />

            <button className="cart" onClick={()=>
                addtoCart(
                    {
                        id:1,
                        name:"flower chain",
                        price:20,
                    },
                    quantity
                )
            }>Add to cart</button>

            <h2>Leave a review</h2>

            <form onSubmit={handleReviewSubmit}>
                <textarea placeholder="Write your review.." value={reviewMessage} onChange={(e) => setReviewMessage(e.target.value)} required />

                    <br />

                <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />

                <p>Please rate from 1 to 5</p>

                <input type="file" accept="image/*" onChange={(e) => setReviewImage(e.target.files[0])} />

                <br />

                <button type="submit">Send reviews</button>

            </form>

            <h2>Customer reviews</h2>

            {reviews.map((r) => (
                <div key={r._id} style={{border:"1px solid #ccc", padding:10, marginBottom:10}}>
                    <p>⭐ {r.rating}/5</p>
                    <p>{r.message}</p>

                    {r.image && (
                        <img src={`http://localhost:5000/uploads/${r.image}`} width="150" />
                    )}
                </div>
            ))}            

        </div>   
    )
}

export default Chains1;