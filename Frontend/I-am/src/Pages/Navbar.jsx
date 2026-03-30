// import { Link } from "react-router-dom";
// import "../Style/navbar.css"
// import c1 from "../assets/1.svg"
// import { useContext } from "react";
// import { cartContext } from "./Context";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";



// function Navbar() {
//     const {cart} = useContext(cartContext);
//     const navigate = useNavigate();
//     const token = localStorage.getItem("token");

//     let username = "";

//     if(token){
//         const decoded = jwtDecode(token);
//         username = decoded.name; // make sure backend sends name in token
//     }

//     const handleLogout = () =>{
//         localStorage.removeItem("token");
//         navigate("/Login");
//     };

//     const total = cart.reduce((sum, item) => sum + item.quantity, 0);
//     return(
//         <div>
//             <nav className="nav">
//                 <div className="header">
//                     <Link to="/" className="left">
//                     <button className="button1">Beaded Buddies</button>
//                     </Link>

//                 </div>



//                     <Link to="/sign-in" className="right">
//                         <button className="button1">Sign up</button>
//                     </Link>

//                     <Link to="/cart" className="right cart-icon">
//                          <img src={c1} alt="cart" />
//                         <span className="cart-count">{total}</span>
//                     </Link>
// {/* 
//                     <Link to="/custom" className="right">
//                         <button className="button1">Custom order</button>
//                     </Link> */}
//             </nav>

//                         <span>Hi, {username} </span>
//                 {token ? (
//                     <div className="button1 right1">
//                         <button onClick={handleLogout}>Logout</button>
//                     </div>
//                 ): (
//                     <button onClick={() => navigate("Login")} className="button1 right2" >Login</button>
//                 )}

//         </div>
//     )
// };

// export default Navbar;

import { Link } from "react-router-dom";
import "../Style/navbar.css";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { cartContext } from "./Context";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { cart } = useContext(cartContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    let username = "";

    if (token) {
        const decoded = jwtDecode(token);
        username = decoded.name;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Login");
    };

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="nav">

            {/* LEFT - LOGO */}
            <div className="nav-left">
                <Link to="/">
                    <img src={logo} alt="logo" className="logo" />
                </Link>
            </div>

            {/* CENTER - BRAND NAME */}
            <div className="nav-center">
                <Link to="/" className="brand">
                    Beaded Buddies
                </Link>
            </div>

            {/* RIGHT - BUTTONS */}
            <div className="nav-right">

                <Link to="/cart">
                    <button className="nav-btn">Cart ({total})</button>
                </Link>

                {!token && (
                    <>
                        <Link to="/sign-in">
                            <button className="nav-btn">Sign up</button>
                        </Link>

                        <button className="nav-btn" onClick={() => navigate("/Login")}>
                            Login
                        </button>
                    </>
                )}

                {token && (
                    <>
                        <span className="username">Hi, {username}</span>
                        <button className="nav-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;