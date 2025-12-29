import React from "react";
import p1 from "../assets/2.jpg"
import Slideshow from "./Slideshow";

function Chains1() {
    return(
        <div>
            <h1>Flower trouser/skirt chain</h1>
            <Slideshow />
            <button className="+">+</button>
            <input className="num"></input>
            <button className="-">-</button>
        </div>
    )
}

export default Chains1;