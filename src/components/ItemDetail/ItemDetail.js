import "./ItemDetail.css";
import Counter from "../../components/Counter/Counter";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Button from 'react-bootstrap/Button';


const ItemDetail = ({ product }) => {
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext);
  const [counter, setCounter] = useState (1);

useEffect (()=> {
setCounter(product?.stock === 0 ? 0 : counter)
}, [product]);

  return (
    <div className="container">
      <div className="product">
        <div className="tittle">{product.title}</div>
        <div className="stock"> Stock: {product.stock} unidad/es</div>
        <img className="image" alt={product.title} src={`/img/${product.image}`} />
        <div className="totalProducts">
          <div className="price">Precio ${product.price}</div>
          <div><Counter counter={counter} setCounter={setCounter}/> </div>
        </div>
        <div className="buttons">
        <Button variant="outline-success" onClick={() => navigate('/') } className="button"> Volver </Button>
        <Button variant="outline-success" disabled={product.stock === 0 && counter === 0 || counter > product.stock } onClick={() => addItem(product, counter)} className="button"> Agregar al carrito </Button>
        <Button variant="outline-success" onClick={() => navigate('/Cart') } className="button"> Ir al carrito </Button>
        </div>
      </div>

      <div className="productDetail">
        <div className="titleDetail">{product.titleDetail}</div>
        <div className="detail">{product.detail}</div>
      </div>
    </div>
  );
};

export default ItemDetail;
