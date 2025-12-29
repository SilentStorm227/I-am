import React from "react";
import p1 from "../assets/2.jpg"
import Slideshow from "./Slideshow";
import "../Style/chains.css"

function Chains1() {
    return(
        <div>
            <h1 className="text">Flower trouser/skirt chain</h1>
            <Slideshow />
            <button className="inc">+</button>
            <input className="num"></input>
            <button className="dec">-</button>
            <br />
            <button className="cart">Add to cart</button>
        </div>
    )
}

export default Chains1;