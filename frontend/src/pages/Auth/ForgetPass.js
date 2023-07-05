import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [emailerror, setEmailerror] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const sendEmail = async () => {
          await axios.post("http://localhost:8000/api/v1/password/forgot/", {
            email
          });
        };
    
        toast.promise(
          sendEmail(),
          {
            pending: "Sending email...",
            success: "Email sent",
            error: "Failed to send email"
          }
        ).then(() => {
          setTimeout(() => {
            toast.info("Check your email!");
          }, 2000); // Delay the second toast by 2 seconds
        }).catch((error) => {
          console.log(error);
          setEmailerror(true);
        });
      };
    
    return (
        <Layout title={"Forget-Password"}>
            <ToastContainer />
            <div className='pt-20'>
                <h1 className='font-bold text-4xl text-center tracking-widest text-stone-800'>TshirtHub</h1>
                <h1 className='font-medium text-3xl text-center tracking-wide mt-10 text-stone-900'>RESET YOUR PASSWORD</h1>
                <h1 className='text-lg text-center tracking-wide mt-5 text-stone-900'>We will send you an email to reset your password.</h1>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
                    <div className="mb-8">
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
                    {emailerror ? <h1 className='text-lg text-center tracking-wide text-red-600'>No account found with that email.</h1> : ''}
                    <div className='mt-20 flex items-center justify-center'>
                        <button type="submit" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg px-16 py-2.5 text-center mr-2 mb-2 flex">Submit</button>
                    </div>
                    <Link to="/login">
                        <h1 className="mt-10 mb-10 text-center text-xl">
                            Cencel
                        </h1>
                    </Link>
                </form>
            </div>
        </Layout>
    );
};
export default ForgetPassword;
