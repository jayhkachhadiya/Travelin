import React, { useState, useParams } from 'react'
import './login.css'
import Background from '../images/bg1.jpg'
import Trend5 from '../images/trending5.jpg'
import * as Yup from 'yup';
import { error } from 'jquery';
import { handleClick } from '../tosti'
import { ToastContainer } from 'react-toastify';

export default function Login() {
    const [showTab, setshowTab] = useState(true);
    const handleToggle = (action) => {
        setshowTab(action)
    };

    const LogTextColor = showTab ? 'white' : 'black '
    const RegTextColor = showTab ? 'black' : 'white '

    const reg = {
        backgroundColor: showTab ? 'white' : '#029e9d ',
    }
    const login = {
        backgroundColor: showTab ? '#029e9d ' : 'white',
        color: showTab ? 'green ' : 'red',
    };
    const Tre5 = {
        backgroundImage: `url(${Trend5})`,
    }

    const Bg1 = {
        background: `url(${Background})`,
        backgroundSize: 'cover',
    }
    const [showOtpField, setShowOtpField] = useState(false);
    const [isRegistered, setRegistered] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required("Password is required")
    });


    const [OTP, setOTP] = useState('');
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPassword_confirmation] = useState("")

    const [errors, setErrors] = useState({})

    function handleSendOtp() {
        let data = { name, email, password, password_confirmation }
        fetch("http://localhost:2000/api/user/register", {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        }).then((result) => {
            localStorage.setItem("userData", JSON.stringify(data))
            // console.log("result", result)
            result.json().then((resp) => {
                console.log("resp", resp)
            })
        })
        setShowOtpField(true);
    }

    function handleRegister() {
        const userString = localStorage.getItem("userData")
        const userObject = JSON.parse(userString)
        const email = userObject.email

        let data = { email, OTP }
        fetch("http://localhost:2000/api/user/register/verify", {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        }).then((result) => {
            console.log(result)
            result.json().then((resp) => {
                console.log(resp)
            })
        })
        setRegistered(true)
    }

    // function handleResendOTP() {
    //     let data = { OTP }
    //     fetch("http://localhost:2000/api/user/register/resend", {
    //         method: 'POST',
    //         headers: {
    //             'Accept': "application/json",
    //             'Content-Type': "application/json"
    //         },
    //         body: JSON.stringify(data)
    //     }).then((result) => {
    //         console.log(result)
    //     })
    //     setRegistered(true)
    // }

    function savedUser() {
        let data = { email, password }

        validationSchema
            .validate(data, { abortEarly: false })
            .then(() => {
                console.log('Form submitted:', data);
            })
            .catch((error) => {
                console.error('Validation error:', error.inner);
                const newError = {}
                error.inner.forEach(err => {
                    newError[err.path] = err.message
                })
                setErrors(newError)
            });


        if (!data.email || !data.password) {
            console.log("email and password are required")
        } else {
            console.log(data)
            fetch("http://localhost:2000/api/user/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(data)
            }).then((result) => {
                console.log("result", result)
                result.json().then((resp) => {
                    console.log(resp)
                    localStorage.setItem("user-info", JSON.stringify(resp))
                    localStorage.setItem("token", resp.token)
                    const packId = localStorage.getItem("packId")
                    const userString = localStorage.getItem("user-info")
                    const userObject = JSON.parse(userString)
                    const status = userObject.status
                    if (status == 200) {
                        window.location.href = `/booking/${packId}`
                        handleClick()
                    }
                    // if (token === undefined) {
                    //     window.location.href = `/home`
                    // } else {
                    //    
                    // }
                })
            })
        }
    }




    return (
        <div id="exampleModal" tabIndex={-1} aria-hidden="true" className='container'>
            <div className="modal-dialog">
                <div className="modal-content ">
                    <div className="modal-body ">
                        <div className="post-tabs ">
                            {/* tab navs */}
                            <ul className="nav nav-tabs nav-pills nav-fill " id="postsTab" role="tablist" >
                                <li className="nav-item" role="presentation" style={login}>
                                    <button
                                        aria-controls="login"
                                        aria-selected="false"
                                        className="nav-link"
                                        data-bs-target="#login"
                                        data-bs-toggle="tab"
                                        id="login-tab"
                                        role="tab"
                                        type="button"
                                        onClick={() => { handleToggle(true) }}
                                        style={{ color: LogTextColor }}
                                    >
                                        Login
                                    </button>
                                </li>

                                <li className="nav-item" role="presentation" style={reg}>
                                    <button
                                        aria-controls="register"
                                        aria-selected="true"
                                        className="nav-link "
                                        data-bs-target="#register"
                                        data-bs-toggle="tab"
                                        id="register-tab"
                                        role="tab"
                                        type="button"
                                        onClick={() => { handleToggle(false) }}
                                        style={{ color: RegTextColor }}
                                    >
                                        Register
                                    </button>
                                </li>
                            </ul>
                            {/* tab contents */}
                            <div className="tab-content blog-full" id="postsTabContent">
                                {/* popular posts */}
                                {showTab ? (<div aria-labelledby="login-tab" className="tab-pane fade active show" id="login" role="tabpanel" >

                                    <div className="row mt-3">
                                        <div className="col-lg-6">
                                            <a className="blog-image rounded"  >
                                                <img
                                                    href=""
                                                    src={Trend5}
                                                />
                                            </a>
                                        </div>
                                        <div className="col-lg-6">
                                            <h4 className="text-center border-b pb-2 text-black">Login</h4>
                                            <form className='form-content' name="contactform" id="contactform" >
                                                <div className="form-group mb-2 ">
                                                    <input type="text"
                                                        name="email"
                                                        id='email'
                                                        className="form-control"
                                                        placeholder="User Email "
                                                        value={email}
                                                        onChange={(e) => { setEmail(e.target.value) }}
                                                    />
                                                    {errors.email && <p className='text-danger'>{errors.email}</p>}
                                                </div>
                                                <div className="form-group mb-2">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        id="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => { setPassword(e.target.value) }}
                                                    />
                                                    {errors.password && <p className='text-danger'>{errors.password}</p>}
                                                </div>
                                                <div className="form-group mb-2">

                                                    <a className="float-end lost" href="/forgotPassword">
                                                        Lost your password?
                                                    </a>
                                                </div>
                                                <div className="comment-btn mb-2 pb-2 text-center border-b">
                                                    <button
                                                        type="button"
                                                        className="nir-btn w-100"
                                                        onClick={savedUser}
                                                    >Login</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>) :
                                    (
                                        <div aria-labelledby="register-tab" id="register" role="tabpanel" >
                                            <div className="row mt-3">
                                                <div className="col-lg-6 ">
                                                    <a className="blog-image rounded" >
                                                        <img
                                                            href=""
                                                            src={Trend5}
                                                        />
                                                    </a>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h4 className="text-center border-b pb-2">Register</h4>
                                                    <form name="contactform1" id="contactform1">
                                                        <div className="form-group  mb-2">
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                className="form-control"
                                                                placeholder="User Name"
                                                                value={name}
                                                                onChange={(e) => { setName(e.target.value) }}
                                                            />

                                                        </div>
                                                        <div className="form-group mb-2">
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                className="form-control"
                                                                placeholder="Email Address"
                                                                value={email}
                                                                onChange={(e) => { setEmail(e.target.value) }}
                                                            />

                                                        </div>
                                                        <div className="form-group mb-2">
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                className="form-control"
                                                                placeholder="Password"
                                                                value={password}
                                                                onChange={(e) => { setPassword(e.target.value) }}
                                                            />
                                                        </div>
                                                        <div className="form-group mb-2">
                                                            <input
                                                                type="password"
                                                                name="password_confirmation"
                                                                className="form-control"
                                                                placeholder="Re-enter Password"
                                                                value={password_confirmation}
                                                                onChange={(e) => { setPassword_confirmation(e.target.value) }}
                                                            />
                                                        </div>


                                                        {!isRegistered ? (
                                                            <div>
                                                                <div className="">
                                                                    <button
                                                                        type="button"
                                                                        className="nir-btn  float-end mb-2"
                                                                        // id="submit2"
                                                                        // defaultValue="Register" 
                                                                        onClick={handleSendOtp}
                                                                    >Send OTP</button>
                                                                </div>

                                                                {showOtpField && (
                                                                    <div>
                                                                        <div className=" mb-2">
                                                                            <input
                                                                                type='number'
                                                                                value={OTP}
                                                                                className="form-control w-50 "
                                                                                placeholder="Enter OTP"
                                                                                onChange={(e) => setOTP(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        {/* <a className="lost ms-2 mb-2 " onClick={handleResendOTP} >
                                                                            Resend otp
                                                                        </a> */}
                                                                    </div>
                                                                )}

                                                                <button
                                                                    type="button"
                                                                    className="nir-btn w-100 "
                                                                    onClick={handleRegister}
                                                                    disabled={!showOtpField}
                                                                >Register</button>
                                                            </div>
                                                        ) : (
                                                            <div className=" mb-2">
                                                                <input
                                                                    type='text'
                                                                    className="form-control w-50 "
                                                                    value={OTP}
                                                                    onChange={(e) => { setOTP(e.target.value) }}
                                                                    placeholder="Enter OTP"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="nir-btn w-100 mt-2 "
                                                                    onClick={handleRegister}
                                                                // disabled={!showOtpField}
                                                                >Register</button>
                                                            </div>
                                                        )}
                                                        {/* <p className="text-center">
                                                            Already have an account?{" "}
                                                            <a href="#" className="theme">
                                                                Login
                                                            </a>
                                                        </p> */}
                                                    </form>
                                                </div>
                                            </div>
                                        </div>)}
                                {/* Recent posts */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}
