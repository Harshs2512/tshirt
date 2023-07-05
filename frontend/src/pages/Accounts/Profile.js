import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserSd from '../../components/Layout/UserSd';
import { UilEdit, UilTimes } from '@iconscout/react-unicons';
import { Radio, Select } from 'antd';
import Login from '../Auth/Login';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();
    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState({ day: '01', month: '01', year: '1999' });
    const [edit, setEdit] = useState(false);
    const [gender, setGender] = useState(null);
    console.log(auth.user)

    const ProfileData = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/v1/me');
            console.log(auth.user)
            setFirstName(data.user.fname);
            setLastName(data.user.lname);
            setEmail(data.user.email);
            setContact(data.user.contact);
            setAddress(data.user.address);
            setDob({
                day: data.user.dob.substring(0, 2),
                month: data.user.dob.substring(3, 5),
                year: data.user.dob.substring(6, 10),
            });
            setGender(data.user.gender);
        } catch (error) {
            console.log(error);
        }
    };

    const object1 = address && address.building
    const object2 = address && address.locality
    const object3 = address && address.landmark
    const object4 = address && address.city
    const object5 = address && address.pincode
    const object6 = address && address.mystate
    const object7 = address && address.country

    const add = `${object1} ${object2} ${object3} ${object4} - ${object5}
${object6} 
${object7}`

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('http://localhost:8000/api/v1/me/update', {
                fname,
                lname,
                email,
                contact,
                dob: `${dob.day}-${dob.month}-${dob.year}`,
                gender,
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
                setTimeout(() => {
                    navigate(location.state || '/account/profile');
                }, 2000);
            }
            setEdit(false)
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleGender = (e) => {
        setGender(e.target.value);
    };

    useEffect(() => {
        if (!auth.user && !auth.user) {
            navigate('/login');
        }
        else if (auth.user && auth?.user.role === 'admin') {
            navigate('/account/admin/profile');
        }
        ProfileData();
    }, [auth.user]);


    const handleDayChange = (value) => {
        console.log('Day:', value);
        setDob({ ...dob, day: value });
    };

    const handleMonthChange = (value) => {
        console.log('Month:', value);
        setDob({ ...dob, month: value });
    };

    const handleYearChange = (value) => {
        console.log('Year:', value);
        setDob({ ...dob, year: value });
    };

    return (
        <Layout title={'Your Profile'}>
            <ToastContainer />
            <div className="pt-20">
                <div className="grid grid-cols-7">
                    <div className="col-span-2 bg-red-500">
                        <UserSd />
                    </div>
                    <div className="col-span-5 py-1">
                        <h1 className="font-bold text-4xl text-center text-stone-700 capitalize">
                            Welcome {auth.user && auth.user.fname}
                        </h1>
                        <button className="text-sm text-right float-right mr-28" onClick={handleEdit}>
                            <h1 className="flex">
                                <span>{edit ? <UilTimes /> : <UilEdit />}</span>
                            </h1>
                        </button>
                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10">
                            <div className="flex">
                                <div className="mb-4 w-80">
                                    <label htmlFor="firstName" className="block mb-1 text-stone-600">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={fname}
                                        placeholder="Firstname"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 bg-blue-50 text-gray-500"
                                        disabled={!edit}
                                    />
                                </div>
                                <div className="mb-4 ml-10 w-80">
                                    <label htmlFor="lastName" className="block mb-1 text-stone-600">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder="Surname"
                                        value={lname}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 bg-blue-50 text-gray-500"
                                        disabled={!edit}
                                    />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mb-4 w-80">
                                    <label htmlFor="email" className="block mb-1 text-stone-600">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        placeholder="Email ID"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 bg-blue-50 text-gray-500"
                                        disabled
                                    />
                                </div>
                                <div className="mb-4 ml-10 w-80">
                                    <label htmlFor="email" className="block mb-1 text-stone-600">
                                        Contact
                                    </label>
                                    <input
                                        type="text"
                                        id="contact"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        placeholder="contact number"
                                        className="w-full border border-gray-300 rounded px-3 py-2 bg-blue-50 text-gray-500"
                                        disabled={!edit}
                                    />
                                </div>
                            </div>
                            <div className="mb-4 w-80">
                                <label htmlFor="email" className="block mb-1 text-stone-600">
                                    DOB
                                </label>
                                <div className="flex">
                                    <Select
                                        value={dob.day}
                                        onChange={handleDayChange}
                                        className="w-1/3"
                                        placeholder="Day"
                                        disabled={!edit}
                                    >
                                        {[...Array(31)].map((_, index) => (
                                            <Option key={index + 1} value={(index + 1).toString().padStart(2, '0')}>
                                                {(index + 1).toString().padStart(2, '0')}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Select
                                        value={dob.month}
                                        onChange={handleMonthChange}
                                        className="w-1/3 ml-5"
                                        placeholder="Month"
                                        disabled={!edit}
                                    >
                                        {[...Array(12)].map((_, index) => (
                                            <Option key={index + 1} value={(index + 1).toString().padStart(2, '0')}>
                                                {(index + 1).toString().padStart(2, '0')}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Select
                                        value={dob.year}
                                        onChange={handleYearChange}
                                        className="w-1/3 ml-5"
                                        placeholder="Year"
                                        disabled={!edit}
                                    >
                                        {[...Array(100)].map((_, index) => {
                                            const year = new Date().getFullYear() - index;
                                            return (
                                                <Option key={year} value={year.toString()}>
                                                    {year}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 text-stone-600">Gender</label>
                                <Radio.Group onChange={handleGender} value={gender} disabled={!edit}>
                                    <Radio value={'Male'}>Male</Radio>
                                    <Radio value={'Female'}>Female</Radio>
                                    <Radio value={'Other'}>Other</Radio>
                                </Radio.Group>
                            </div>
                            {address && <div className="mb-4 w-80">
                                <label htmlFor="address" className="block mb-1 text-stone-600">
                                    Address
                                </label>
                                <textarea
                                    disabled
                                    className="w-full h-24 p-2 border border-gray-300 rounded"
                                    placeholder="Enter your Address here..."
                                    value={add}
                                />
                            </div>}

                            {edit ? <div className='mt-10 flex items-center justify-center'>
                                <button type="submit" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-16 py-2.5 text-center mr-2 mb-2 flex">Save</button>
                            </div> : ''}
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;


