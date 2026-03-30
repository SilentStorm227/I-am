import {useEffect, useState, useContext} from "react";
import Slideshow from "./Slideshow";
import "../Style/chains.css"
import { cartContext } from "./Context";

function Chains1() {

const {addtoCart} = useContext(cartContext);

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


    const res = await fetch("http://localhost:5000/api/reviews", {
    method: "POST",
    body: formData
});

if (res.ok) {
    const updated = await fetch("http://localhost:5000/api/reviews/1");
    const data = await updated.json();
    setReviews(data);
}

    setReviewMessage("");
    setRating(5);
    setReviewImage(null);
};

const [quantity, setQuantity] = useState(1)

const inc = ()=>{
        setQuantity(quantity + 1);
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
        <div className="chains-container">
    <h1 className="text">Flower Trouser/Skirt Chain</h1>
    <h2>Overall rating: {average.toFixed(1)} / 5 ⭐</h2>

    <div className="slideshow-container">
        <Slideshow />
    </div>

    <div className="quantity-container">
        <button className="dec" onClick={dec}>-</button>
        <input className="num" type="number" value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}/>
        <button className="inc" onClick={inc}>+</button>
    </div>

    <button className="cart" onClick={()=>
        addtoCart({id:1, name:"flower chain", price:20, quantity: quantity} )
    }>Add to cart</button>

    <h2>Leave a Review</h2>
    <form onSubmit={handleReviewSubmit}>
        <textarea placeholder="Write your review..." value={reviewMessage} onChange={(e)=>setReviewMessage(e.target.value)} required />
        <input type="number" min="1" max="5" value={rating} onChange={(e)=>setRating(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e)=>setReviewImage(e.target.files[0])}/>
        <button type="submit">Send Review</button>
    </form>

    <h2>Customer Reviews</h2>
    {reviews.map(r => (
        <div className="review-card" key={r._id}>
            <p>⭐ {r.rating}/5</p>
            <p>{r.message}</p>
            {r.image && <img src={`http://localhost:5000/uploads/${r.image}`} alt="review"/>}
        </div>
    ))}
</div>
    )
}

export default Chains1;