import React from "react";
import App from "./App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './app/store';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
