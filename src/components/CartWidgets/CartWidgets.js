import "./CartWidgets.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

const CartWidgets = () => {
  const {cart} = useContext(CartContext);
  const [total, setTotal] = useState(0);
  console.log(cart);

  useEffect(() => {
    setTotal(cart.reduce((prev, curr) => prev + curr.quantity, 0))
  }, [cart])
  return (
    <Link to={'/Cart'}>
    <div className="Carrito">
      <img alt="carrito" src="/img/carrito.png" width="25px" />
      <div className="length">
        {total}
      </div>
    </div>
    </Link>
  );
};

export default CartWidgets;
