import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddCoffee from "./Components/AddCoffee.jsx";
import UpdateCoffee from "./Components/UpdateCoffee.jsx";
import SingIn from "./Components/SingIn.jsx";
import SingUp from "./Components/SingUp.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import Users from "./Components/Users.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    loader: () => fetch("https://coffee-store-server-ruddy.vercel.app/coffee"),
  },
  {
    path: "addCoffee",
    element: <AddCoffee></AddCoffee>,
  },
  {
    path: "updateCoffee/:id",
    element: <UpdateCoffee></UpdateCoffee>,
    loader: ({ params }) => fetch(`https://coffee-store-server-ruddy.vercel.app/coffee/${params.id}`),
  },
  {
    path: "/singIn",
    element: <SingIn></SingIn>,
  },
  {
    path: "/singUp",
    element: <SingUp></SingUp>,
  },
  {
    path: "/users",
    element: <Users></Users>,
    loader: () => fetch("https://coffee-store-server-ruddy.vercel.app/user"),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
