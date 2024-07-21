import React from 'react'
import './error.css'
import { NavLink } from 'react-router-dom'
import ErrorImage from '../images/404.svg'
export default function Error() {
    return (
        <div>
            <>
                {/* error section starts */}
                <section className="error overflow-hidden pb-10 pt-20">
                    <div className="container">
                        <div className="error-main">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-lg-7 mb-4">
                                    <div className="error-content w-100 text-lg-start text-center">
                                        <h3 className="theme fw-bold">Oops! Page not found</h3>
                                        <h2 className="mb-0 navy fw-bold">
                                            we are sorry, but the page you requested was not found
                                        </h2>
                                        <div className="newsletter-form mt-3 w-75 rounded overflow-hidden">
                                            {/* <form>
                                                <input type="email" placeholder="Enter your email" />
                                                <input
                                                    type="submit"
                                                    className="nir-btn bordernone"
                                                    defaultValue="Subscribe"
                                                />
                                            </form> */}
                                        </div>
                                        <div className="error-btn mt-4">
                                            <NavLink to="/contact" className="nir-btn">
                                                GO TO CONTACT
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="error-image">
                                        <img src={ErrorImage} alt="" className="mb-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* error section Ends */}
            </>

        </div>
    )
}
