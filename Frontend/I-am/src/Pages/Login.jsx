import { useState } from "react";

function Login() {
    return(
        <div>
            <h1>Login</h1>

            <input placeholder="Name"></input><br /><br />

            <input placeholder="Password" type="password"></input><br /><br />


            <button>Login</button>
        </div>
    )
}

export default Login;