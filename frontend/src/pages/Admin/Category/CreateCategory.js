import React, { useState } from 'react'
import axios from "axios";
import CategoryForm from "../../../components/Form/CategoryForm"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../../components/Layout/Layout';
import AdminSd from '../../../components/Layout/AdminSd';
import { UilEye, UilCreateDashboard } from '@iconscout/react-unicons';
import { NavLink } from 'react-router-dom';

export default function CreateCategory() {
  const [catName, setName] = useState("");

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/category/add_category", {
        catName,
      });
      if (data?.success) {
        toast.success(`${catName} category is created`);
        //getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Category Already exist");
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
            <CategoryForm handleSubmit={handleSubmit}
              value={catName}
              setValue={setName} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
