import { PaymentProvider, usePayment } from '../../context/RazorpayContext'
import React, { useState, useEffect } from 'react';
import { UilChart, UilHeartAlt, UilShoppingCart, UilRedo, UilDropbox, UilTruck, UilProcess } from '@iconscout/react-unicons';
import Layout from '../../components/Layout/Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useCart } from '../../context/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginimg from './Login.png'
import cartimg from './cart.webp'
import { useAuth } from '../../context/auth';
import Modal from "react-modal";


const Cart = () => {
    const params = useParams();
    const [cart, setCart] = useCart();
    const [quantity, setQuantity] = useState()
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [product, setProduct] = useState();
    const [coupon, setCoupon] = useState();
    const [address, setAddress] = useState();
    const [couponCheck, setCouponCheck] = useState(false);
    const currentDate = new Date();
    const [payment, setPayment] = useState('');
    const [orderID, setOrderID] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const [auth, setAuth] = useAuth(); // Loading state
    const [errors, setErrors] = useState({});
    const [isOpen, setIsopen] = useState(false)
    const [pincode, setPincode] = useState('')
    const [building, setBuilding] = useState('')
    const [city, setCity] = useState('')
    const [mystate, setMystate] = useState('')
    const [landmark, setLandmark] = useState('')
    const [locality, setLocality] = useState('')
    const [country, setCountry] = useState('India')
    const [response, setResponse] = useState()
    const [amount, setAmount] = useState()
    const [newquantity, setNewquantity] = useState()
    const [newcategory, setNewcategory] = useState()
    const [newtitle, setNewtitle] = useState()
    const [newcolor, setNewcolor] = useState()
    const [newsize, setNewsize] = useState()
    const [newid, setNewid] = useState()

    const user = auth.user
    const navigate = useNavigate();
    useEffect(() => {
        const updatedQuantities = cart.map((item) => item.quantity); // Collect the quantities from the cart
        setQuantity(Number(updatedQuantities)); // Update the state once
    }, [cart]);

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

    const month = currentDate.toLocaleDateString(undefined, { month: 'long' });
    let d = currentDate.toLocaleDateString(undefined, { day: 'numeric' });
    let date = Number(d) + 10;
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    };
    const increaseQuantity = () => {
        // const updatedQuantities = cart.map((item) => item.quantity);
        setQuantity(quantity + 1);
    };

    const handleCoupon = () => {
        console.log(coupon)
        if (coupon === 'Harsh2512') {
            setCouponCheck(true)
            console.log('Ok')
        }
        else {
            setCouponCheck(false)
            console.log('Ok')
        }
    };

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/v1/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    // Calculate subtotal
    const calculateCarttotal = () => {
        let subtotal = 0;
        cart.forEach((p) => {
            subtotal += p.selling_price * quantity;
        });
        return subtotal;
    };

    // Calculate GST
    const calculateGST = () => {
        const subtotal = calculateCarttotal();
        const gstPercentage = 18; // Assuming 18% GST
        const gstAmount = (subtotal * gstPercentage) / 100;
        return gstAmount;
    };

    // Calculate GST
    const calculateSubtotal = () => {
        const carttotal = calculateCarttotal();
        const gst = calculateGST();
        const subtotal = Math.floor(carttotal + gst)
        return subtotal;
    };
    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            toast.success("Item Removed")
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    const createRazorpayOrder = async () => {
        try {
            setLoading(true)
            // Make an API call to your server to create a Razorpay order
            const { data: { key } } = await axios.get('http://localhost:8000/api/v1/getkey')
            const response = await axios.post('http://localhost:8000/api/v1/payment/create', {
                amount: calculateSubtotal(),
            });
            setResponse(response.data)
            setPayment(response.data.order.amount)

            // Extract the order ID from the response
            const order_id = response.data.order.id;

            // Set the order ID in state
            setOrderID(order_id);
            if (!response.data.order) {
                alert("error");
                return
            }
            else {
                setLoading(false)
                let options = {
                    key,
                    currency: response.data.order.currency,
                    amount: response.data.order.amount,
                    orderID,
                    name: auth.user.fname,
                    description: "Thank you for Order",
                    handler: async function (response) {
                        makeOrder(response);
                    },
                    prefill: {
                        email: auth.user.email,
                        contact: auth.user.contact
                    },
                    notes: {
                        address: "My test"
                    },
                };
                let paymentObject = new window.Razorpay(options);
                paymentObject.open();
            }

        } catch (error) {
            console.log(error);
            console.log("hhfhfhffh")

        }
    };



    const makeOrder = async (response) => {
        console.log(newquantity)
        const updatedProduct = {
            category: newcategory,
            color: newcolor,
            quantity: Number(quantity),
            size: newsize,
            title: newtitle,
            _id: newid,
        }
        console.log(quantity)

        if (!updatedProduct._id) {
            // Handle the case where the _id is missing or undefined
            console.log("_id is required");
            return; // Stop further execution
          }
        const products = [updatedProduct]
        console.log(products)
        const payment = calculateSubtotal()
        try {
            console.log("caha")
            const response = await axios.post('http://localhost:8000/api/v1/order', {
                products,
                payment,
                user,
            });
            localStorage.removeItem("cart");
            setCart([]);

            navigate("/account/orders");
            toast.success("Payment Completed Successfully ");
        }
        catch (error) {
            console.log(error)
        }
    }

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

    useEffect(() => {
        cart.forEach((item) => {
            setNewcategory(item.category)
            setNewcolor(item.color)
            setNewquantity(quantity)
            setNewsize(item.size)
            setNewtitle(item.title)
            setNewid(item._id)
        });
    }, [cart]);
    console.log(quantity)
    return (
        <Layout title="cart-Page">
            <ToastContainer />
            <div className='pt-20 py-5'>
                {auth.user ? (<>
                    {cart.length ? (<>
                        <div className='grid grid-cols-7 mb-3'>
                            <div className=' cols-span-2'></div>
                            <div className='cols-span-1 uppercase font-bold text-xl text-right text-green-500'>my cart</div>
                            <div className='w-56 h-1 border-2 border-dashed border-black cols-span-1 mt-3 ml-3.5'> </div>
                            <div className={`cols-span-1 uppercase font-bold text-xl ml-[67px] ${auth.user.address ? 'text-green-500' : ''}`}>Adderess</div>
                            <div className='w-48 h-1 border-2 border-dashed border-black cols-span-1 mt-3'> </div>
                            <div className='cols-span-1 uppercase font-bold text-xl text-left ml-6'>payment</div>
                            <div className='cols-span-2'></div>
                        </div>
                        <hr />
                        <div className='grid grid-cols-6'>

                            <div className='col-span-4 p-10'>
                                {auth.user.address ?
                                    <div className='border border-gray-300 rounded-t-xl px-4 py-2 grid grid-cols-2 h-auto'>
                                        <div>
                                            <h1 className='text-base font-semibold text-blue-700 capitalize'>Deliver To : {auth.user.fname} {auth.user.lname}, {auth.user.address.pincode}
                                            </h1>
                                            <h1 className='text-sm text-gray-800'>{auth.user.address.building}</h1>
                                            <h1 className='text-sm text-gray-800'>{auth.user.address.landmark},  {auth.user.address.city} </h1>
                                            <h1 className='text-sm text-gray-800'>Estimated delivery  by 04 Jul</h1>
                                        </div>
                                        <button className='uppercase font-bold text-right text-blue-700'>
                                            <Link to='/account/address'>
                                                change
                                            </Link>
                                        </button>
                                    </div> : <div> </div>}

                                <div className='py-2'>
                                    {cart && cart.map((p) => (
                                        <div>
                                            <div className='flex p-3 border border-gray-300 mb-1'>
                                                <div className='flex'>
                                                    <img src={`http://localhost:8000/api/v1/product-photo/${p._id}`} className='w-36'></img>
                                                    <div className='ml-10'>
                                                        <div className='flex'>
                                                            <p className='text-stone-800 font-bold'>{p.title}</p>
                                                            <p className='text-blue-800 font-medium ml-[27rem]'>₹{p.selling_price} {quantity > 1 && <span>x {quantity}</span>}</p>
                                                        </div>
                                                        <p className='text-gray-400 font-semibold'>{p.category && p.category.catName}</p>
                                                        <p className='text-gray-400 font-semibold'>Color : {p.color}</p>
                                                        <p className='text-gray-400 font-semibold'>Size : {p.size}</p>
                                                        <div className='mt-1 flex'>
                                                            <div>
                                                                <h1 className='font-bold text-sm text-gray-600'>Quantity</h1>
                                                                <div className="flex items-center mt-1">
                                                                    <button
                                                                        className="px-2 rounded-l bg-gray-200 hover:bg-gray-300 text-lg"
                                                                        onClick={decreaseQuantity}>-
                                                                    </button>
                                                                    <span className="px-3 py-1 text-lg">{quantity}</span>
                                                                    <button
                                                                        className="px-2 rounded-r text-lg bg-gray-200 hover:bg-gray-300"
                                                                        onClick={increaseQuantity}>+
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <p className='text-gray-600 font-semibold text-xs mt-10 text-right ml-72'>Delivery Expected to {month} {date}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" class="text-red-500/50 hover:text-white border border-red-400/50 hover:bg-red-500/75 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-3 py-1 text-center mb-5" onClick={() => removeCartItem(p._id)}>Remove</button>
                                        </div>

                                    ))}
                                </div>
                                <div className='border border-gray-300 rounded-b-xl px-4 py-2 h-[9rem]'>
                                    <h1 className='text-lg font-bold text-blue-700 tracking-wider'>Apply coupon</h1>
                                    <div className='flex mt-3'>
                                        <input
                                            type="text"
                                            name="coupon"
                                            id="coupon"
                                            value={coupon}
                                            onChange={(e) => setCoupon(e.target.value)}
                                            class="uppercase py-2.5 px-3 w-full text-sm text-gray-600 bg-white rounded-lg border-2 border-dashed border-gray-500"
                                            placeholder="Apply Coupon Here"
                                        />
                                        <button type="button" class="text-blue-700 hover:text-blue-900 ml-40 border-2 border-blue-700 font-medium rounded-full text-sm px-10 py-1" onClick={handleCoupon}>APPLY</button>
                                    </div>
                                    {!couponCheck ? <h1 className='text-sm text-red-700 tracking-wider py-1 '>Coupon Not Availeble</h1> : ''}
                                </div>
                            </div>
                            <div className='col-span-2 p-10'>
                                <div className='border border-gray-300 rounded-t-xl px-4 py-2'>
                                    <h1 className='text-base font-semibold text-blue-700'>BILLING DETAILS</h1>
                                    <hr className='mt-3' />
                                    <div className='grid grid-cols-2 py-3'>
                                        <h1 className='text-base font-normal text-gray-700'>Cert Total</h1>
                                        <h1 className='text-base font-semibold text-gray-700 text-right'>₹{calculateCarttotal()}</h1>
                                    </div>
                                    <hr />
                                    <div className='grid grid-cols-2 py-3'>
                                        <h1 className='text-base font-normal text-gray-700'>GST</h1>
                                        <h1 className='text-base font-semibold text-gray-700 text-right'>₹{calculateGST()}</h1>
                                    </div>
                                    <hr />
                                    <div className='grid grid-cols-2 py-3'>
                                        <h1 className='text-base font-normal text-gray-700'>Cert Total</h1>
                                        <h1 className='text-base font-semibold text-gray-700 text-right'>₹{calculateSubtotal()}</h1>
                                    </div>
                                </div>
                                {auth.user.address ? <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-28 py-2.5 text-center mt-20 ml-3" onClick={createRazorpayOrder}>
                                    {loading ? ( // Render loading indicator when loading is true
                                        <div className="w-28">
                                            <Spin size="large" />
                                        </div>
                                    ) : (
                                        'PLACE ORDER'
                                    )}
                                </button> : <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-28 py-2.5 text-center mt-20 ml-3" onClick={setIsopen}>
                                    {loading ? ( // Render loading indicator when loading is true
                                        <div className="w-28">
                                            <Spin size="large" />
                                        </div>
                                    ) : (
                                        'ADD ADDRESS'
                                    )}
                                </button>
                                }
                            </div>
                        </div></>)
                        :
                        (
                            <div className='text-center items-center justify-center -mt-10'>
                                <img className='w-2/5 ml-[26rem]' src={cartimg} />
                                <h1 className='text-4xl font-bold tracking-wider'>Your Cart Is Empty!</h1>
                                <h1 className='text-lg text-gray-500 tracking-wider mt-3'>We are vaiting for you</h1>
                                <Link to='/collections'>
                                    <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg px-10 py-2.5 text-center mt-3 mx-auto">Shop Now</button>
                                </Link>
                            </div>
                        )
                    }
                </>) : (
                    <div className='text-center items-center justify-center -mt-10'>
                        <img className='w-96 ml-[28rem]' src={loginimg} />
                        <h1 className='text-4xl font-bold tracking-wider'>Please Login To Access Cart</h1>
                        <h1 className='text-lg text-gray-500 tracking-wider mt-3'>We are vaiting for you</h1>
                        <Link to='/login'>
                            <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg px-10 py-2.5 text-center mt-3 mx-auto">Login Now</button>
                        </Link>
                    </div>
                )}

            </div>

            {/* Add address model form */}
            {isOpen && <div
                id="defaultModal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative w-full max-w-2xl max-h-full mx-auto">
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
                                                        value={auth.user.fname + " " + auth.user.lname} disabled />
                                                </div>

                                                <div className="md:col-span-5">
                                                    <label htmlFor="email">Email Address</label>
                                                    <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={auth.user.email} placeholder="email@domain.com" disabled />
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
        </Layout>
    );
};

export default Cart;

