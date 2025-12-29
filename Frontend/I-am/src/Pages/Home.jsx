import React from "react";
import "../Style/home.css"
import p1 from "../assets/1.png"
import p2 from "../assets/2.jpg"

function Home(){
    return(
        <div>
            <div className="navbar">
            <h1>I am ...</h1>
            <img className="p1" src={p1}></img>
            </div>
            <h2 className="products">Products</h2>
            <div className="row">
                <div className="column">
                    <img  className="iimg" src={p2}></img>
                </div>

                <div className="column">
                    <img  className="iimg" src={p2}></img>
                </div>

                <div className="column">
                    <img  className="iimg" src={p2}></img>
                </div>

                <div className="column">
                    <img  className="iimg" src={p2}></img>
                </div>
            </div>
    </div>
    )
}

export default Home;