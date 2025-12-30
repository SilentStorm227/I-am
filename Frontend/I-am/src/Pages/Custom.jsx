import { useState } from "react";
import "../Style/custom order.css"

function Custom() {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("message", message);
        if (image) formData.append("image", image);

        const res = await fetch("http://localhost:5000/api/custom-order", {
            method: "POST",
            body: formData
        });
    }
    return(
        <div>
            <h1 className="text2">Make a custom order today!!</h1>

            <input placeholder="Name"></input>
        </div>
    )
}

export default Custom;