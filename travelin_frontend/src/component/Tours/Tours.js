import React, { useEffect, useState } from 'react'
import './tours.css'
import Shape8 from '../images/shape8.png'
import Background from '../images/bg1.jpg'

import SecBg1 from '../images/section-bg1.png'
import { IoLocationOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import axios from 'axios'

export default function Tours() {
    const Sectionbg = {
        background: `url(${SecBg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    const Bg1 = {
        background: `url(${Background})`,
        backgroundSize: 'cover',
    }
    const Shapes8 = {
        background: `url(${Shape8})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    const [data, setData] = useState([])
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [destination, setDestination] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuraction] = useState("")
    const [price, setPrice] = useState("")


    const [selectedTypes, setSelectedTypes] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        showDetail()
        fetchPackagesByTypes()
    }, [selectedTypes])

    function showDetail() {
        fetch("http://localhost:2000/api/package/getPackage")
            .then((result) => result.json())
            .then((resp) => {
                setData(resp)
                setId(resp[0].id)
                setName(resp[1].name)
                setImage(resp[2].image)
                setDestination(resp[3].destination)
                setDescription(resp[4].description)
                setDuraction(resp[5].duration)
                setPrice(resp[6].description)
            }).catch((error) => {
                console.error("Error fetching data:", error);
            })
    }
    function getById(id) {
        fetch(`http://localhost:2000/api/package/getPackageById/${id}`, {
            method: 'get'
        }).then((result) => {
            console.log(result)
            result.json().then((resp) => {
                showDetail()
            })
        })
    }
    function getByIdAndNavigate(id) {
        getById(id);
        // navigate(`/single/${id}`);
    }
    const fetchPackagesByTypes = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/api/package/getPackageByTag/${selectedTypes}`, {
                params: { types: selectedTypes.join(',') },
            });
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const handleCheckboxChange = (e) => {
        const type = e.target.value;
        if (e.target.checked) {
            setSelectedTypes([...selectedTypes, type])
        } else {
            setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type))
            console.log(setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type)))
        }
    }



    return (
        <div>
            {/* BreadCrumb Starts */}
            <section
                className="breadcrumb-main pb-20 pt-14"
                style={Bg1}
            >
                <div
                    className="section-shape section-shape1 top-inherit bottom-0"
                    style={Shapes8}
                />
                <div className="breadcrumb-outer">
                    <div className="container">
                        <div className="breadcrumb-content text-center">
                            <h1 className="mb-3 fw-boldx fw-bold" >Tour List</h1>
                            <nav aria-label="breadcrumb" className="d-block">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <NavLink to="/" >Home</NavLink>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Tour Lists
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="dot-overlay" />
            </section>
            {/* BreadCrumb Ends */}

            {/* top Destination starts */}
            <section className="trending pt-6 pb-0 bg-lgrey">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-lg-8">
                            <div className="list-results d-flex align-items-center justify-content-between">
                                <div className="list-results-sort">
                                    <p className="m-0">Showing 1-5 of 80 results</p>
                                </div>
                                <div className="click-menu d-flex align-items-center justify-content-between">
                                </div>
                            </div>
                            <div className="destination-list">
                                {
                                    data.map((item) =>
                                        <div className="trend-full bg-white rounded box-shadow overflow-hidden p-4 mb-4">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-3">
                                                    <div className="trend-item2 rounded">
                                                        <a  >
                                                            {/* <img src={`http://localhost:2000/${item.imageUrl}`} /> */}
                                                            {item.imageUrl && <img  src={item.imageUrl} alt="Uploaded" />}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-lg-5 col-md-6">
                                                    <div className="trend-content position-relative text-md-start text-center">
                                                        <small>{item.duration}</small>
                                                        <h3 className="mb-1">
                                                            <a >
                                                                {item.name}
                                                            </a>
                                                        </h3>
                                                        <h6 className="theme mb-0">
                                                            <i><IoLocationOutline /></i> {item.destination}
                                                        </h6>
                                                        <p className="mt-4 mb-0">
                                                            {item.description}  <br />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-3">
                                                    <div className="trend-content text-md-end text-center">
                                                        <div className="trend-price my-2">
                                                            <h3 className="mb-0">{item.price}</h3>
                                                            <small>Per Adult</small>
                                                        </div>
                                                        <NavLink to={`/packageDetail/${item._id}`} onClick={() => getByIdAndNavigate(item._id)} className="nir-btn">
                                                            View Detail
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }


                                <div className="text-center">
                                    <a href="#" className="nir-btn">
                                        Load More <i className="fa fa-long-arrow-alt-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 pe-lg-4">
                            <div className="sidebar-sticky">
                                <div className="list-sidebar">
                                    <div className="sidebar-item mb-4">
                                        <h3 className="">Categories Type</h3>
                                        <ul className="sidebar-category1">
                                            <li>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked=""
                                                    value="Historical"
                                                    checked={selectedTypes.includes('Historical')}
                                                    onChange={handleCheckboxChange}
                                                /> Historical Tours

                                            </li>
                                            <li>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked=""
                                                    value="Beach"
                                                    checked={selectedTypes.includes('Beach')}
                                                    onChange={handleCheckboxChange}
                                                /> Beach Holidays
                                            </li>
                                            <li>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked=""
                                                    value="Honeymoon"
                                                    checked={selectedTypes.includes('Honeymoon')}
                                                    onChange={handleCheckboxChange}
                                                /> Honeymoon Tours
                                                {/* <span className="float-end">35</span> */}
                                            </li>
                                            <li>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked=""
                                                    value="Road"
                                                    checked={selectedTypes.includes('Road')}
                                                    onChange={handleCheckboxChange}
                                                /> Road Trips
                                                {/* <span className="float-end">41</span> */}
                                            </li>
                                            <li>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked=""
                                                    value="Traking"
                                                    checked={selectedTypes.includes('Traking')}
                                                    onChange={handleCheckboxChange}
                                                /> Traking Tours
                                                {/* <span className="float-end">11</span> */}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sidebar-item mb-4">
                                        {/* <h3 className="">Duration Type</h3>
                                        <ul className="sidebar-category1">
                                            <li>
                                                <input type="checkbox" /> 3 to 6 Day
                                                <span className="float-end">22</span>
                                            </li>
                                            <li>
                                                <input type="checkbox" /> 8 to 10 hour
                                                <span className="float-end">35</span>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* top Destination ends */}


            {/* Discount action starts */}
            <section className="discount-action pt-0" style={Sectionbg} >
                <div className="container">
                    <div className="call-banner rounded pt-10 pb-14">
                        <div className="call-banner-inner w-75 mx-auto text-center px-5">
                            <div className="trend-content-main">
                                <div className="trend-content mb-5 pb-2 px-5">
                                    <h5 className="mb-1 theme">Love Where Your're Going</h5>
                                    <h2>
                                        <a href="">
                                            Explore Your Life,{" "}
                                            <span className="theme1"> Travel Where You Want!</span>
                                        </a>
                                    </h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                                <div className="video-button text-center position-relative">
                                    <div className="call-button text-center">
                                        <button
                                            type="button"
                                            className="play-btn js-video-button"
                                            data-video-id={152879427}
                                            data-channel="vimeo"
                                        >
                                            <i className="fa fa-play bg-blue" />
                                        </button>
                                    </div>
                                    <div className="video-figure" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="white-overlay" />
                <div className="white-overlay" />
            </section>
            {/* Discount action Ends */}


        </div>
    )
}
