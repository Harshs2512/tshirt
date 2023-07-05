import { React, useEffect, useState } from 'react'
import UserSd from '../../components/Layout/UserSd';
import Layout from '../../components/Layout/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';




const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const userId = auth.user && auth.user._id
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v1/myorders/${userId}`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(orders)

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  useEffect(() => {
    if (auth.user && !auth.user) {
      navigate('/login');
    }
    else {
      navigate('/account/orders');
    }
    // ProfileData();
  }, [auth.user]);

  return (
    <Layout title={"your orders"}>
      <div className="pt-20">
        <div className='grid grid-cols-7'>
          <div className='col-span-2'>
            <UserSd />
          </div>
          <div className='col-span-5 py-1'>
            <h1 className='font-bold text-2xl text-center text-stone-700 capitalize'>{auth.user && auth.user.fname} Your Orders</h1>
            <div className='p-3 my-1'>
              <div className='grid grid-flow-row gap-6'>
                {orders && orders.map((p) => (

                  <div className='grid grid-cols-5 gap-2 bg-gray-100 shadow-lg border border-gray-400 p-3 rounded-md'>
                    <div className='w-20 col-span-1'>
                      {p.products.map((photo) => (
                        <img src={`http://localhost:8000/api/v1/product-photo/${photo._id}`} alt="(test)" className='mb-6' />
                      ))}
                    </div>
                    <div className='col-span-1'>
                      {p.products.map((photo) => (
                        <div className='mb-4 p-1 rounded border border-gray-300'>
                          <p className='font-medium text-sm'>{photo && photo.title}</p>
                          {/* <p className='font-medium text-sm text-gray-400 mt-3'>{photo && photo.category.catName}</p> */}
                          <p className='font-medium text-sm mt-2 text-gray-600'>Color: {photo && photo.color}  <span className='ml-4'>Size: {photo && photo.size}</span></p>
                          <p className='font-medium text-sm mt-2 text-gray-600'>Quantity: {photo && photo.quantity}</p>
                        </div>
                      ))}
                    </div>
                    <div className='col-span-1 text-center'>
                      <p className='font-semibold text-sm'><span>&#x20B9;</span>{p.payment}</p>
                    </div>
                    <div className='col-span-2'>
                      <div className='flex'>
                        {p.status === 'Under Process' ? <span className="inline-block h-3 w-3 rounded-full bg-gray-500 mt-2 mr-3" /> : p.status === 'Processing' ? <span className="inline-block h-3 w-3 rounded-full bg-yellow-500 mt-2 mr-3" /> :  p.status === 'Shipped' ? <span className="inline-block h-3 w-3 rounded-full bg-yellow-500 mt-2 mr-3" /> :  p.status === 'Deliverd' ? <span className="inline-block h-3 w-3 rounded-full bg-green-500 mt-2 mr-3" /> : p.status === 'cancel' ? <span className="inline-block h-3 w-3 rounded-full bg-red-500 mt-2 mr-3" /> : ''}
                        <p className='font-bold text-md'>Order is <span className='capitalize'>{p.status}</span></p>
                      </div>
                      <p className='text-xs mt-3'>Your Order is {p.status === 'Under Process' ? 'Under Process please wait for further process' : p.status === 'Processing' ? 'Processing please wait for further process' :  p.status === 'Shipped' ? 'Shipped please wait for further process' :  p.status === 'Deliverd' ? 'Deliverd' : p.status === 'cancel' ? 'Cencel' : ''} </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders
