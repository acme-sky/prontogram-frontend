import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
//import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import SignInSide from './components/SignInSide.jsx';
import SignUp from './components/SignUp.jsx';
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
  },
  {
    path: "*",
    element: <Navigate to="/login" />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
