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

        if(res.ok){
            setSuccess(true);
            setMessage("");
            setImage(null);
        }
        };
    
    return(
        <div>
            <h1 className="text2">Make a custom order today!!</h1>

            {success && <p>Order successfuly sent</p>}

            <form onSubmit={handleSubmit}>
                <textarea
                placeholder="Describe what you want..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                />

                <br />

                <input
                type="file"
                accept="images/"
                onChange={(e) => setImage(e.target.files[0])}
                />

                <br />

                <button type="submit">Send custom order</button>
            </form>
        </div>
    );
}

export default Custom;