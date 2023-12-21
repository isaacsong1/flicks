import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import routes from './routes';

const router = createBrowserRouter(routes);

const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
