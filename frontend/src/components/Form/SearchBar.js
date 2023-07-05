import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { useSearch } from "../../context/search";

const SearchBar = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    // const [values, setValues] = useSearch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/search/${keyword}`);
            // setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = async (e) => {
        const value = e.target.value;
        setKeyword(value);
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/search/${value}`);
            setResults(data);

        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form role="search" onSubmit={handleSubmit}>
                <div className="relative mb-5 flex w-full flex-wrap items-stretch group:">
                    <input
                        id="inputbar"
                        type="search"
                        className="relative m-0 -mr-0.5 block w-40 min-w-0 flex-auto group-hover:bg-red-900 rounded-l border-solid border-2 border-white bg-transparent px-2 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none focus:z-[3] transition-all duration-300"
                        placeholder="Search..."
                        aria-label="Search"
                        aria-describedby="button-addon1"
                        value={keyword}
                        onChange={handleChange}
                    />

                    <button
                        className="relative z-[2]  flex items-center rounded-r bg-primary px-8 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg bg-white focus:shadow-xl focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg "
                        type="submit"
                        id="button-addon1"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="#7570ff"
                            className="h-6 w-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </form>
            {results.length > 0 && keyword && (<>
                <div className="w-7 h-7 bg-white rotate-45 top-[4rem] left-[26rem] absolute z-10"></div>
                <div className="gap-5 w-96 grid grid-cols-7 p-1 px-5 py-5 bg-white shadow-2xl rounded-sm z-50 top-[4.8rem] absolute">
                    <div className="col-span-2 h-[calc(100vh-200px)] overflow-y-auto">
                        <p className="text-sm text-blue-950 font-medium">CATEGORY</p>
                        <hr />
                        <div className="grid rows-flow-dense py-2">
                            {results.map((result) => (
                                <a href={`/search/category/${result.category._id}`}>
                                    <div key={result.id} className="">
                                        <p className="text-gray-800 font-semibold ml-1">{result.category.catName}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-5 h-[calc(100vh-200px)] overflow-y-auto">
                        <p className="text-sm text-blue-950 font-medium">PRODUCTS</p>
                        <hr />
                        <div className="grid grid-cols-2 rows-flow-dense py-2 gap-5">
                            {results.map((result) => (
                                <Link to={`/product/${result.slug}`}>
                                    <div key={result.id} className="">
                                        <img className="w-20" src={`http://localhost:8000/api/v1/product-photo/${result._id}`} alt={result.title} />
                                        <p className="text-gray-800 font-bold ml-5">{result.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </>
            )}
        </div>
    );
};

export default SearchBar;
{/* {results.map((result) => (
                        <div key={result.id}>
                            <p className="">{result.title}</p>
                        </div>
                    ))} */}