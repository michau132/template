import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Home } from "./Home";
import { Capsule } from "./Capsule";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const theme = createTheme({});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:capsule" element={<Capsule />} />
          </Routes>
        </BrowserRouter>{" "}
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
