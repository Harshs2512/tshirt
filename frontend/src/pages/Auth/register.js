import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../../components/Layout/Layout";

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/register", {
                email,
                password,
                fname,
                lname
            });
            console.log(res);
            if (res && res.data.success) {
                console.log(res);
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error,"j");
            toast.error("error");
        }
    };

    return (
        <Layout title={"Login"}>
            <ToastContainer/>
            <div className='pt-20'>
                <h1 className='font-bold text-4xl text-center tracking-widest'>Sign Up</h1>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
                    <div className="mb-5">
                        <div class="relative z-0 w-full mb-6 group">
                            <input
                                type="name"
                                name="floating_email"
                                id="floating_name"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
                                placeholder=" "
                                required />
                            <label htmlFor="floating_pass" class="peer-focus:font-medium absolute text-lg text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                        </div>
                    </div>
                    <div className="mb-5">
                        <div class="relative z-0 w-full mb-6 group">
                            <input
                                type="name"
                                name="floating_email"
                                id="floating_lname"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required />
                            <label htmlFor="floating_pass" class="peer-focus:font-medium absolute text-lg text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                        </div>
                    </div>
                    <div className="mb-5">
                        <div class="relative z-0 w-full mb-6 group">
                            <input
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required />
                            <label htmlFor="floating_pass" class="peer-focus:font-medium absolute text-lg text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Adderess</label>
                        </div>
                    </div>
                    <div className="mb-5">
                        <div class="relative z-0 w-full mb-6 group">
                            <input
                                type="password"
                                name="floating_email"
                                id="floating_pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required />
                            <label htmlFor="floating_email" class="peer-focus:font-medium absolute text-lg text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                    </div>
                    <div className='mt-5 text-sm'>
                        <p className=''>
                            Already have an account
                            <Link to='/login' className="underline ml-2 text-blue-500">
                                SignIn
                            </Link>
                        </p>
                    </div>
                    <div className='mt-10 mb-20 flex items-center justify-center'>
                        <button type="submit" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg px-16 py-2.5 text-center mr-2 mb-2 flex">Sign Up</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
