import {useEffect, useState, useContext} from "react";
import p1 from "../assets/2.jpg"
import Slideshow from "./Slideshow";
import "../Style/chains.css"
import { cartContext } from "./Context";

function Chains1() {

const {addtoCart} = useContext(cartContext)

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

    return(
        <div>
            <h1 className="text">Flower trouser/skirt chain</h1>

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
        </div>
    )
}

export default Chains1;