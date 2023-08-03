import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import "./ItemDetailContainer.css"
import { getFirestore, doc, getDoc } from "firebase/firestore";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const getProduct = () => {
    const db = getFirestore();
    const querySnapshot = doc(db, 'products', id); 

    getDoc(querySnapshot)
      .then((response) => {
        setProduct({
          id: response.id, ...response.data() 
        })          
      })  
      .catch((error)=>console.log(error));
  };

  useEffect(() => {
    getProduct();
  }, []);
  
  return <div className="box">
    <ItemDetail product={product}/>
    </div>;
};

export default ItemDetailContainer;
