import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import dotenv from "dotenv";
// component
import WorkOut from "./pages/WorkOut/WorkOut";
import Recipes from "./pages/Recipes/Recipes";
import DashBoardPage from "./pages/DashBoardPage/DashBoardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Recipe from "./pages/Recipes/Recipe-page";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/workOut",
    element: <WorkOut />,
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
  {
    path: "/dashBoard",
    element: <DashBoardPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    path: "/recipes/:name",
    element: <Recipe />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
