import { Link } from "react-router-dom";
import "../Style/navbar.css"
import c1 from "../assets/1.svg"
import { useContext } from "react";
import { cartContext } from "./Context";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


function Navbar() {
    const {cart} = useContext(cartContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    let username = "";

    if(token){
        const decoded = jwtDecode(token);
        username = decoded.name; // make sure backend sends name in token
    }

    const handleLogout = () =>{
        localStorage.removeItem("token");
        navigate("/Login");
    };

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

                    {/* <Link to="/login" className="right">
                        <button className="button1">Login</button>
                    </Link> */}

                    <Link to="/sign-in" className="right">
                        <button className="button1">Sign up</button>
                    </Link>

                    <Link to="/cart" className="right cart-icon">
                         <img src={c1} alt="cart" />
                        <span className="cart-count">{total}</span>
                    </Link>


                    <Link to="/custom" className="right">
                        <button className="button1">Custom order</button>
                    </Link>
            </nav>

                {token ? (
                    <div>
                        <span>Hi, {username} </span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ): (
                    <button onClick={() => navigate("Login")}>Login</button>
                )}

        </div>
    )
};

export default Navbar;