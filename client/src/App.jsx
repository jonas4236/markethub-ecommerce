import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// import Components
import Navbar from "./components/Outlet/Navbar";
import Footer from "./components/Outlet/Footer";
import HomePage from "./Pages/HomePage";
import Products from "./Pages/Products";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Cart from "./components/Cart";
import Wishlist from "./components/wishlist/Wishlist";
import Manage from "./components/manage-account/manage";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products/:slug",
        element: <Products />,
      },
      {
        path: "/product/:slug/:slug",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/manage-account",
        element: <Manage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
