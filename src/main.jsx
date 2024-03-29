import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignInSide from './components/SignInSide.jsx';


/*    path: "contacts/:contactId",
    element: <Contact />, 
    https://reactrouter.com/en/main/start/tutorial*/
const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignInSide />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
