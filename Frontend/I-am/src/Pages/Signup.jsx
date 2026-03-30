import { useState } from "react";
import "../Style/signup.css"

function Signup() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handlesignup = async()=>{
        const res = await fetch("http://localhost:5000/api/users/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                name,
                password
            })
    });

    const data = await res.json();

    if(data.success){
        alert("Account created!!");
    } else{
        alert(data.error);
    }
};

    return(
        <div className="signup-page" >
            <h1>Sign up</h1>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value) } ></input><br /><br />

            <input placeholder="Username" value={name} onChange={(e) => setName(e.target.value) } ></input><br /><br/>

            <input placeholder="Set Passowrd" value={password} type="password" onChange={(e) => setPassword(e.target.value)} ></input><br /><br />

            <button onClick={handlesignup}>Sign up</button>
        </div>
    )
}

export default Signup;