import { useState } from "react";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async ()=>{
        const res = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password
            })
    });

    const data = await res.json();

    if (data.success) {
        // Save user to localStorage (temporary session)
        localStorage.setItem(("token", data.token));

        alert ("Login seccesful")
    }
    else{
        alert(data.error)
    }
};

    return(
        <div>
            <h1>Login</h1>

            <input placeholder="Username" value={name} onChange={(e) => setName(e.target.value)}></input><br /><br />

            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br /><br />

            <button onClick={handleLogin} >Login</button>
        </div>
    )
}

export default Login;