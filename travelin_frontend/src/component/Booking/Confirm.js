import React from 'react'
import './confirm.css'
import { NavLink } from 'react-router-dom'

import Background from '../images/bg1.jpg'
import Shape8 from '../images/shape8.png'
import SecBg1 from '../images/section-bg1.png'

export default function Confirm() {
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
                            <h1 className="mb-3 fw-bold" >Confirmation</h1>
                            <nav aria-label="breadcrumb" className="d-block">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item ">
                                        <NavLink to="/booking" >Booking</NavLink>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Confirmation
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="dot-overlay" />
            </section>
            {/* BreadCrumb Ends */}


            <>
                {/* top Destination starts */}
                <section className="trending pt-6 pb-0 bg-lgrey">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-xs-12 mb-4">
                                <div className="payment-book">
                                    <div className="booking-box">
                                        <div className="booking-box-title d-md-flex align-items-center bg-title p-4 mb-4 rounded text-md-start text-center">
                                            <i className="fa fa-check px-4 py-3 bg-white rounded title fs-5" />
                                            <div className="title-content ms-md-3">
                                                <h3 className="mb-1 white fw-bold">
                                                    Thank You. Your booking order is confirmed now.
                                                </h3>
                                                <p className="mb-0 white">
                                                    A confirmation email has been sent to your provided email
                                                    address.
                                                </p>
                                            </div>
                                        </div>
                                        {/* <div className="travellers-info mb-4">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Order Number</th>
                                                        <th>Date</th>
                                                        <th>Total</th>
                                                        <th>Payment Method</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="theme2">1012</td>
                                                        <td className="theme2">11/02/2022</td>
                                                        <td className="theme2">$550.00</td>
                                                        <td className="theme2">Bank Transfer</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="travellers-info mb-4">
                                            <h4>Traveler Information</h4>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Booking Number</td>
                                                        <td>5784-BD245</td>
                                                    </tr>
                                                    <tr>
                                                        <td>First Name</td>
                                                        <td>Jessica</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Last Name</td>
                                                        <td>Brown</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email Address</td>
                                                        <td>info#jessica.com</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Street Address and number</td>
                                                        <td>353 Third floor Avenue</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Town/City</td>
                                                        <td>Paris</td>
                                                    </tr>
                                                    <tr>
                                                        <td>ZIP Code</td>
                                                        <td>75800-875</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Country</td>
                                                        <td>France</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div> */}
                                        {/* <div className="booking-border mb-4">
                                            <h4 className="border-b pb-2 mb-2">Payment</h4>
                                            <p className="mb-0">
                                                This is the third time I've used Travelo Website and telling
                                                you the truth their services are always reliable and it ony
                                                takes few minutes to plan and finalize.
                                            </p>
                                            <a href="#">Payment is made by Credit Card via Paypal</a>
                                        </div> */}
                                        {/* <div className="booking-border mb-4">
                                            <h4 className="border-b pb-2 mb-2">View Booking Details</h4>
                                            <p className="mb-0">
                                                This is the third time I've used Travelo Website and telling
                                                you the truth their services are always reliable and it ony
                                                takes few minutes to plan and finalize.
                                            </p>
                                            <a href="/https://www.travel.com/booking-details">https://www.travel.com/booking-details</a>
                                        </div> */}
                                        {/* <div className="booking-border d-flex">
                                            <a href="#" className="nir-btn me-2">
                                                <i className="fa fa-print" /> Print
                                            </a>
                                            <a href="#" className="nir-btn-black">
                                                <i className="fa fa-envelope-open-text" /> Send To
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-xs-12 mb-4 ps-4">
                                <div className="sidebar-sticky">
                                    <div className="list-sidebar">
                                        <div className="sidebar-item bordernone bg-white rounded box-shadow overflow-hidden p-3 mb-4">
                                            <h4>Need Booking Help?</h4>
                                            <div className="sidebar-module-inner">
                                                <p className="mb-2">
                                                    Paid was hill sir high 24/7. For him precaution any
                                                    advantages dissimilar.
                                                </p>
                                                <ul className="help-list">
                                                    <li className="border-b pb-1 mb-1">
                                                        <span className="font-weight-bold">Hotline</span>: +475 15
                                                        123 21
                                                    </li>
                                                    <li className="border-b pb-1 mb-1">
                                                        <span className="font-weight-bold">Email</span>:
                                                        support@Yatriiworld.com
                                                    </li>
                                                    <li>
                                                        <span className="font-weight-bold">Livechat</span>:
                                                        Yatriiworld (Skype)
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* <div className="sidebar-item bg-white rounded box-shadow overflow-hidden p-3 mb-4">
                                            <h4>Why booking with us?</h4>
                                            <div className="sidebar-module-inner">
                                                <ul className="featured-list-sm">
                                                    <li className="border-b pb-2 mb-2">
                                                        <h6 className="mb-0">No Booking Charges</h6>
                                                        We don't charge you an extra fee for booking a hotel room
                                                        with us
                                                    </li>
                                                    <li className="border-b pb-2 mb-2">
                                                        <h6 className="mb-0">No Cancellation Sees</h6>
                                                        We don't charge you a cancellation or modification fee in
                                                        case plans change
                                                    </li>
                                                    <li className="border-b pb-2 mb-2">
                                                        <h6 className="mb-0">Instant Confirmation</h6>
                                                        Instant booking confirmation whether booking online or via
                                                        the telephone
                                                    </li>
                                                    <li>
                                                        <h6 className="mb-0">Flexible Booking</h6>
                                                        You can book up to a whole year in advance or right up
                                                        until the moment of your stay
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* top Destination ends */}
                {/* Discount action starts */}
                <section
                    className="discount-action pt-0"
                    style={Sectionbg}
                >
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
                    <div
                        className="section-shape  top-inherit bottom-0"
                        style={{ backgroundImage: "url(images/shape6.png)" }}
                    />
                </section>
                {/* Discount action Ends */}
            </>


        </div>
    )
}
