import React, { useState } from 'react'
import './contact.css'
import { NavLink } from 'react-router-dom'

import Background from '../images/bg1.jpg'
import Shape8 from '../images/shape8.png'
import * as Yup from 'yup';
import { handleClick } from '../tosti'
import { ToastContainer, toast } from 'react-toastify';

export default function Contact() {
    const Bg1 = {
        background: `url(${Background})`,
        backgroundSize: 'cover',
    }
    const Shapes8 = {
        background: `url(${Shape8})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState({})

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('firstname is required'),
        lastname: Yup.string().required('lastname is required'),
        email: Yup.string().email("Invelid email").required("email is reqired"),
        phone: Yup.number().required("phone is required"),
        message: Yup.string().required("message is required")
    })

    function savedUser(e) {
        e.preventDefault()
        let data = { firstname, lastname, email, phone, message }

        validationSchema
            .validate(data, { abortEarly: false })
            .then(() => {
                console.log("form submited", data)
            }).catch((error) => {
                console.error('Validation error:', error.inner);
                const newError = {}
                error.inner.forEach(err => {
                    newError[err.path] = err.message
                });
                setErrors(newError)

                setTimeout(() => {
                    setErrors("")
                }, 2000);
            })

        fetch("http://localhost:2000/api/contact/postDetail", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            console.log("result", result)
            setFirstname("")
            setLastname("")
            setEmail("")
            setPhone("")
            setMessage("")
            result.json().then((resp) => {
                console.log(resp)
                localStorage.setItem("contact-info", JSON.stringify(resp.status))
                const status = localStorage.getItem("contact-info")
                if (status == 200) {
                    handleClick();
                }
            })
        })
    }

    return (
        <div>
            <>
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
                                <h1 className="mb-3 fw-bold">Contact Us</h1>
                                <nav aria-label="breadcrumb" className="d-block">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <NavLink to="/">Home</NavLink>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Contact Us
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="dot-overlay" />
                </section>
                {/* BreadCrumb Ends */}
            </>

            {/* contact starts */}
            <section className="contact-main pt-6 pb-60">
                <div className="container">
                    <div className="contact-info-main mt-0">
                        <div className="row">
                            <div className="col-lg-10 col-offset-lg-1 mx-auto">
                                <div className="contact-info bg-white">
                                    <div className="contact-info-title text-center mb-4 px-5">
                                        <h3 className="mb-1 fw-bold">INFORMATION ABOUT US</h3>
                                        <p className="mb-0">
                                            Sagittis posuere id nam quis vestibulum vestibulum a facilisi
                                            at elit hendrerit scelerisque sodales nam dis orci.
                                        </p>
                                    </div>
                                    <div className="contact-info-content row mb-1">
                                        <div className="col-lg-4 col-md-6 mb-4">
                                            <div className="info-item bg-lgrey px-4 py-5 border-all text-center rounded">
                                                <div className="info-icon mb-2">
                                                    <i className="fa fa-map-marker-alt theme" />
                                                </div>
                                                <div className="info-content">
                                                    <h3>Office Location</h3>
                                                    <p className="m-0">
                                                        445 Mount Eden Road, Mt Eden Basundhara Chakrapath
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 mb-4">
                                            <div className="info-item bg-lgrey px-4 py-5 border-all text-center rounded">
                                                <div className="info-icon mb-2">
                                                    <i className="fa fa-phone theme" />
                                                </div>
                                                <div className="info-content">
                                                    <h3>Phone Number</h3>
                                                    <p className="m-0">977-444-666-888</p>
                                                    <p className="m-0">977-444-222-000</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-12 mb-4">
                                            <div className="info-item bg-lgrey px-4 py-5 border-all text-center rounded">
                                                <div className="info-icon mb-2">
                                                    <i className="fa fa-envelope theme" />
                                                </div>
                                                <div className="info-content ps-4">
                                                    <h3>Email Address</h3>
                                                    <p className="m-0">info@realshield.com</p>
                                                    <p className="m-0">help@realshield.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="contact-form1" className="contact-form">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="map rounded overflow-hiddenb rounded mb-md-4">
                                                    <div style={{ width: "100%" }}>
                                                        <iframe
                                                            height={500}
                                                            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=+(mangal%20bazar)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div id="contactform-error-msg" />
                                                <form
                                                    name="contactform2"
                                                    id="contactform2"
                                                >
                                                    <div className="form-group mb-2">
                                                        <input
                                                            type="text"
                                                            name="firstname"
                                                            className="form-control"
                                                            id="fullname"
                                                            placeholder="First Name"
                                                            value={firstname}
                                                            onChange={(e) => { setFirstname(e.target.value) }}
                                                        />
                                                        {errors.firstname && <p className='text-danger'>{errors.firstname}</p>}
                                                    </div>
                                                    <div className="form-group mb-2">
                                                        <input
                                                            type="text"
                                                            name="lastname"
                                                            className="form-control"
                                                            id="llastname"
                                                            placeholder="Last Name"
                                                            value={lastname}
                                                            onChange={(e) => { setLastname(e.target.value) }}
                                                        />
                                                        {errors.lastname && <p className='text-danger'>{errors.lastname}</p>}
                                                    </div>
                                                    <div className="form-group mb-2">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className="form-control"
                                                            id="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => { setEmail(e.target.value) }}
                                                        />
                                                        {errors.email && <p className='text-danger'>{errors.email}</p>}
                                                    </div>
                                                    <div className="form-group mb-2">
                                                        <input
                                                            type="text"
                                                            name="phone"
                                                            className="form-control"
                                                            id="phnumber"
                                                            placeholder="Phone"
                                                            value={phone}
                                                            onChange={(e) => { setPhone(e.target.value) }}
                                                        />
                                                        {errors.phone && <p className='text-danger'>{errors.phone}</p>}
                                                    </div>
                                                    <div className="textarea mb-2">
                                                        <textarea
                                                            name="message"
                                                            placeholder="Enter a message"
                                                            value={message}
                                                            onChange={(e) => { setMessage(e.target.value) }}
                                                        />
                                                        {errors.message && <p className='text-danger'>{errors.message}</p>}
                                                    </div>
                                                    <div className="comment-btn text-center">
                                                        <button
                                                            type="submit"
                                                            className="nir-btn"
                                                            onClick={savedUser}
                                                        >Send detail</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
            {/* contact Ends */}
        </div>
    )
}
