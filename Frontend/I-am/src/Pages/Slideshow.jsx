import { useEffect, useState } from "react";
import p1 from "../assets/2.jpg"
import p2 from "../assets/Product pictures/1/IMG_2230.jpg"
import p3 from "../assets/Product pictures/2/IMG_2251.jpg"
import "../Style/slideshow.css"

const images = [
    p1,p2,p3
];

const Slideshow = ()=>{
    const [Index, setIndex] = useState(0);

    useEffect(()=>{
        const interval = setInterval(() => {
            setIndex(prev => (prev +1) % images.length)
        }, 3000);

        return ()=> clearInterval(interval);
    }, []);

    return(
        <div>
            <img className="iimg2" src={images[Index]} alt = {`Slide ${Index + 1}`} />
        </div>
    )
};

export default Slideshow;