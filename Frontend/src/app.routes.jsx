import { createBrowserRouter } from 'react-router'
import Login from './auth/pages/Login.jsx'
import Register from './auth/pages/Register.jsx'
import Home from './features/pages/Home.jsx'
import Protected from './auth/components/Protected.jsx'
import AddProduct from './features/components/AddProduct.jsx'
import Cart from './features/components/Cart.jsx'
import UpdateProductForm from './features/components/UpdateProductForm.jsx'

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: '/',
        element: <Protected><Home /></Protected>
    },
    {
        path: '/add',
        element: <Protected><AddProduct /></Protected>
    },
    {
        path: '/cart',
        element: <Protected><Cart /></Protected>
    },
    {
        path: '/update',
        element: <Protected><UpdateProductForm /></Protected>
    }
])