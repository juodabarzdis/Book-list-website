import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes";
import Axios from "axios";

Axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppRoutes />);
