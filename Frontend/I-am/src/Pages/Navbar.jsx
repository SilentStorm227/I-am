import { Link } from "react-router-dom";
import "../Style/navbar.css"

function Navbar() {
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

                    <Link to="/cart" className="right">
                        <button className="button1">Cart</button>
                    </Link>

                    <Link to="/custom-order" className="right">
                        <button className="button1">Custom order</button>
                    </Link>
            </nav>
        </div>
    )
};

export default Navbar;