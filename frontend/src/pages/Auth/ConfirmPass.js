import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Password } from "antd";
import Layout from "../../components/Layout/Layout";

const ConfirmPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const token = params.token;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.put(
                `http://localhost:8000/api/v1/password/reset/${token}`,
                {
                    password,
                    confirmPassword
                }
            );

            if (res && res.data.success) {
                toast.info("Check your Email!", {
                    position: "top-right",
                });
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const isPasswordConfirmed = password === confirmPassword;

    return (
        <Layout title={"Forget-Password"}>
            <ToastContainer />
            <div className="pt-20">
                <h1 className="font-bold text-4xl text-center tracking-widest text-stone-800">
                    TshirtHub
                </h1>
                <h1 className="font-medium text-3xl text-center tracking-wide mt-10 text-stone-900">
                    RESET YOUR PASSWORD
                </h1>
                <h1 className="text-lg text-center tracking-wide mt-5 text-stone-900">
                    Confirm And Reset Your Password{" "}
                </h1>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
                    <div className="mb-8">
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="password"
                                className="peer-focus:font-medium absolute text-lg text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                New Password
                            </label>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="confirmPassword"
                                className="peer-focus:font-medium absolute text-lg text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Confirm Password
                            </label>
                        </div>
                        {!isPasswordConfirmed && (
                            <p className="text-red-500">Passwords do not match.</p>
                        )}
                    </div>
                    <div className="mt-20 mb-10 flex items-center justify-center">
                        <button
                            type="submit"
                            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg px-16 py-2.5 text-center mr-2 mb-2 flex"
                            disabled={!isPasswordConfirmed || isLoading}
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ConfirmPassword;