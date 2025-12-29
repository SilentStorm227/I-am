import React, {useState} from "react";
import p1 from "../assets/2.jpg"
import Slideshow from "./Slideshow";
import "../Style/chains.css"

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

const addtoCart = ()=>{
    console.log("added to cart:", quantity)
}

function Chains1() {
    return(
        <div>
            <h1 className="text">Flower trouser/skirt chain</h1>
            <Slideshow />
            <button className="inc" onClick={inc}>+</button>

            <input className="num" type="number" value={quantity}
            onChange={(e) =>{
                let value = Number(e.target.value);

                if (value < 1) value = 1;
                if (value > stock) value = stock;
            }}></input>

            <button className="dec" onClick={dec}>-</button>
            <br />
            <button className="cart" onClick={addtoCart}>Add to cart</button>
        </div>
    )
}

export default Chains1;