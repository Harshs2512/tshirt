import React, { useEffect, useState } from "react";
import { UilCreateDashboard, UilEye, UilEditAlt, UilTrashAlt } from '@iconscout/react-unicons'
// import CategoryForm from "../../../../components/Form/CategoryForm"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "antd";
import AdminSd from "../../../components/Layout/AdminSd";
import Layout from "../../../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import CategoryForm from "../../../components/Form/CategoryForm";



const ViewCategory = () => {
    const [categories, setCategories] = useState([]);
    const [catName, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedcatName, setUpdatedName] = useState("")

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/category/show_category/");
            console.log(data)
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

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

    //delete category
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:8000/api/v1/category/category/${id}/`
            );
            if (data.success) {
                toast.success(`Category Deleted successfully`);

                getAllCategory();
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };

    return (
        <Layout title={'Category-admin'}>
            <ToastContainer />
            <div className="pt-20">
                <div className="grid grid-cols-7">
                    <div className="col-span-2 bg-red-500">
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
                                    <NavLink to='/account/admin/category/addcategory'>Add Category</NavLink>
                                </button>
                            </div>
                            <div className='shadow-xl rounded-2xl w-40 h-40 grid place-content-center ml-6 bg-gray-100'>
                                <div className=' h-28 w-28 grid place-content-center text-darkblue '>
                                    <UilEye size='100' />
                                </div><br />
                                <button className='bg-blue-900 text-heading text-white w-32 rounded-xl mb-5' >
                                    <NavLink to='/account/admin/category/viewcategory/'>View Categories</NavLink>
                                </button>
                            </div>
                            <div className='shadow-xl rounded-2xl w-40 h-40 grid place-content-center bg-gray-100'>
                                {/* {count_data.map((c) => (
                            <h1 key={c._id} className='text-darkblue font-medium'>Total Categories : {c.category}</h1>
                        ))} */}
                            </div>
                        </div>
                        <div className=' w-full  p-10 '>
                            <table className=' w-full  '>
                                <thead className='bg-darkblue text-heading '>
                                    <tr className='flex justify-between mx-10'>
                                        <td className=''>Sr no</td>
                                        {/* <td className=''>Category ID</td> */}
                                        <td className=''> Category Name</td>
                                        <td className=''>Action</td>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {categories?.map((c, index) => (

                                        <>
                                            <tr className='flex justify-between mx-10 mr-2' >
                                                <td>{index + 1}</td>
                                                {/* <td key={c._id}>{c._id}</td> */}
                                                <td >{c.catName}</td>

                                                <td className='flex gap-2'>
                                                    <button className='bg-gray-900 text-white rounded-md text-[12px] px-1'
                                                        onClick={() => { setVisible(true); setUpdatedName(c.catName); setSelected(c) }}><UilEditAlt /></button>
                                                    <button className='bg-gray-900 text-white rounded-md text-[12px] px-1' onClick={() => {
                                                        handleDelete(c._id);
                                                    }}><UilTrashAlt /></button>
                                                    {/* <button className='bg-gray-900 text-white rounded-md text-[12px] px-1'><UilEye/></button> */}
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>

                            </table>
                            <Modal
                                onCancel={() => setVisible(false)}
                                footer={null}
                                open={visible}
                            >
                                <CategoryForm
                                    value={updatedcatName}
                                    setValue={setUpdatedName}
                                    handleSubmit={handleUpdate}
                                />
                            </Modal>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ViewCategory;
