import React, { useState, useEffect } from 'react'
import { useNavigate, Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { UilUser, UilBox, UilSignOutAlt, UilTruck, UilCheckCircle } from '@iconscout/react-unicons'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminSd = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.get("http://localhost:8000/api/v1/logout");

            // if (res && res.data.success) {
            //   toast.success(res.data && res.data.message);
            setAuth({
                ...auth,
                user: null,
                token: null,
            });
            localStorage.clear("token");

            navigate(location.state || "/");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <div className='grid grid-rows-3 bg-white p-3 border-r-2 border-gray-400'>
            <div className='bg-purple-300 py-5 px-2 rounded-sm'>
                <h1 className='font-bold text-lg text-stone-700 capitalize'>{auth.user && auth.user.fname} {auth.user && auth.user.lname}</h1>
                <h1 className='text-base underline'>{auth.user && auth.user.email}</h1>
            </div>
            <NavLink to="/account/admin/profile" className='bg-gray-200 mt-10 pt-3 font-medium text-stone-800 focus:border-1 focus:border-red-400'>
                <div className='flex ml-5'>
                    <span className='mr-2'><UilUser /></span>Your Profile
                </div>
            </NavLink>
            <NavLink to="/account/admin/category" className='bg-gray-200 mt-5 py-5 font-medium text-stone-800 focus:border-1 focus:border-red-400'>
                <div className='flex ml-5'>
                    <span className='mr-2'><UilBox /></span>Category
                </div>
            </NavLink>
            <NavLink to="/account/admin/product" className='bg-gray-200 mt-5 py-2 font-medium text-stone-800 focus:border-1 focus:border-red-400'>
                <div className='flex ml-5'>
                    <span className='mr-2'><UilBox /></span>Product
                </div>
            </NavLink>
            <NavLink to="/account/admin/orders" className='bg-gray-200 mt-5 py-2 font-medium text-stone-800 focus:border-1 focus:border-red-400'>
                <div className='flex ml-5'>
                    <span className='mr-2'><UilBox /></span>Orders
                </div>
            </NavLink>
            <NavLink to="/account/orders" className='bg-gray-200 mt-5 py-2 font-medium text-stone-800 focus:border-1 focus:border-red-400'>
                <div className='flex ml-5'>
                    <span className='mr-2'><UilBox /></span>Create Category
                </div>
            </NavLink>
            <Link className='bg-gray-200 mt-36 text-center pt-3 font-medium text-stone-800 focus:border-1 focus:border-red-400'
                onClick={handleLogout}
            >
                <div className='flex text-center ml-28 py-5'>
                    <span className='mr-2'><UilSignOutAlt /></span>LOGOUT
                </div>
            </Link>
        </div>
    )
}

export default AdminSd