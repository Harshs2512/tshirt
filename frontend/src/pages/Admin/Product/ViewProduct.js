import React, { useEffect, useState } from "react";
import { UilCreateDashboard, UilEye, UilEditAlt, UilTrashAlt } from '@iconscout/react-unicons'
// import CategoryForm from "../../../../components/Form/CategoryForm"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "antd";
import AdminSd from "../../../components/Layout/AdminSd";
import Layout from "../../../components/Layout/Layout";
import { NavLink, Link, useNavigate } from "react-router-dom";



const ViewProduct = () => {
    const [categories, setCategories] = useState([]);
    const [catName, setName] = useState("");
    const [products, setProduct] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedcatName, setUpdatedName] = useState("");
    const navigate = useNavigate();
    const [count_data, setCount_data] = useState([]);


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

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/category/show_category/");
            console.log(data)
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `http://localhost:8000/api/v1/category/category/${selected._id}/`,
                { catName: updatedcatName }

            );

            if (data?.success) {
                toast.success(`${updatedcatName} Updated Successfully`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();

            } else {
                toast.error(data.message);

            }

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
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/products");
            setProduct(data.products)
            console.log(data.products)
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllProducts();
        getAllCategory();
        Count();
    }, []);

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
                                <div className=' h-28 w-28 grid place-content-center text-darkblue '>
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
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                                <tr>
                                                    <th scope="col" className="px-1 py-4">Sr no</th>
                                                    <th scope="col" className="px-1 py-4">Title</th>
                                                    <th scope="col" className="px-1 py-4">Category</th>
                                                    <td scope='col' className="px-1 py-4">Description</td>
                                                    <td scope='col' className="px-1 py-4">Selling Price</td>
                                                    <td scope='col' className="px-1 py-4">Discounted Price</td>
                                                    <td scope='col' className="px-1 py-4">Size</td>
                                                    <td scope='col' className="px-1 py-4">Color</td>
                                                    <td scope='col' className="px-1 py-4">quantity</td>
                                                    <td scope='col' className="px-1 py-4">No of Rating</td>
                                                    <td scope='col' className="px-1 py-4">Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products && products?.map((p, index) => (
                                                    <>
                                                        <tr key={p._id} className="border-b dark:border-neutral-500 ">
                                                            <td className="px-1 py-4 font-medium">{index + 1}</td>
                                                            <td className="px-1 py-4 max-w-lg break-all">{p.title}</td>
                                                            <td className="px-1 py-4 max-w-lg break-all">{p.category && p.category.catName}</td>
                                                            <td className="px-1 py-4 max-w-lg break-all">{p.description}</td>
                                                            <td className="px-1 py-4 max-w-lg break-all">{p.selling_price}</td>
                                                            <td className="px-1 py-4 max-w-lg break-all">{p.discounted_price}</td>
                                                            <td className="px-1 py-4 max-w-lg break-all">{p.size}</td>
                                                            <td className="px-1 py-4 max-w-lg break-all">{p.color}</td>
                                                            <td className="px-1 py-4 max-w-lg break-all">{p.quantity}</td>
                                                            <td className="px-1 py-4 max-w-lg break-all">{p.rating}</td>
                                                            <td className='flex gap-1 mt-3'>
                                                                <button className='bg-gray-900 text-white rounded-md text-[12px] px-1'
                                                                ><Link to={"/account/admin/product/" + (p.slug)}><UilEditAlt /></Link></button>
                                                                <button className='bg-gray-900 text-white rounded-md text-[12px] px-1' onClick={() => {
                                                                    handleDelete(p._id);
                                                                }}><UilTrashAlt /></button>
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
export default ViewProduct;
