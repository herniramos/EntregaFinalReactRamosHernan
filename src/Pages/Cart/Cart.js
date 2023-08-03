import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, updateDoc, getFirestore } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';

import "./Cart.css";


const Cart = () => {
  const { cart, clear, removeItem, total } = useContext(CartContext);

  const [formValue, setformValue] = useState ({
    name: '',
    phone: '',
    email: '',
  })
  const navigate = useNavigate();
  const db = getFirestore();

  const createOrder = (event) => {
    event.preventDefault();
    const querySnapshot = collection (db, 'orders');
    
    addDoc(querySnapshot, {
      buyer: {
        name: formValue.name,
        phone: formValue.phone,
        email: formValue.email,
      },
      products: cart.map((product)=> {
        return {
          title: product.title,
          price: product.price,
          id: product.id,
          quantity: product.quantity
        };
      }),
      total: total,
      
    })
    .then((response) => {
      const showAlert = ()=>{
        swal({
          title: "¡Gracias por elegirnos!",
          text: `Tu compra ha sido realizada con éxito,
          su ID es: ${response.id}`,
          icon: "success",
          button: "Aceptar"
        });
      }
      showAlert();
      updateStocks(db);
      clear();  
    })
    .catch((error) => console.log(error));
    
    };  

  const updateStocks = (db) => {
    cart.forEach((products) => {
      const querySnapshot= doc(db, 'products', products.id);
      updateDoc(querySnapshot, {
        stock: products.stock - products.quantity,
      })
      .then(() =>{})
      .catch((error) => console.log(error));
    })
  };  

  const handleInput = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    })
  };

  return (
    <div className="cardContainerCart">
      <div className="cardContainer">
      {cart.map((product) => (
        <div className="cardCart" key={product.id}>
          <div className="tittleItemCart">{product.title}</div>
          <img className="imageItemCart" alt={product.title} src={`/img/${product.image}`} />
          <div className="quantityItemCart">Cantidad: {product.quantity}</div>
          <div className="priceItemCart">Precio total ${product.price*product.quantity}</div>
          <Button className="buttonQuitar" variant="outline-success" onClick={() => removeItem(product.id)}>Quitar producto</Button>
        </div>
      ))}
      </div>
      {cart.length > 0 && (
      <div>
        <div className="buttonContainer">
          <div className="totalButton">
          <span className="total">Total: ${total}</span>
          </div>
        </div >
        <div>
              <form className="form">
                  <input className="name" name='name' type='text' placeholder='Nombre y apellido' value={formValue.name} onChange={handleInput}/>
                  <input className="phone" name='phone' type='number' placeholder='Ingrese su número telefónico' value={formValue.phone} onChange={handleInput}/>
                  <input className="email" name='email' type='email' placeholder='Ingrese su correo electrónico' value={formValue.email} onChange={handleInput}/>
                  <input className="email" name='email2' type='email' placeholder='Reingrese su correo electrónico' value={formValue.email2} onChange={handleInput}/>
                  <Button className="button" variant="outline-warning" onClick={createOrder}>Completar la compra</Button>
                  {cart.length > 0 && <Button className="button" variant="outline-warning" onClick={clear}>Vaciar carrito</Button>}
              </form>
        </div>
      </div>)}
        <div>
        {cart.length === 0 && <div className="noProducts">No hay productos en el carrito</div>}
        <div className="vacio">
        <Button className="buttonVolver" variant="outline-warning" onClick={() => navigate('/')}>Volver</Button>
        </div>
      </div>
    </div>
  );
  
  };

export default Cart;