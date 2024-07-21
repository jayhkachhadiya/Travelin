import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import Dest17 from '../images/destination17.jpg'
import Background from '../images/bg1.jpg'
import Shape8 from '../images/shape8.png'

import SecBg1 from '../images/section-bg1.png'
import { handleClick } from '../tosti'
import { ToastContainer } from 'react-toastify'


export default function Booking() {
    const Bg1 = {
        background: `url(${Background})`,
        backgroundSize: 'cover'
    }
    const Shapes8 = {
        background: `url(${Shape8})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    const D17 = {
        background: `url(${Dest17})`,
        backgroundSize: 'cover'
    }
    const Sectionbg = {
        background: `url(${SecBg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    const [formData, setFormData] = useState({
        fullname: '',
        mobile: '',
        gender: '',
        age: '',
        email: '',
        bordingPoint: 'surat',
        members: []
    });

    const { id } = useParams()


    const token = localStorage.getItem('token')
    function addBookDetail(e) {
        e.preventDefault()
        console.log(formData)
        fetch(`http://localhost:2000/api/booking/insertBookDetail/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp)
                setFormData.fullname = ''
                if(resp.status===200){

                    handleClick()
                }
                // formData("")
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
        })
    }
    const handleInputChange = (field, value, index) => {
        if (index === undefined) {
            setFormData({ ...formData, [field]: value });
        } else {
            const updatedMembers = [...formData.members];
            updatedMembers[index] = { ...updatedMembers[index], [field]: value };
            setFormData({ ...formData, members: updatedMembers });
        }
    };

    const handleAddMember = () => {
        setFormData((prevData) => ({
            ...prevData,
            members: [...prevData.members, { pfullname: '', pmobile: '', pgender: '', page: '', }]
        }));
    };
    const price = localStorage.getItem('price')
    const peopleCount = localStorage.getItem("peopleCount")

    const amount = price * peopleCount

    async function checkOutHandler(amount) {
        const { data: { key } } = await axios.get("http://localhost:2000/api/payment/getKey")

        const { data: { order } } = await axios.post("http://localhost:2000/api/payment/createOrder", {
            amount
        })

        const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "Travelin Payment ",
            description: "Travelin Payment",
            image: "https://i.pinimg.com/736x/2f/a2/32/2fa2321cb1703d6eef32410774156fed.jpg",
            order_id: order.id,
            callback_url: "http://localhost:2000/api/payment/paymentVerification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#029e9d"
            }
        };
        var razor = new window.Razorpay(options);
        // razorpayObject.on('payment.failed', function (response) {
        //     alert("Payment Failed");
        // });
        razor.open();
    }

    const renderMemberFields = () => {
        return formData.members.map((member, index) => (
            <div key={index}>
                {/* <label>{`Member ${index + 1}:`}</label> */}
                <div className='row'>
                    <div className="col-md-6">
                        <div className="form-group mb-2">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={member.pfullname}
                                placeholder='Full Name'
                                onChange={(e) => handleInputChange('pfullname', e.target.value, index)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-2">
                            <label>Phone:</label>
                            <input
                                type="text"
                                value={member.pmobile}
                                placeholder='Phone '
                                onChange={(e) => handleInputChange('pmobile', e.target.value, index)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label>Gender</label>
                            <div className="input-box">
                                <select className="niceSelect" value={member.pgender} onChange={(e) => handleInputChange('pgender', e.target.value, index)}>
                                    <option value={0}>Select Gender</option>
                                    <option value={1} >Male</option>
                                    <option value={2}>Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group mb-2">
                            <label>Age:</label>
                            <input
                                type="text"
                                value={member.page}
                                placeholder='Age'
                                onChange={(e) => handleInputChange('page', e.target.value, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        ));
    };




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
                            <h1 className="mb-3">Booking</h1>
                            <nav aria-label="breadcrumb" className="d-block">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <NavLink to="/single">Tour Schedule</NavLink>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Booking
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
                    <div className="row">
                        <div className="col-lg-8 mb-4">
                            <div className="cc">
                                <div className="booking-box">
                                    <div className="customer-information mb-4">
                                        <h3 className="border-b pb-2 mb-2">Traveller Information</h3>
                                        <form className="mb-2">
                                            <h5>Let us know who you are</h5>
                                        </form>
                                    </div>
                                    <div>
                                        <form className='pay-form'>
                                            <div className='row'>
                                                <div >
                                                    <div className='row'>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <label>Name:</label>
                                                                <input
                                                                    type="text"
                                                                    value={formData.name}
                                                                    placeholder='Full Name'
                                                                    onChange={(e) => handleInputChange('fullname', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <label>Phone:</label>
                                                                <input
                                                                    type="text"
                                                                    value={formData.mobile}
                                                                    placeholder='Phone '
                                                                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-sm-6">
                                                            <div className="form-group">
                                                                <label>Gender</label>
                                                                <div className="input-box">
                                                                    <select className="niceSelect" value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)}>
                                                                        <option value={0}>Select Gender</option>
                                                                        <option value={"male"} >Male</option>
                                                                        <option value={"female"}>Female</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-sm-6">
                                                            <div className="form-group mb-2">
                                                                <label>Age:</label>
                                                                <input
                                                                    type="text"
                                                                    value={formData.age}
                                                                    placeholder='Age'
                                                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='row'>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <div>
                                                                    <label>Email:</label>
                                                                    <input
                                                                        type="email"
                                                                        value={formData.email}
                                                                        placeholder=' Enter email '
                                                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-sm-12">
                                                            <div className="form-group mb-2">
                                                                <label>Bording-Point</label>
                                                                <div className="input-box" onChange={(e) => handleInputChange('bordingPoint', e.target.value)}>
                                                                    <select className="niceSelect">
                                                                        <option value={"surat"}>Surat</option>
                                                                        <option value={"Ahemedabad"}>Ahemedabad</option>
                                                                        <option value={"Mumbai"}>Mumbai</option>
                                                                        <option value={"Pune"}>Pune</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {renderMemberFields()}

                                                </div>
                                            </div>
                                            <button type="button" onClick={handleAddMember} className="nir-btn">
                                                Add Member
                                            </button>

                                            <div className=' d-flex align-items-end flex-column ' >
                                                <button type="submit" className="nir-btn" onClick={addBookDetail}>
                                                    Saved detail
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                    <div className="customer-information mb-4 d-flex align-items-center bg-grey rounded p-4 mt-4">
                                        <i className="fa fa-grin-wink rounded fs-1 bg-theme white p-3 px-4" />
                                        <div className="customer-info ps-4 ">
                                            <h6 className="mb-1">Good To Know:</h6>
                                            <small>Cancellation is not permitted with this package.</small>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4 ps-ld-4">
                            <div className="sidebar-sticky">
                                <div className="sidebar-item bg-white rounded box-shadow overflow-hidden p-3 mb-4">
                                    <h4>Your Booking Details</h4>
                                    {/* <div className="trend-check">
                                        <p className="mb-0">You Selected:</p>
                                        <h6 className="mb-0">
                                            Superior Double Rooms{" "}
                                            <span className="float-end fw-normal">1 room, 3 adults</span>{" "}
                                        </h6>
                                        <small>
                                            <NavLink to="/tours" className="theme text-decoration-underline">
                                                Change your selection
                                            </NavLink>
                                        </small>
                                    </div> */}
                                </div>
                                <div className="sidebar-item bg-white rounded box-shadow overflow-hidden p-3 mb-4">
                                    <h4>Your Price Summary</h4>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><s> Superior Twin</s></td>
                                                <td className="theme2"> <s>500.00</s></td>
                                            </tr>
                                            <tr>
                                                <td>Per Person</td>
                                                <td className="theme2">{price}</td>
                                            </tr>
                                            <tr>
                                                <td>Number of Travellers</td>
                                                <td className="theme2">{peopleCount}</td>
                                            </tr>
                                            <tr>
                                                <td>Tax &amp; Fee</td>
                                                <td className="theme2">No Tax</td>
                                            </tr>
                                            <tr>
                                                <td>Booking Fee</td>
                                                <td className="theme2">Free</td>
                                            </tr>

                                        </tbody>
                                        <tfoot className="bg-title">
                                            <tr>
                                                <th className="font-weight-bold white">Amount</th>
                                                <th className="font-weight-bold white">${price * peopleCount}</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="sidebar-item bg-white rounded box-shadow overflow-hidden p-3 mb-4 mt-4">
                                    <h4>Your Journey :)</h4>
                                    <p className="mb-0">
                                        A little step may be the begging of a great journey
                                        {/* <span className="float-end">00.00</span> */}
                                    </p>
                                </div>
                                <div className=' d-flex align-items-end flex-column ' >
                                    <button type="submit" className="nir-btn" onClick={() => checkOutHandler(amount)}>
                                        Pay Now
                                    </button>
                                </div>

                                {/* <div className="sidebar-item bg-white rounded box-shadow overflow-hidden p-3">
                                    <h4>Do you have a promo code?</h4>
                                    <input type="text" name="" />
                                    <a href="#" className="nir-btn-black mt-2">
                                        Apply
                                    </a>
                                </div> */}
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
                <ToastContainer />
            </section>
            {/* Discount action Ends */}
        </div>
    )
}
