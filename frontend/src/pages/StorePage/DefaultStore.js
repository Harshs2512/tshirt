import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UilHeartAlt } from '@iconscout/react-unicons'
import Layout from '../../components/Layout/Layout'
import { Checkbox, Radio } from 'antd'
import axios from 'axios'
import { Prices } from "./Price";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useWishlist } from '../../context/wishlist'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const DefaultStore = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isClosetheme, setIsClosetheme] = useState(false);
    const [isClosecolor, setIsClosecolor] = useState(false);
    const [isClosesize, setIsClosesize] = useState(false);
    const [isCloseprice, setIsCloseprice] = useState(false);
    const [products, setProducts] = useState();
    const [categories, setCategories] = useState('');
    const [checked, setChecked] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [radio, setRadio] = useState([]);
    const [filterList, setFilter1] = useState([]);
    const [filterCheck, setFilterCheck] = useState(false);
    const [wishlist, setWishlist] = useWishlist();
    const [liked, setLiked] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleClosetheme = () => {
        setIsClosetheme(!isClosetheme)
    };
    const handleClosecolor = () => {
        setIsClosecolor(!isClosecolor)
    }
    const handleClosesize = () => {
        setIsClosesize(!isClosesize)
    }
    const handleCloseprice = () => {
        setIsCloseprice(!isCloseprice)
    }

    //Products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/products");
            setProducts(data.products)
            setFilterCheck(true);
        }
        catch (error) {
            console.log(error)

        }
    };


    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/category/show_category/");
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);


    // filter by cat
    const handleFilter = (value, id, catName, c, isColor) => {
        let all = [...checked];
        let filter1 = [...filterList];

        if (isColor) {
            // Handle color checkboxes
            if (value) {
                all.push(id);
                filter1.push(catName);
                setSelectedColors([...selectedColors, c]);
            } else {
                all = all.filter((c) => c !== id);
                filter1 = filter1.filter((c) => c !== catName);
                setSelectedColors(selectedColors.filter((color) => color !== c));
            }
        } else {
            // Handle other filters
            if (value) {
                all.push(id);
                filter1.push(catName);
            } else {
                all = all.filter((c) => c !== id);
                filter1 = filter1.filter((c) => c !== catName);
            }
        }

        setChecked(all);
        setFilter1(filter1);
    };
    
    const handleSizeFilter = (value, id, sz, isSize) => {
        let all = [...checked];
        let filter1 = [...filterList];
        console.log(sz)

        if (isSize) {
            // Handle color checkboxes
            if (value) {
                all.push(id);
                filter1.push(sz);
                setSelectedSizes([...selectedSizes, sz]);
            } else {
                all = all.filter((c) => c !== id);
                filter1 = filter1.filter((c) => c !== sz);
                setSelectedSizes(selectedSizes.filter((s) => s !== sz));
            }
        } else {
            // Handle other filters
            if (value) {
                all.push(id);
                filter1.push(sz);
            } else {
                all = all.filter((c) => c !== id);
                filter1 = filter1.filter((c) => c !== size);
            }
        }

        setChecked(all);
        setFilter1(filter1);
    };

    useEffect(() => {
        if (checked.length === 0) {
            getAllProducts();
        } else {
            filterProduct();
        }
    }, [checked]);

    useEffect(() => {
        if (radio.length === 0) {
            getAllProducts();
        } else {
            filterProduct();
        }
        window.scrollTo(0, 0);
    }, [radio]);


    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("http://localhost:8000/api/v1/product-filters", {
                checked,
                radio,
                selectedColors,
                selectedSizes
            });
            setProducts(data?.products);
            setFilterCheck(false);
            console.log(products)

        } catch (error) {
            console.log(error);
        }
    };

    const removeSingleFilter = (filter) => {

        const updatedChecked = checked.splice(filter)
        setChecked(updatedChecked);
        const updatedFilter = filterList.filter((f) => f !== filter);
        setFilter1(updatedFilter);
        filterProduct();
    };

    const handleAddToWishlist = (p) => {
        setLiked(!liked)
        console.log(liked)
        setWishlist([...wishlist, p]);
        localStorage.setItem(
            "wishlist",
            JSON.stringify([...wishlist, p])
        );
        toast.success("Item Added to Wishlist");
    };

    const color = {
        colors: ['red', 'yellow']
    }
    const size = {
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    }

    return (
        <Layout title={"DefaultStore"}>
            <ToastContainer />
            <div className='grid grid-cols-7 pt-20 w-full z-10 px-5 fixed bg-white shadow-lg py-2'>
                <div className='col-span-2 grid grid-rows-2'>
                    <div>Home/Men/collections</div>
                    <div>(200) Products</div>
                </div>
                <div className='col-span-4 grid grid-cols-7'>
                    {filterList && filterList.map((f) => (
                        <div
                            className="[word-wrap: break-word] w-20 my-[5px] flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]"
                            key={f}
                        >
                            {f}
                            <button onClick={() => removeSingleFilter(f)}>
                                <span
                                    data-te-chip-close
                                    className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-3 w-3"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
                <div className='col-span-1'>
                    {/* Dropdown */}
                    <div className="relative" data-te-dropdown-ref>
                        <button
                            className="flex items-center whitespace-nowrap rounded bg-primary px-7 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                            type="button"
                            id="dropdownMenuButton1"
                            data-te-dropdown-toggle-ref
                            aria-expanded={isDropdownOpen}
                            onClick={handleDropdownToggle}
                        >
                            Categories
                            <span className="ml-2 w-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </button>
                        <ul
                            className={`absolute z-[1000] w-36 float-left m-0 list-none overflow-hidden rounded-lg border-none  bg-white bg-clip-padding text-left text-base shadow-lg ${isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-200 `}
                        >
                            {/* Dropdown menu options */}
                            {categories && categories.map((c) => (
                                <li>
                                    <Link to={`/search/category/${c.slug}`}
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-800 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:text-neutral-400"
                                        href="#">
                                        {c && c.catName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex py-36">
                {/* Sidenav */}
                <nav
                    id="sidenav-2"
                    className="fixed w-60 overflow-hidden translate-x-0 "
                    data-te-sidenav-init
                    data-te-sidenav-hidden="false"
                    data-te-sidenav-mode="side"
                    data-te-sidenav-content="#content"
                >
                    <div className='relative m-0 list-none px-[0.2rem] flex border-b-2 border-stone-300 bg-white'>
                        <h1 className='text-center mt-3 m-2 flex'>FILLTERS
                            {/* {filterList && filterList.map((f) => (
                                    <span className={`${f ? 'text-red-600' : 'bg-blue-400'}`}>.</span>
                                ))} */}
                        </h1>
                        <button class="bg-transparent hover:bg-purple-400 text-purple-700 font-semibold hover:text-white py-1 px-4 border border-purple-500 hover:border-transparent rounded ml-20 m-2" onClick={() => window.location.reload()}>
                            Clear
                        </button>
                    </div>
                    <div className="h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
                        <ul className="relative m-0 list-none bg-white">
                            {/* Sidebar links */}
                            <li className="relative border-b-2 border-stone-300 h-full">

                                <a
                                    className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-3 py-4 text-lg text-gray-900 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:text-inherit active:outline-none motion-reduce:transition-none "
                                    onClick={handleClosetheme}
                                >
                                    <span>Theme</span>


                                    <span className="ml-32 w-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </a>
                                <div className={`px-10 py-2 grid grid-flow-row gap-3 transition-[opacity,margin] duration-100 ${isClosetheme ? 'opacity-100' : 'opacity-0 max-h-0 pointer-events-none'}`}>
                                    {categories && categories.map((c) => (
                                        <Checkbox key={c._id}
                                            onChange={(e) => handleFilter(e.target.checked, c._id, c.catName,)} id='check'>
                                            {c.catName}
                                        </Checkbox>
                                    ))}
                                </div>
                            </li>
                            {/* More sidebar links */}
                            <li className="relative border-b-2 border-stone-300">
                                <a
                                    className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-3 py-4 text-lg text-gray-900 outline-none transition duration-300 ease-linear hover:bg-slate-100 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:text-inherit active:outline-none motion-reduce:transition-none"
                                    onClick={handleClosecolor}
                                >
                                    <span>Colors</span>
                                    <span className="ml-[132px] w-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </a>
                                <div className={`px-10 py-2 grid grid-flow-row gap-3 transition-[opacity,margin] duration-100 ${isClosecolor ? 'opacity-100' : 'opacity-0 max-h-0 pointer-events-none'}`}>
                                    {color &&
                                        color.colors.map((c) => (
                                            <Checkbox
                                                key={c}
                                                onChange={(e) =>
                                                    handleFilter(e.target.checked, c, c, c, true)
                                                }
                                                checked={selectedColors.includes(c)}
                                            >
                                                {c}
                                            </Checkbox>
                                        ))}
                                </div>
                            </li>
                            <li className="relative border-b-2 border-stone-300">
                                <a
                                    className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-3 py-4 text-lg text-gray-900 outline-none transition duration-300 ease-linear hover:bg-slate-100 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:text-inherit active:outline-none motion-reduce:transition-none"
                                    onClick={handleClosesize}
                                >
                                    <span>Size</span>
                                    <span className="ml-[150px] w-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </a>
                                <div className={`px-10 py-2 grid grid-flow-row gap-3 transition-[opacity,margin] duration-100 ${isClosesize ? 'opacity-100' : 'opacity-0 max-h-0 pointer-events-none'}`}>
                                    {size &&
                                        size.sizes.map((sz) => (
                                            <Checkbox
                                                key={sz}
                                                onChange={(e) =>
                                                    handleSizeFilter(e.target.checked, sz, sz, sz, true)
                                                }
                                                checked={selectedSizes.includes(sz)}
                                            >
                                                {sz}
                                            </Checkbox>
                                        ))}
                                </div>
                            </li>
                            <li className="relative border-b-2 border-stone-300">
                                <a
                                    className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-3 py-4 text-lg text-gray-900 outline-none transition duration-300 ease-linear hover:bg-slate-100 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:text-inherit active:outline-none motion-reduce:transition-none"
                                    onClick={handleCloseprice}
                                >
                                    <span>Price</span>
                                    <span className="ml-36 w-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </a>
                                <div className={`px-10 py-2 grid grid-flow-row gap-3 transition-[opacity,margin] duration-100 ${isCloseprice ? 'opacity-100' : 'opacity-0 max-h-0 pointer-events-none'}`}>
                                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                        {Prices?.map((p) => (
                                            <div key={p._id}>
                                                <Radio value={p.array}>{p.name}</Radio>
                                            </div>
                                        ))}
                                    </Radio.Group>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* Sidenav */}
                <div className="px-1 !pl-[260px] text-center" id="content">
                    {/* Toggler */}
                    <div className="flex text-start">
                        <div>
                            <div className='grid md:grid-cols-4 grid-cols-1 gap-3'>
                                {products && products.map((p) => (
                                    <div
                                        key={p._id} className="block bg-gray-100/50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] h-[24  rem]">
                                        <Link to={`/product/${p.slug}`}>
                                            <Link to='/collections'>
                                                <button disabled={!wishlist.find((item) => item._id === p._id) ? false : true} className="absolute rounded-full w-10 h-10 p-2 bg-gray-200/50 ml-48 mt-3 hover:bg-white duration-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                                                    onClick={() => { handleAddToWishlist(p) }}>
                                                    <UilHeartAlt className={`${wishlist.find((item) => item._id === p._id) ? 'text-red-500 animate-jump-in animate-delay-300 animate-once ' : 'text-gray-500'} `} />
                                                </button>
                                            </Link>
                                            <img
                                                className=""
                                                src={`http://localhost:8000/api/v1/product-photo/${p._id}`}
                                                alt="" />
                                            <div className="px-3 mt-1">
                                                <h5
                                                    className="mb-2 text-lg font-medium leading-tight text-neutral-700">
                                                    {p && p.title}
                                                </h5>
                                                <p className="mb-1 text-lg text-neutral-600">
                                                    {p && p.category.catName}
                                                </p>
                                                <hr />
                                            </div>
                                            <div className='flex px-3'>
                                                <p className="mb-2 text-base font-bold text-neutral-900">
                                                    ₹{p && p.selling_price}
                                                </p>
                                                <p className="mb-1 ml-8 font-bold text-base line-through text-red-500">
                                                    ₹{p && p.discounted_price}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}


export default DefaultStore;