import { createContext, useState } from "react";

export const  cartContext = createContext();

export function cartProvider({children}){
    const [cart, setCart] = useState([]);

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
            return [,,,prev, {...product, quantity}];
        });
    };

    return(
        <cartContext.Provider value={{cart, addtoCart}}>
            {children}
        </cartContext.Provider>
    );
}