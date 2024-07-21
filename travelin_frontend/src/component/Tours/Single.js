import React, { useEffect, useState } from 'react'
import './single.css'
// import Accordion from 'react-bootstrap/Accordion';
import { NavLink } from 'react-router-dom'
// import Trend3 from '../images/trending3.jpg'
import Background from '../images/bg1.jpg'
import Shape8 from '../images/shape8.png'

import SecBg1 from '../images/section-bg1.png'
// import Dest7 from '../images/destination7.jpg'

import { useParams } from 'react-router-dom';

export default function Single() {
    const Bg1 = {
        background: `url(${Background})`,
        backgroundSize: 'cover'
    }
    const Shapes8 = {
        background: `url(${Shape8})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    const Sectionbg = {
        background: `url(${SecBg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: '100vh',
    }


    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [minAge, setMinAge] = useState("")
    const [maxPeople, setMaxPeople] = useState("")
    const [description, setDescription] = useState("")
    const [day, setDay] = useState("")
    const [price, setPrice] = useState("")
    const [date, setDate] = useState("")
    const [num, setNum] = useState("1")

    localStorage.setItem("peopleCount", num)
    const { id } = useParams();
    localStorage.setItem("packId", id)
    function getDetail() {
        fetch(`http://localhost:2000/api/package/getPackageById/${id}`, {
            method: 'get',
        }).then((result) => {
            result.json().then((resp) => {
                localStorage.setItem('price', resp.price)
                setData([resp])
                setName(resp[0].name)
                setImage(resp[1].image)
                setDescription(resp[2].longDescription)
                setDay(resp[3].day)
                setMaxPeople(resp[4].maxPeople)
                setMinAge(resp[5].minAge)
                setPrice(resp[6].price)
                setDate(resp[7].date)
            }).catch((e) => {
                console.log(e)
            })
        })
    }
    useEffect(() => {
        getDetail()
    }, [])

    const token = localStorage.getItem('token')
    function addInLocal() {
        if (token) {
            window.location.href = `/booking/${id}`
        } else {
            window.location.href = '/login'
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
                            <h1 className="mb-3">Tour Schedule</h1>
                            <nav aria-label="breadcrumb" className="d-block">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <NavLink to="/tours">Tours</NavLink>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Tour Schedule
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
            {
                data.map((item) =>
                    <section className="trending pt-6 pb-0 bg-lgrey">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="single-content">
                                        <div className="single-full-title border-b mb-2 pb-2">
                                            <div className="single-title">
                                                <h2 className="mb-1">{item.name}</h2>
                                                <div className="rating-main d-lg-flex align-items-center text-lg-start text-center">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="description-images mb-4 ">
                                            <div className="thumbnail-images position-relative">
                                                <div className="slider-store rounded overflow-hidden">
                                                    <div>
                                                        {/* <img src={`http://localhost:2000/${item.imageUrl}`} /> */}
                                                        {item.imageUrl && <img src={item.imageUrl} alt="Uploaded" />}
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                        <div className="description mb-2">
                                            <h4>Description</h4>
                                            <p>{item.description}</p>
                                            <p className="mb-0">
                                                {item.longDescription}
                                            </p>
                                        </div>
                                        <div className="tour-includes mb-4">
                                            <table >
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <i
                                                                className="fa fa-clock-o pink mr-1"
                                                                aria-hidden="true"
                                                            />{" "}
                                                            days:{item.day}
                                                        </td>
                                                        <td>
                                                            <i className="fa fa-group pink mr-1" aria-hidden="true" />{" "}
                                                            Max People : {item.maxPeople}
                                                        </td>

                                                        <td>
                                                            <i className="fa fa-user pink mr-1" aria-hidden="true" />{" "}
                                                            Min Age : {item.minAge}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 ps-lg-4">
                                    <div className="sidebar-sticky">
                                        <div className="list-sidebar">
                                            <div className="sidebar-item">
                                                <form className="form-content rounded overflow-hidden bg-title">
                                                    <h4 className="white text-center border-b pb-2">
                                                        MAKE A BOOKING
                                                    </h4>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                                <span className="white pb-1">Trip start Date :</span>
                                                                <h4 className="choosen-date white mb-0 border-0">
                                                                    <i className="fa fa-calendar" /> {item.date}{" "}
                                                                    <small className="d-flex justify-content-between fw-normal w-100 my-2">
                                                                        ({item.day} days){" "}

                                                                    </small>
                                                                </h4>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-12">
                                                            <div class="form-group mb-2">
                                                                <label class="white">No. Of People</label>
                                                                <div class="input-box">
                                                                    <i class="flaticon-add-user"></i>
                                                                    <select class="niceSelect" onChange={(e) => setNum(e.target.value)}>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                        <option value="5">6</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-group bg-white p-3 rounded mb-2">
                                                                <ul>

                                                                    <li className="d-block pb-1">
                                                                        Per person
                                                                        <span className="float-end  fw-bold"> {item.price}</span>
                                                                    </li>


                                                                    <li className="d-block pb-1">
                                                                        Other fees
                                                                        <span className="float-end  fw-bold">Free</span>
                                                                    </li>
                                                                    <li className="d-block border-t">
                                                                        <div className="pt-1">
                                                                            <span className="fw-bold">Total</span>
                                                                            <span className="float-end  fw-bold">
                                                                                {item.price}
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="d-block  pb-1">
                                                                        Note : Click instant book and add passanger detail

                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-group mb-0">
                                                            {/* to={`/booking/${item._id}`}  */}
                                                                <NavLink  onClick={addInLocal} className="nir-btn w-100 text-white">
                                                                    Instant Book
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="sidebar-item">
                                                <div className="map-box rounded p-5 text-center">
                                                    <i className="fa fa-map-marker fs-1 theme d-block mb-1" />
                                                    <a href="https://www.google.com/maps/">Show on Map</a>
                                                </div>
                                                <div className="location-rating mb-2 mt-2">
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-lg-2 col-md-2">
                                                            <span className="location-box bg-theme1 white p-3 rounded">
                                                                4.5
                                                            </span>
                                                        </div>
                                                        <div className="col-lg-10 col-md-10">
                                                            <p className="mb-0">Exceptional</p>
                                                            <span>Location rating score</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="location-features">
                                                    <ul>
                                                        <li className="mb-2">
                                                            <i className="fa fa-map-marker theme me-2" /> Better than
                                                            99% of properties in London
                                                        </li>
                                                        <li className="mb-2">
                                                            <i className="fa fa-map-marker theme me-2" /> Exceptional
                                                            Location - Inside city center
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-map-marker theme me-2" /> Popular
                                                            Neighbourhood
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
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
