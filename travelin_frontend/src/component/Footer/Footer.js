import React, { useState } from "react";
import "./footer.css";

import logoWhite from "../images/logo-white.png";

import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invelid email").required("email is reqired"),
  });

  const insertData = (e) => {
    e.preventDefault();
    const data = { email: email };
    validationSchema
      .validate(data, { aboutEarly: false })
      .then(() => {
        console.log("form submited", data);
      })
      .catch((error) => {
        console.error("Validation error:", error.errors);
        const newError = {};
        newError.email = error.message;
        setErrors(newError);
        setTimeout(() => {
          setErrors("");
        }, 2000);
      });

    // .catch((error) => {
    //     console.error('Validation error:', error.errors);
    //     console.error('Validation error:', error.inner);
    //     const newError = {};
    //     error.inner.forEach(err => {
    //         newError[err.path] = err.message;
    //     });
    //     setErrors(newError);
    // })

    fetch("http://localhost:2000/api/subscribe/postEmail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((resp) => {
        setEmail("");
        console.log(resp);
      });
    });
  };
  return (
    <div>
      {/* footer starts */}
      <footer className="pt-20 pb-4">
        <div className="footer-upper pb-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-8 col-sm-12 mb-4 pe-4">
                <div className="footer-about">
                  <img src={logoWhite} alt="" />
                  <p className="mt-3 mb-3 white">
                    Adventure awaits beyond the horizon, With each step, a new
                    story is written.Travel far and wide, let wanderlust be your
                    guide, In every journey, find joy, and your spirit untied
                  </p>

                  <li className="white">
                    <strong>PO Box:</strong> +91 98526 26514
                  </li>
                  <li className="white">
                    <strong>Location:</strong> Near Sunday Heaven , SURAT
                  </li>
                  <li className="white">
                    <strong>Email:</strong> info@Travelin.com
                  </li>
                  <li className="white">
                    <strong>Website:</strong> www.Travelin.com
                  </li>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-12 mb-4">
                <div className="footer-links">
                  <h3 className="white">Quick link</h3>
                  <ul>
                    <li>
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/destination">Destination</NavLink>
                    </li>
                    <li>
                      <NavLink to="/tours">Tours</NavLink>
                    </li>
                    <li>
                      <NavLink to="/about">About us</NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact">Contact us</NavLink>
                    </li>
                    <li>
                      <NavLink to="/login">Register</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="col-lg-2 col-md-6 col-sm-12 mb-4">
                                <div className="footer-links">
                                    <h3 className="white">Categories</h3>
                                    <ul>
                                        <li>
                                            <a href="">Travel</a>
                                        </li>
                                        <li>
                                            <a href="">Technology</a>
                                        </li>
                                        <li>
                                            <a href="">Lifestyle</a>
                                        </li>
                                        <li>
                                            <a href="">Destinations</a>
                                        </li>
                                        <li>
                                            <a href="">Entertainment</a>
                                        </li>
                                        <li>
                                            <a href="">Business</a>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
              <div className="col-lg-4 col-md-12 col-sm-12 mb-4">
                <div className="footer-links">
                  <h3 className="white">Newsletter</h3>
                  <div className="newsletter-form ">
                    <p className="mb-3">
                      Jin our community of over 200,000 global readers who
                      receives emails filled with news, promotions, and other
                      good stuff.
                    </p>
                    <form className="border-0 d-flex align-items-center">
                      <input
                        type="text"
                        name="email"
                        value={email}
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <button className="nir-btn ms-2" onClick={insertData}>
                        Subscribe
                      </button>
                    </form>
                    {errors.email && (
                      <span className="text-danger">{errors.email}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-payment">
          <div className="container">
            <div className="row footer-pay align-items-center justify-content-between text-lg-start text-center">
              <div className="col-lg-8 footer-payment-nav mb-4">
                <ul className="">
                  <li className="me-2">We Support:</li>
                  <li className="me-2">
                    <i className="fab fa-cc-mastercard fs-4" />
                  </li>
                  <li className="me-2">
                    <i className="fab fa-cc-paypal fs-4" />
                  </li>
                  <li className="me-2">
                    <i className="fab fa-cc-stripe fs-4" />
                  </li>
                  <li className="me-2">
                    <i className="fab fa-cc-visa fs-4" />
                  </li>
                  <li className="me-2">
                    <i className="fab fa-cc-discover fs-4" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            <div className="copyright-inner rounded p-3 d-md-flex align-items-center justify-content-between">
              <div className="copyright-text">
                <p className="m-0 white">2024 Travelin. All rights reserved.</p>
              </div>
              <div className="social-links">
                <ul>
                  <li>
                    <a href="#">
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaLinkedin />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="particles-js" />
      </footer>
      {/* footer ends */}
    </div>
  );
}
