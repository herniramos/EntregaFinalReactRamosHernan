import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./Pages/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./Pages/ItemDetailContainer/ItemDetailContainer";
import Cart from "./Pages/Cart/Cart";
import CartProvider from "./Context/CartProvider";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Error from "./components/Error/Error";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path={"*"} exact element={<Error/>}/> 
        </Routes>
      </CartProvider>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
