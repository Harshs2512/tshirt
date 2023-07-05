import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserSd from '../../components/Layout/UserSd';
import { UilMapMarkerPlus, UilTrash, UilEditAlt } from '@iconscout/react-unicons';
import { Radio, Select, Popover } from 'antd';
import Login from '../Auth/Login';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const Address = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();
    const [user, setProfile] = useState();
    const [isOpen, setIsopen] = useState(false)
    const [errors, setErrors] = useState({})
    const [pincode, setPincode] = useState('')
    const [building, setBuilding] = useState('')
    const [city, setCity] = useState('')
    const [mystate, setMystate] = useState('')
    const [landmark, setLandmark] = useState('')
    const [locality, setLocality] = useState('')
    const [country, setCountry] = useState('India')
    const statesList = ["Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry"]
    console.log(isOpen)

    const handleSubmit = async () => {

        // Validate the form before submitting
        const validationErrors = {};
        if (!pincode) {
            validationErrors.pincode = "Pincode is required";
        }
        if (!city) {
            validationErrors.city = "City is required";
        }
        if (!mystate) {
            validationErrors.state = "State is required";
        }
        if (!country) {
            validationErrors.building = "country is required";
        }
        if (!building) {
            validationErrors.building = "Building is required";
        }
        if (!locality) {
            validationErrors.locality = "Locality is required";
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        }
        try {
            const { data } = await axios.put('http://localhost:8000/api/v1/me/update', {
                address: {
                    pincode,
                    building,
                    locality,
                    landmark,
                    city,
                    mystate,
                    country
                }
            });

            if (data?.errro) {
                console.log('kkr');
                toast.error('jhrtrwewq');
            } else {
                console.log('kkb');
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                console.log(data.updatedUser);
                toast.success('Profile Updated Successfully');
                // setTimeout(() => {
                //     navigate(location.state || '/account/profile');
                // }, 2000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title={'Your Profile'}>
            <ToastContainer />
            <div className="pt-20">
                {isOpen && <div
                    id="defaultModal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="absolute w-full max-w-2xl max-h-full ml-64">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow ">
                            {/* Modal header */}
                            <div className="flex items-start justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900 ">
                                    Add New Adderess
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    data-modal-hide="defaultModal"
                                    onClick={((e) => { setIsopen(false) })}
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <form onSubmit={handleSubmit}>
                                <div className="p-2 bg-gray-100 flex items-center justify-center">
                                    <div className="container max-w-screen-lg mx-auto">
                                        <div className="text-sm p-3 px-5">
                                            <div className="lg:col-span-2">
                                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                                    <div className="md:col-span-5">
                                                        <label htmlFor="full_name">Full Name</label>
                                                        <input
                                                            type="text"
                                                            name="full_name"
                                                            id="full_name"
                                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 capitalize"
                                                            value={auth.user && auth.user.fname + " " + auth.user.lname} disabled />
                                                    </div>

                                                    <div className="md:col-span-5">
                                                        <label htmlFor="email">Email Address</label>
                                                        <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={auth.user && auth.user.email} placeholder="email@domain.com" disabled />
                                                    </div>

                                                    <div className="md:col-span-3">
                                                        <label htmlFor="address">Address / Street</label>
                                                        <input
                                                            type="text"
                                                            name="building_add"
                                                            id="building_add"
                                                            value={building}
                                                            onChange={(e) => setBuilding(e.target.value)}
                                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                            placeholder=" "
                                                            required />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label htmlFor="city">City</label>
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            id="city"
                                                            value={city}
                                                            onChange={(e) => setCity(e.target.value)}
                                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                            placeholder=" "
                                                            required />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label htmlFor="country">Country / region</label>
                                                        <select
                                                            type="text"
                                                            name="country"
                                                            id="country"
                                                            value={country}
                                                            onChange={(e) => setCountry(e.target.value)}
                                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                            placeholder=" "
                                                        >
                                                            <option>India</option>
                                                        </select>
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label htmlFor="state">State/province</label>
                                                        <select
                                                            type="text"
                                                            name="state"
                                                            id="state"
                                                            value={mystate}
                                                            onChange={(e) => setMystate(e.target.value)}
                                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                            placeholder=" "
                                                            required>
                                                            <option value="">Select State</option>
                                                            {statesList.map((state) => (
                                                                <option key={state} value={state}>
                                                                    {state}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="md:col-span-1">
                                                        <label htmlFor="zipcode">Zipcode</label>
                                                        <input
                                                            type="text"
                                                            name="pincode"
                                                            id="pincode"
                                                            value={pincode}
                                                            onChange={(e) => setPincode(e.target.value)}
                                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                            placeholder="Zipcode"
                                                            required />
                                                    </div>

                                                    <div className="md:col-span-5">
                                                        <label htmlFor="email">Area/Locality</label>
                                                        <input
                                                            type="text"
                                                            name="Locality"
                                                            id="Locality"
                                                            value={locality}
                                                            onChange={(e) => setLocality(e.target.value)}
                                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                            placeholder="Area/Locality"
                                                            required />
                                                    </div>

                                                    <div className="md:col-span-5">
                                                        <label htmlFor="email">Landmark</label>
                                                        <input
                                                            type="text"
                                                            name="Landmark"
                                                            id="Landmark"
                                                            value={landmark}
                                                            onChange={(e) => setLandmark(e.target.value)}
                                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                            placeholder="Area/Locality"
                                                            required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                                    <button
                                        data-modal-hide="defaultModal"
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    // onClick={hideModal}
                                    >
                                        Add
                                    </button>
                                    <button
                                        data-modal-hide="defaultModal"
                                        type="submit"
                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                    // onClick={hideModal}  
                                    >
                                        Cencel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}
                <div className="grid grid-cols-7">
                    <div className="col-span-2 bg-red-500">
                        <UserSd />
                    </div>
                    <div className="col-span-5 py-1">
                        <h1 className="font-bold text-4xl text-center text-stone-700 capitalize">
                            Welcome {auth.user && auth.user.fname}
                        </h1>
                        <div className='pt-20 px-20'>
                            <div className='grid grid-cols-2'>
                                {auth.user && auth.user.address && <div className='bg-gray-100 border border-gray-300 w-80 h-auto rounded-xl p-3'>
                                    <div className='grid grid-cols-2'>
                                        <div>
                                            <Popover content="This is default address" title="Address">
                                                <Radio.Group data-popover-target="popover-user-profile">
                                                    <Radio data-popover-target="popover-user-profile"></Radio>
                                                </Radio.Group>
                                            </Popover>
                                            <p className='text-sm font-bold mb-2'>{auth.user && auth.user.fname} {auth.user && auth.user.lname}</p>
                                        </div>
                                        <div className='flex float-end'>
                                            <UilTrash className="text-gray-500/50 hover:text-red-500 ml-20 mr-2" />
                                            <UilEditAlt className="text-gray-500/50 hover:text-gray-900" />
                                        </div>
                                    </div>
                                    <hr />
                                    <p className='text-sm my-2'>{auth.user && auth.user.address.building}</p>
                                    <p className='text-sm my-2 '>{auth.user && auth.user.address.locality}</p>
                                    <p className='text-sm my-2'>{auth.user && auth.user.address.landmark}</p>
                                    <p className='text-sm my-2 font-medium'>{auth.user && auth.user.address.city} - {auth.user && auth.user.address.pincode}</p>
                                    <p className='text-sm my-2 font-medium'>Mobile - {auth.user && auth.user.contact}</p>
                                    <p className='text-sm my-2 font-medium'>{auth.user && auth.user.address.country}</p>
                                </div>}

                                <div className='text-2xl bg-gray-100 border border-gray-300 w-80 h-60 rounded-xl text-center px-auto'>
                                    <button className='pt-6' onClick={setIsopen}>
                                        <p ><UilMapMarkerPlus className='w-36 h-36 p-10   rounded-full bg-white' /></p>
                                        Add Address
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Address;


