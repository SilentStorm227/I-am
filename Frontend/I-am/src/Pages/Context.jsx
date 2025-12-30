import { createContext, useEffect, useState } from "react";

export const  cartContext = createContext();

export function CartProvider({children}){
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    const addtoCart = (product, quantity) =>{
        setCart((prev)=> {
            const existing = prev.find(item => item.id === product.id);

            if(existing){
                return prev.map(item =>
                    item.id === product.id
                    ? {...item, quantity: item.quantity + quantity }
                    : item
                );
            }
            return [...prev, {...product, quantity}];
        });
    };

    const removefromCart = (id) =>{
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const incQty = (id) => {
        setCart(prev =>
            prev.map(item =>
                item.id == id
                ? {...item, quantity: item.quantity + 1}
                : item
            )
        );
    };

    const decQty = (id) =>{
        setCart(prev =>
            prev.map(item =>
                item.id == id
                ? {...item, quantity: item.quantity - 1}
                : item
            )
            .filter(item => item.quantity > 0)
        );
    };

    useEffect(() =>{
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return(
        <cartContext.Provider value={{cart, addtoCart, removefromCart, incQty, decQty}}>
            {children}
        </cartContext.Provider>
    );
}