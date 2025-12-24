import React from "react";
import "../Style/home.css"
import p1 from "../assets/1.png"

function Home(){
    return(
        <div>
            <div className="navbar">
            <h1>I am ...</h1>
            <img className="p1" src={p1}></img>
            </div>
            <h2 className="products">Products</h2>
    </div>
    )
}

export default Home;