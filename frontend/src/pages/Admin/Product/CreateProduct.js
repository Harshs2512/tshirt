import React, { useState, useEffect } from 'react'
import axios from "axios";
import CategoryForm from "../../../components/Form/CategoryForm"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../../components/Layout/Layout';
import AdminSd from '../../../components/Layout/AdminSd';
import { UilEye, UilCreateDashboard } from '@iconscout/react-unicons';
import { NavLink, json } from 'react-router-dom';
import { Select, Radio, Checkbox } from "antd";
const { Option } = Select;

export default function CreateCategory() {
    const [catName, setName] = useState("");
    const [category, setCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [selling_price, setSellingprice] = useState("");
    const [discounted_price, setDiscounted_price] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState([]);
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [user] = useState("");

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/category/show_category/");
            console.log(data)
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //create course function
    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("title", title);
            productData.append("selling_price", selling_price);
            productData.append("discounted_price", discounted_price);
            productData.append("description", description);
            productData.append("quantity", quantity);
            productData.append("size", size);
            productData.append("color", color);
            productData.append("photo", photo);
            productData.append("category", category);
            const { data } = await axios.post("http://localhost:8000/api/v1/product/new", productData);
            if (data?.success) {
                toast.success(data?.message);
                // setTimeout(() => {
                //   navigate("/dashboard/course");
                // }, 1000);
                console.log(data)
            } else {
                console.log("test")
                toast.info("Course is Already Exist");
                // navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error.response.data);
            toast.error(error.response.data.error);
        }
    };
    console.log(size)

    return (
        <Layout title={'Product-admin'}>
            <ToastContainer />
            <div className="pt-20">
                <div className="grid grid-cols-7">
                    <div className="col-span-2">
                        <AdminSd />
                    </div>
                    <div className="col-span-5 py-1">
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
                                {/* {count_data.map((c) => (
                                <h1 key={c._id} className='text-darkblue font-medium'>Total Categories : {c.category}</h1>
                            ))} */}
                            </div>
                        </div>
                        <form onSubmit={handleCreate}>
                            <div class="border-t border-gray-200 w-3/5 mx-auto">
                                <dl>
                                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <Select
                                            required
                                            bordered={false}
                                            placeholder="Select category"
                                            size="large"
                                            showSearch
                                            className="form-select text-slate-800 w-full border border-1"
                                            onChange={(value) => {
                                                setCategory(value)
                                            }}
                                        >
                                            {categories && categories?.map((c) => (
                                                <Option key={c._id} value={c._id}>
                                                    {c.catName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div class="bg-white px-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Product Title"
                                            required
                                            className="w-full text-lg border-b border-black focus:outline-none focus:border-indigo-500 bg-white md:mb-5"
                                        />
                                    </div>
                                    <div class="bg-white px-4 py-1 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                                        <input
                                            type="number"
                                            value={selling_price}
                                            onChange={(e) => setSellingprice(e.target.value)}
                                            placeholder="Selling Price"
                                            required
                                            className="w-full text-lg border-b border-black focus:outline-none focus:border-indigo-500 bg-white md:mb-5"
                                        />
                                    </div>
                                    <div class="bg-white px-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                                        <input
                                            type="number"
                                            value={discounted_price}
                                            onChange={(e) => setDiscounted_price(e.target.value)}
                                            id="exampleInputEmail1"
                                            placeholder="Discounted Price"
                                            required
                                            className="w-full text-lg border-b border-black focus:outline-none focus:border-indigo-500 bg-white md:mb-5"
                                        />
                                    </div>
                                    <div class="bg-white px-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                                        <input
                                            type="text"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            id="exampleInputEmail1"
                                            placeholder="Description"
                                            required
                                            className="w-full text-lg border-b border-black focus:outline-none focus:border-indigo-500 bg-white md:mb-5"
                                        />
                                    </div>
                                    <div class="bg-white px-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                                        <p className='text-gray-400 text-lg'>Select Sizes</p>
                                        <Checkbox.Group
                                            options={["S", "M", "L", "XL", "XXL"]}
                                            value={size}
                                            onChange={(selectedSizes) => setSize(selectedSizes)}
                                        />
                                        <hr />
                                    </div>
                                    <div class="bg-white px-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 mt-7">
                                        <input
                                            type="text"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            placeholder="Color"
                                            required
                                            className="w-full text-lg border-b border-black focus:outline-none focus:border-indigo-500 bg-white md:mb-5"
                                        />
                                    </div>
                                    <div class="bg-white px-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                                        <input
                                            type="text"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            placeholder="Quantity"
                                            required
                                            className="w-full text-lg border-b border-black focus:outline-none focus:border-indigo-500 bg-white md:mb-5"
                                        />
                                    </div>
                                    <div class="bg-white px-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 my-4">
                                        <label className="outline outline-1 col-md-12">
                                            {photo ? photo.name : "Upload Photo"}
                                            <input
                                                type="file"
                                                name="thumnail_img"
                                                accept="image/*"
                                                onChange={(e) => setPhoto(e.target.files[0])}
                                                required
                                                hidden
                                                className="w-full text-lg border-b border-black focus:outline-none focus:border-indigo-500 bg-white md:mb-5" />
                                        </label>
                                    </div>
                                    <div className="mb-3">
                                        {photo && (
                                            <div className="text-center">
                                                <img
                                                    src={URL.createObjectURL(photo)}
                                                    alt="product_thumnail_img"
                                                    height={"200px"}
                                                    className="img img-responsive"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div class="mt-5 text-center mb-4 md:space-x-3 md:block flex flex-col-reverse">
                                        <button onClick={handleCreate} class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">Add Product</button>
                                    </div>
                                </dl>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
