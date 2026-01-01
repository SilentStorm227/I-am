import { Link } from "react-router-dom";
import "../Style/navbar.css"
import c1 from "../assets/1.svg"
import { useContext } from "react";

import { cartContext } from "./Context";


function Navbar() {
    const {cart} = useContext(cartContext);

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    return(
        <div>
            <nav className="nav">
                <div className="header">
                    <Link to="/" className="left">
                    <button className="button1">I am ...</button>
                    {/* <h1 className="logo">I AM ...</h1> */}
                    </Link>

                </div>

                    <Link to="/login" className="right">
                        <button className="button1">Login</button>
                    </Link>

                    <Link to="/sign-in" className="right">
                        <button className="button1">Sign up</button>
                    </Link>

                    <Link to="/cart" className="right cart-icon">
                         <img src={c1} alt="cart" />
                        <span className="cart-count">{total}</span>
                    </Link>


                    <Link to="/custom-order" className="right">
                        <button className="button1">Custom order</button>
                    </Link>
            </nav>
        </div>
    )
};

export default Navbar;