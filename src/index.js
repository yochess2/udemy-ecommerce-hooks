import React from "react"
import ReactDOM from "react-dom/client"
import { 
    createBrowserRouter, 
    RouterProvider,
} from "react-router-dom"

import "jquery"
import "popper.js/dist/umd/popper"
import "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import "./index.css"

import App from "./App"
import NoMatchPage from "./NoMatchPage"
import Register from "./Register"
import Login from "./Login"
import Dashboard from "./Dashboard"
import Store from "./Store"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NoMatchPage />,
        children: [
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "store",
                element: <Store />,
            },

        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render( 
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)