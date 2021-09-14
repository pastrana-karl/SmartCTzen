import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from './context/Context';
// import { AuthContextProvider } from './admin_context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

const app = (
  <BrowserRouter>
    <React.StrictMode>
      <ContextProvider>
        <App />
      </ContextProvider>
      {/* <AuthContextProvider> 
        <App />
      </AuthContextProvider> */}
    </React.StrictMode>
  </BrowserRouter>
);  

ReactDOM.render(app, document.getElementById("root"));
