import React from 'react'
import './navbar.css'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { SlUser } from "react-icons/sl";
import { NavLink } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";


import Logo1 from '../images/logo.png'
export default function NavbarCom() {
    return (
        <div>
            <header className="main_header_area">
                <div className="header-content bg-theme">
                    <div className="container d-flex align-items-center justify-content-between">
                        {/* <div className="links">
                            <ul>
                                <li>
                                    <a className="white" >
                                        <i className='white me-2' > <SlCalender /></i>
                                        Thursday, Mar 26, 2021
                                    </a>
                                </li>
                                <li>
                                    <a className="white ">
                                        <i className='me-2 white'><IoLocationOutline /></i>
                                        Travelin SURAT ,
                                    </a>
                                </li>
                                <li>
                                    <a className="white">
                                        <i className='me-2 white'>  <FaRegClock /></i>

                                        Mon-Fri: 10 AM – 5 PM
                                    </a>
                                </li>
                            </ul>
                        </div> */}
                        <div className="links float-right">
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/" className="white">
                                        <i><FaFacebook /></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/" className="white">
                                        <FaTwitter />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/" className="white">
                                        <FaInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://in.linkedin.com/" className="white">
                                        <FaLinkedin />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Navigation Bar */}
                <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="#home"><img src={Logo1} /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav " />
                        <Navbar.Collapse id="responsive-navbar-nav  ">
                            <Nav className="me-auto">
                                <ul className="nav navbar-nav" id="responsive-menu">

                                    <li className="active">
                                        <NavLink to="/">Home</NavLink>
                                    </li>
                                    <li className="">
                                        <NavLink to="/destination" >Destinations</NavLink>
                                    </li>
                                    <li className="">
                                        <NavLink to="/tours">Tours</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/about">About Us</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/contact">Contact Us</NavLink>
                                    </li>
                                </ul>
                            </Nav>
                            <Nav >
                                {/* <NavLink to="/login" className='navi' ><SlUser /> LOGIN/REGISTER</NavLink> */}
                                <NavLink to="/tours" className="nir-btn white">
                                    Book Now
                                </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {/* Navigation Bar Ends */}
            </header>

        </div>
    )
}
