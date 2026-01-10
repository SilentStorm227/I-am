import { useState } from "react";
import Admin from "./Admin";



function Adminpage() {
    const [auth, setAuth] = useState(false);
    const [password, setPassowrd] = useState("");

    if(!auth){

    return(
        <div>
            <h1>Admin panel</h1>
            <br />
            <h1>Admin Login</h1>

        <input type="password" placeholder="Admin password" value={password} onChange={(e) => setPassowrd(e.target.value)} />

        <button onClick={() => {
            if (password === "Ilovecoding@2010"){
                setAuth(true);
            } else{
                alert("You are not admin");
            } 
        }}
        >Enter</button>


        </div>
        
    );

    }

            return <Admin />;

}

export default Adminpage;