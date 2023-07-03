import React, { useEffect, useState, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, useLocation } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Header from "./Header";
import Footer from "./footer";
import Profile from "./Profile";
import Cart from "./Cart";
import "../App.css";
import Content from "./Content";
import Product from "./Product";
import Checkout from "./Checkout/Checkout";
import { NetworkStatus } from "@apollo/client";
import OrderPlacedComponent from "./Orders/Orders";

export const CartContext = createContext(null);

const GET_ALL_ITEMS = gql`
  query getcartItems($id: Int) {
    allCartItems(id: $id) {
      quantity
    }
  }
`;

function Home(props) {
  const location = useLocation();
  const [wholeQuant, setWholeQuant] = useState(0);
  const [userId, setUserId] = useState();
  useEffect(() => {
    setUserId(location.state.id);
  }, []);
  const [productId, setProductId] = useState();
  const setProductIdevent = () => {
    const urlproductId = Number(
      window.location.pathname.toString().replace("/home/product/", "")
    );
    setProductId(urlproductId);
  };
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_ALL_ITEMS,
    {
      variables: { id: 1 },
      notifyOnNetworkStatusChange: true,
    }
  );
  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  let quant = 0;
  data.allCartItems.forEach((item) => {
    quant += item.quantity;
  });
  if (wholeQuant !== quant) {
    setWholeQuant(quant);
  }
  const onAddItemClick = (item) => {
    setTimeout(() => {
      return refetch({ id: 1 });
    }, 1000);
    setTimeout(() => {
      if (item === "success") {
        return toast.success("Item added to the cart Successfully");
      } else {
        return toast.error("Item deleted from the cart Successfully");
      }
    }, 1300);
  };

  return (
    <div className="whole">
      <div>
        <CartContext.Provider value={wholeQuant}>
          <Header />
          <div className="something">
            <Routes>
              <Route
                path="/profile"
                element={<Profile id={userId} onlogout={props.onlogout} />}
              />
              <Route path="/orders" element={<OrderPlacedComponent />} />
              <Route
                path="/cart"
                element={
                  <Cart onDeleteItemClick={onAddItemClick} userId={userId} />
                }
              />
              <Route
                path="/checkout"
                element={<Checkout refetchCart={refetch} />}
              />
              <Route
                path="/product/:id"
                element={
                  <Product
                    onAddItemClick={onAddItemClick}
                    userId={userId}
                    productId={productId}
                  />
                }
              />
              <Route
                path="*"
                element={<Content onclicked={setProductIdevent} />}
              />
            </Routes>
            <ToastContainer
              position="bottom-left"
              autoClose={2000}
              hideProgressBar={true}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              draggable
              theme="colored"
            />
          </div>
          <Footer />
        </CartContext.Provider>
      </div>
    </div>
  );
}

export default Home;
