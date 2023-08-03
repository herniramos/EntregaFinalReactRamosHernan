import {CartContext} from './CartContext';
import { useState, useEffect } from 'react';


const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect (()=>{
    setTotal(cart.reduce((acc, curr)=> acc + curr.price * curr.quantity, 0))
  }, [cart]);

  const addItem = (item, quantity) => {

    if (isInCart (item.id)){
      const newCart = cart.map((product) => {
        if (product.id === item.id) {
          product.quantity = product.quantity + quantity;
          return product;
        } else {
          return product;
        }
      });
      setCart(newCart);
    } else {
    const product = {
      id: item.id,
      price : item.price,
      title: item.title,
      titleDetail: item.titleDetail,
      detail: item.detail,
      image: item.image,
      stock: item.stock,
      category: item.category,
      quantity: quantity,
    };
    setCart([...cart, product]);    
  }};

  const clear = () => {
    setCart([]);
  };

  const removeItem = (productId) => {
    setCart(cart.filter((product) => product.id !== productId))
  };

  const isInCart = (productId) => {
    if (cart.find((product) => product.id === productId)) {
      return true;
    } else {
      return false;
    }
  };

  const updateItem = (productid, newQuantity) => {
    const newCart = cart.map((product) => {
      // <div key={product.id}></div>
      if (productid === product.id){
        return {
          ...product,
          quantity: newQuantity
        }
      } else {
        return product
      }
    })
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, clear, removeItem, total, setCart, updateItem}}>
      {children}
    </CartContext.Provider> 
  );
};

export default CartProvider