import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './admin_context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

const app = (
  <BrowserRouter>
    <React.StrictMode>
      <App />
      {/* <AuthContextProvider> 
        <App />
      </AuthContextProvider> */}
    </React.StrictMode>
  </BrowserRouter>
);  

ReactDOM.render(app, document.getElementById("root"));
