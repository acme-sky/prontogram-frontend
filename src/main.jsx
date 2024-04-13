import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignInSide from './components/SignInSide.jsx';
import SignUp from './components/SignUp.jsx';
import Orders from './components/Orders.jsx';
import Dashboard from './components/Dashboard.jsx';
import Dashboard2 from './components/Dashboard2.jsx';
import Dashboard3 from './components/Dashboard3.jsx';
import Dashboard4 from './components/Dashboard4.jsx'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignInSide />
  },
  {
    path: "/register",
    element: <SignUp />
  },
  {
    path: "/dashboard",
    element: <Dashboard4 />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
