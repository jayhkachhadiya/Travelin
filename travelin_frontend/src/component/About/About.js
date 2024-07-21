import React from 'react'
import './about.css'

import Travel from '../images/travel.png'
import BgPattern from '../images/background_pattern.png'
import Shape8 from '../images/shape8.png'
import Background from '../images/bg1.jpg'
import { NavLink } from 'react-router-dom'
import TransImg from '../images/bg-trans.png'
import Dest6 from '../images/destination6.jpg'

import { IoLocationOutline } from "react-icons/io5";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaRegFolder } from "react-icons/fa";

export default function About() {

    const Bg1 = {
        background: `url(${Background})`,
        backgroundSize: 'cover',
    }
    const Shapes8 = {
        background: `url(${Shape8})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    const BgPt = {
        backgroundImage: `url(${BgPattern})`,
        backgroundPosition: 'Right'
    }
    const Trans = {
        backgroundImage: `url(${TransImg})`,
        backgroundPosition: 'left'
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
                            <h1 className="mb-3 fw-bold">About Us</h1>
                            <nav aria-label="breadcrumb" className="d-block">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <NavLink to="/">Home</NavLink>
                                    </li>
                                    <li className="breadcrumb-item active " aria-current="page">
                                        About Us
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="dot-overlay" />
            </section>
            {/* BreadCrumb Ends */}


            {/* about-us starts */}
            <section className="about-us pt-6" style={BgPt}>
                <div className="container">
                    <div className="about-image-box">
                        <div className="row d-flex align-items-center justify-content-between">
                            <div className="col-lg-6 ps-4">
                                <div className="about-content text-center text-lg-start">
                                    <h4 className="theme d-inline-block mb-0 fw-bold">Get To Know Us</h4>
                                    <h2 className="border-b mb-2 pb-1 fw-bold">
                                        Explore All Tour of the world with us.
                                    </h2>
                                    <p className="border-b mb-2 pb-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        <br />
                                        <br /> Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </p>
                                    <div className="about-listing">
                                        <ul className="d-flex justify-content-between">
                                            <li>
                                                <i className="icon-location-pin theme" /> Tour Guide
                                            </li>
                                            <li>
                                                <i className="icon-briefcase theme" /> Friendly Price
                                            </li>
                                            <li>
                                                <i className="icon-folder theme" /> Reliable Tour Package
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 pe-4">
                                <div className="about-image" style={{ animation: "none", background: "transparent" }}>
                                    <img src={Travel} alt="" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="white-overlay" />
            </section>
            {/* about-us ends */}


            {/* about-us starts */}
            <section className="about-us pt-0" style={Trans}>
                <div className="container">
                    <div className="about-image-box">
                        <div className="row d-flex align-items-center justify-content-between">
                            <div className="col-lg-6 mb-4 pe-4">
                                <div className="about-image1 overflow-hidden rounded">
                                    <img src={Dest6} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 ps-4">
                                <div className="about-content text-center text-lg-start mb-4">
                                    <h4 className="theme d-inline-block mb-0 fw-bold">Pefect Team</h4>
                                    <h2 className="mb-2 fw-bold">Our Experience Guides</h2>
                                    <p className="mb-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                        enim ad minim veniam, quis nostrud exercitation ullamco
                                    </p>
                                    <div className="about-listing border-b mb-2 pb-2">
                                        <h5 className="mb-1">
                                            <i className=" theme" ><IoLocationOutline /></i> Expert Team Guide
                                        </h5>
                                        <p className="mb-0">
                                            Enim ad minim veniam, quis nostrud exercitation ullamco
                                            laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                    <div className="about-listing border-b mb-2 pb-2">
                                        <h5 className="mb-1">
                                            <i className="icon-briefcase theme"><IoBriefcaseOutline /></i>  Correct Directions
                                        </h5>
                                        <p className="mb-0">
                                            Enim ad minim veniam, quis nostrud exercitation ullamco
                                            laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                    <div className="about-listing">
                                        <h5 className="mb-1">
                                            <i className="icon-folder theme" ><FaRegFolder/></i> Save Money &amp; Time
                                        </h5>
                                        <p className="mb-0">
                                            Enim ad minim veniam, quis nostrud exercitation ullamco
                                            laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="white-overlay" />
            </section>
            {/* about-us ends */}
        </div>
    )
}
