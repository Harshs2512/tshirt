import React, { useEffect, useState } from "react";
import { UilCreateDashboard, UilEye, UilEditAlt, UilTrashAlt } from '@iconscout/react-unicons'
// import CategoryForm from "../../../../components/Form/CategoryForm"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Select } from "antd";
import AdminSd from "../../../components/Layout/AdminSd";
import Layout from "../../../components/Layout/Layout";
import { NavLink, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../../context/auth";
const { Option } = Select;



const Order = () => {
    const [categories, setCategories] = useState([]);
    const [catName, setName] = useState("");
    const [orders, setOrders] = useState();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedcatName, setUpdatedName] = useState("");
    const navigate = useNavigate();
    const [count_data, setCount_data] = useState([]);
    const [auth, setAuth] = useAuth()
    const [status, setStatus] = useState([
        "Under Process",
        "Processing",
        "Shipped",
        "Deliverd",
        "cancel",
    ]);

    const Count = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/count/data");
            setCount_data(data.count_data)
            console.log(data.count_data)
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };


    //delete a product
    const handleDelete = async (id) => {
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `http://localhost:8000/api/v1/product/${id}`
            );
            toast.success("Product DEleted Succfully");
            navigate("/account/admin/product");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };


    //get all products
    const getAllOrders = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/allorder");
            setOrders(data.orders)
            console.log(data)
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        if (auth?.token) getAllOrders();
      }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`http://localhost:8000/api/v1/myorders/status/${orderId}`, {
                status: value,
            });
            getAllOrders();
        } catch (error) {
            console.log(error);
        }
    };
    console.log(orders)

    return (
        <Layout title={'Category-admin'}>
            <ToastContainer />
            <div className="pt-20">
                <div className="grid grid-cols-9">
                    <div className="col-span-2 bg-red-500">
                        <AdminSd />
                    </div>
                    <div className="col-span-7 py-1">
                        <h1 className="font-bold text-4xl text-center text-stone-700 capitalize">
                            Welcome Admin
                        </h1>
                        <div className='grid grid-cols-3 mx-auto mt-5'>
                            <div className='shadow-xl rounded-2xl w-40 h-40 grid place-content-center ml-10 bg-gray-100'>
                                <div className='h-28 w-28 grid place-content-center text-darkblue '>
                                    <UilCreateDashboard size='100' />
                                </div><br />
                                <button className='bg-blue-900 text-heading text-white w-28 rounded-xl mb-5' >
                                    <NavLink to='/account/admin/product/addproduct'>Add Product</NavLink>
                                </button>
                            </div>
                            <div className='shadow-xl rounded-2xl w-40 h-40 grid place-content-center ml-6 bg-gray-100'>
                                <div className=' h-28 w-28 grid place-content-center text-darkblue '>
                                    <UilEye size='100' />
                                </div><br />
                                <button className='bg-blue-900 text-heading text-white w-32 rounded-xl mb-5' >
                                    <NavLink to='/account/admin/product/viewproduct'>View Product</NavLink>
                                </button>
                            </div>
                            <div className='shadow-xl rounded-2xl w-40 h-40 grid place-content-center bg-gray-100'>
                                {count_data.map((c) => (
                                    <h1 key={c._id} className='text-darkblue font-medium'>Total Categories : {c.product}</h1>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col ml-1">
                            <div className="">
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left text-sm font-light">
                                            <thead className="border-b font-medium">
                                                <tr>
                                                    <th scope="col" className="px-1 py-4">Sr no</th>
                                                    <th scope="col" className="px-1 py-4">Order_Id</th>
                                                    <th scope="col" className="px-1 py-4">Order Items</th>
                                                    <td scope='col' className="px-1 py-4">order_date</td>
                                                    <td scope='col' className="px-1 py-4">user</td>
                                                    <td scope='col' className="px-1 py-4">email</td>
                                                    <td scope='col' className="px-1 py-4">Contact</td>
                                                    <td scope='col' className="px-1 py-4">address</td>
                                                    <td scope='col' className="px-1 py-4">status</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders && orders?.map((p, index) => (
                                                    <>
                                                        <tr key={p._id} className="border-b">
                                                            <td className="px-2 py-4 font-medium">{index + 1}</td>
                                                            <td className="px-2 py-4 max-w-lg break-all font-medium">{p._id}</td>
                                                            <td className="px-2 py-4 max-w-lg break-all">
                                                                <ul>
                                                                    {p.products.map((item) => (<>
                                                                        <li key={item.id}>
                                                                            {item.title} x {item.quantity}
                                                                        </li>
                                                                        <li key={item.id}>
                                                                            Color - {item.color}
                                                                        </li>
                                                                        <li key={item.id}>
                                                                            size - {item.size}
                                                                        </li>
                                                                        <li key={item.id}>
                                                                            {item._id}
                                                                        </li>
                                                                    </>))}
                                                                </ul>
                                                            </td>
                                                            <td className="px-2 py-4 max-w-lg break-all">{moment(p?.createdAt).fromNow()} {p.createdAt.substring(0, 10)}</td>
                                                            <td className="px-2 py-4 max-w-lg break-all">{p.user.fname} {p.user.lname}</td>
                                                            <td className="px-2 py-4 max-w-lg break-all">{p.user.email}</td>
                                                            <td className="px-2 py-4 max-w-lg break-all">{p.user.contact}</td>
                                                            <td className="px-2 py-4 max-w-lg break-all">{p.user.address.building},
                                                                {p.user.address.locality},
                                                                {p.user.address.landmark},
                                                                {p.user.address.city} - {p.user.address.pincode},
                                                                {p.user.address.mystate},
                                                                {p.user.address.country}</td>
                                                            <td className="px-2 py-4 max-w-lg break-all font-bold">
                                                                <Select
                                                                    bordered={false}
                                                                    onChange={(value) => handleChange(p._id, value)}
                                                                    defaultValue={p?.status}
                                                                >
                                                                    {status.map((s, i) => (
                                                                        <Option key={i} value={s}>
                                                                            {s}
                                                                        </Option>
                                                                    ))}
                                                                </Select>
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                            </tbody>
                                            <ToastContainer />
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Order;
