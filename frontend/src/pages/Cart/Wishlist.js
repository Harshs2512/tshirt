import { PaymentProvider, usePayment } from '../../context/RazorpayContext'
import React, { useState, useEffect } from 'react';
import { UilTimes, UilHeartAlt, UilShoppingCart, UilRedo, UilDropbox, UilTruck, UilProcess } from '@iconscout/react-unicons';
import Layout from '../../components/Layout/Layout';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Select } from 'antd';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useWishlist } from '../../context/wishlist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cartimg from './cart.webp'
import { useCart } from '../../context/cart';
const { Option } = Select;

const WishlistPage = () => {
    const { Option } = Select
    const navigate = useNavigate()
    const params = useParams();
    const [sizeselect, setSizeselect] = useState();
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [wishlist, setWishlist] = useWishlist();
    const [product, setProduct] = useState();
    const [coupon, setCoupon] = useState();
    const [couponCheck, setCouponCheck] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [cart, setCart] = useCart();
    const [newquantity, setNewquantity] = useState()
    const [newcategory, setNewcategory] = useState()
    const [newtitle, setNewtitle] = useState()
    const [newcolor, setNewcolor] = useState()
    const [newsize, setNewsize] = useState(null, '.......')
    const [newid, setNewid] = useState()
    const [newselling_price, setNewsetSelli] = useState()
    const [newdescription, setNewdescription] = useState()
    const [newdicounted_price, setNewdicounted_price] = useState()

    console.log(wishlist)

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/v1/products');
            setProduct(data.products);
            // getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    //initalp details
    useEffect(() => {
        getProduct();
    }, []);

    //detele item
    const removeCartItem = (pid) => {
        try {
            let myWish = [...wishlist];
            let index = myWish.findIndex((item) => item._id === pid);
            myWish.splice(index, 1);
            setWishlist(myWish);
            toast.success("Item Removed")
            localStorage.setItem("wishlist", JSON.stringify(myWish));
        } catch (error) {
            console.log(error);
        }
    };

    const updatedProduct = {
        category: newcategory,
        color: newcolor,
        description: newdescription,
        discounted_price: newdicounted_price,
        selling_price: newselling_price,
        quantity: quantity,
        size: newsize,
        title: newtitle,
        _id: newid
    }

    console.log(updatedProduct)

    const handleAddToCart = () => {
        console.log("afdadadfasdads ")
        if (!newsize) {
            toast.error('Please select a size');
            return;
        }
        setCart([...cart, updatedProduct]);
        localStorage.setItem(
            "cart",
            JSON.stringify([...cart, updatedProduct])
        );
        toast.success("Item Added to cart");
        const updatedWishlist = wishlist.filter(item => item._id !== newid);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        setTimeout(() => {
            navigate('/cart');
        }, 100);

    };

    useEffect(() => {
        wishlist.forEach((item) => {
            setNewcategory(item.category)
            setNewcolor(item.color)
            setNewquantity(quantity)
            setNewsize(sizeselect)
            setNewtitle(item.title)
            setNewdescription(item.description)
            setNewsetSelli(item.selling_price)
            setNewdicounted_price(item.discounted_price)
            setNewid(item._id)
        });
    }, [cart]);

    return (
        <Layout title="wishlist-Page">
            <ToastContainer />
            <div className='pt-20 py-5'>
                {wishlist.length ? (
                    <div className='grid grid-cols-4 py-2 px-5 gap-x-10'>
                        {wishlist && wishlist.map((p) => (
                            <div>
                                <div className='border border-gray-300 mb-1 shadow-[0_4px_9px_-4px_#3b71ca]'>
                                    <button className="absolute rounded-full w-10 h-10 p-2 bg-gray-200/50 ml-56 mt-3 hover:bg-white duration-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                                        onClick={() => { removeCartItem(p._id) }}
                                    >
                                        <UilTimes />
                                    </button>
                                    <img src={`http://localhost:8000/api/v1/product-photo/${p._id}`} className='w-full h-auto'></img>
                                    <div className='p-2'>
                                        <div className='flex'>
                                            <p className='text-stone-800 font-bold'>{p.title}</p>
                                            <p className='text-blue-800 font-medium ml-40'>₹{p.selling_price}</p>
                                        </div>
                                        <p className='text-gray-400 font-semibold mb-1'>{p.category.catName}</p>
                                        <hr />
                                        <div className='mt-3 flex'>
                                            <div>
                                                <h1 className='font-bold text-sm text-gray-600 ml-2'>Quantity</h1>
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
                                            <div className='ml-20'>
                                                <h1 className='font-bold text-sm text-gray-600 mb-2'>Size</h1>
                                                <Select value={newsize === '.......' ? undefined : newsize} onChange={setNewsize} defaultValue={undefined} className='w-20'>
                                                    {p.size[0].split(',').map((size) => (
                                                        <Option key={size}>{size}</Option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <Link to='/cart'> */}
                                <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-20 py-2 text-center mt-3 ml-2"
                                    onClick={handleAddToCart}
                                >Move to Cart</button>
                                {/* </Link> */}
                            </div>
                        ))}
                    </div>
                )
                    :
                    (
                        <div className='text-center items-center justify-center -mt-10'>
                            <img className='w-2/5 ml-[26rem]' src={cartimg} />
                            <h1 className='text-4xl font-bold tracking-wider'>Your Wishlist Is Empty!</h1>
                            <h1 className='text-lg text-gray-500 tracking-wider mt-3'>We are vaiting for you</h1>
                            <Link to='/collections'>
                                <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg px-10 py-2.5 text-center mt-3 mx-auto">Shop Now</button>
                            </Link>
                        </div>
                    )
                }

            </div>
        </Layout>
    );
};

export default WishlistPage;

