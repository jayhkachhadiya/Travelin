import React, { useState, useEffect } from "react";
import "./home.css";
import { SlFlag } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { SlDirections } from "react-icons/sl";
import { AiOutlineCompass } from "react-icons/ai";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Carousel } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// import ExampleCarouselImage from 'components/ExampleCarouselImage';
export default function Home() {
  const [data, setData] = useState([]);

  const [_id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [blog, setBlog] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    showDetail();
    getDetail();
    getDestinaiton();
    showGuide();
  }, []);

  function showDetail() {
    fetch("http://localhost:2000/api/slider/getDetail")
      .then((result) => result.json())
      .then((resp) => {
        setData(resp);
        setId(resp[0]._id);
        setTitle(resp[1].title);
        setHeading(resp[2].heading);
        setBlog(resp[3].blog);
        setImage(resp[4].image);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const [doc, setDoc] = useState([]);

  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [price, setPrice] = useState("");
  const [day, setDay] = useState("");
  const [minAge, setMinAge] = useState("");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("");

  const getDetail = () => {
    fetch("http://localhost:2000/api/package/getPackage")
      .then((result) => result.json())
      .then((resp) => {
        setDoc(resp);
        setId(resp[0]._id);
        setName(resp[1].name);
        setImage(resp[2].image);
        setDestination(resp[3].destination);
        setDuration(resp[4].duration);
        setDescription(resp[5].description);
        setLongDescription(resp[6].longDescription);
        setPrice(resp[7].price);
        setMaxPeople(resp[8].maxPeople);
        setPrice(resp[9].day);
        setDay(resp[10].minAge);
        setMinAge(resp[11].date);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const reversedData = [...doc].reverse();
  const lastThreeData = reversedData.slice(0, 3);

  const [destData, setDestData] = useState([]);

  const [state, setState] = useState("");
  const [place, setPlace] = useState("");

  const getDestinaiton = () => {
    fetch("http://localhost:2000/api/destination/getDesti")
      .then((result) => result.json())
      .then((resp) => {
        setDestData(resp);
        setId(resp[0]._id);
        setState(resp[1].state);
        setPlace(resp[2].place);
        setImage(resp[3].image);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const reverseDest = [...destData].reverse();
  const lastFour = reverseDest.slice(0, 4);

  const [guide, setGuide] = useState([]);

  const [designation, setDesignation] = useState("");

  function showGuide() {
    // const token = localStorage.getItem('token');
    fetch("http://localhost:2000/api/guide/getDetail")
      .then((result) => result.json())
      .then((resp) => {
        console.log(resp);
        setGuide(resp);
        setName(resp[0].name);
        setDesignation(resp[1].designation);
        setImage(resp[2].image);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <div>
      <div>
        <Carousel>
          {data.map((item, i) => (
            <Carousel.Item className="">
              {/* <img src={`http://localhost:2000/${item.imageUrl}`} className="d-block w-100" /> */}
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  className="d-block w-100"
                  alt="Uploaded"
                />
              )}
              <div className="dot-overlay" />
              <Carousel.Caption>
                <div className="swiper-content">
                  <div className="entry-meta mb-2">
                    <h5 className="entry-category mb-0 white">{item.title}</h5>
                  </div>
                  <h1 className="mb-2">
                    <a href="#" className="white fw-bold">
                      {item.heading}
                    </a>
                  </h1>
                  <p className="white mb-4">{item.blog}</p>
                  <div className="slider-button d-flex justify-content-center">
                    <a href="/about" className="nir-btn me-4">
                      Read More
                    </a>
                    <a href="/contact" className="nir-btn-black">
                      Contact Us
                    </a>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      {/* form main starts */}
      <div className="form-main">
        <div className="section-shape top-0">{/* <img src={Shape8} /> */}</div>
        {/* <div className="container">
                    <div className="row align-items-center form-content rounded position-relative ms-5 me-5">
                        <div className="col-lg-2 p-0">
                            <h4 className="form-title form-title1 text-center p-4 py-5 white bg-theme mb-0 rounded-start d-lg-flex align-items-center">
                                <i className="icon-location-pin fs-1 me-1" />Find Your Holidays
                            </h4>
                        </div>
                        <div className="col-lg-10 px-4">
                            <div className="form-content-in d-lg-flex align-items-center">
                                <div className="form-group me-2">
                                    <div className="input-box">
                                        <select className="niceSelect">
                                            <option value={1}>select state</option>
                                            <option value={"Goa"}>Goa</option>
                                            <option value={"Rajasthan"}>Rajasthan</option>
                                            <option value={"Uttarpradesh"}>Uttarpradesh</option>
                                            <option value={"Uttarakhand"}>Uttarakhand</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group me-2">
                                    <div className="input-box">
                                        <input type="date" name="date" />
                                    </div>
                                </div>
                                <div className="form-group me-2">
                                    <div className="input-box">
                                        <select className="niceSelect">
                                            <option value={1}>Travel Type</option>
                                            <option value={2}>City Tour</option>
                                            <option value={3}>Family Tour</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group me-2">
                                    <div className="input-box">
                                        <select className="niceSelect">
                                            <option value={1}>Tour Duration</option>
                                            <option value={2}>5 days</option>
                                            <option value={3}>7 Days</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group mb-0 text-center">
                                    <a href="/tours" className="nir-btn w-100">
                                        <i className="fa fa-search mr-2" /> Search Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
      </div>
      {/* form main ends */}

      {/* about-us starts */}
      <section className="about-us pb-6 pt-10">
        <div className="container">
          <div className="section-title mb-6 w-50 mx-auto text-center">
            <h4 className="mb-1 theme1 fw-bold">Core Features</h4>
            <h2 className="mb-1 fw-bold">
              Find <span className="theme fw-bold">Travel Perfection</span>
            </h2>
            <p>
              Travel far, explore wide, let your soul be your guide, In every
              journey, a story to confide.
            </p>
          </div>
          {/* why us starts */}
          <div className="why-us">
            <div className="why-us-box">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                  <div className="why-us-item p-5 pt-6 pb-6 border rounded bg-white">
                    <div className="why-us-content">
                      <div className="why-us-icon mb-1">
                        <i className=" theme">
                          <SlFlag />
                        </i>
                      </div>
                      <h4>
                        <a href=" ">Tell Us What You want To Do</a>
                      </h4>
                      <p className="mb-2">
                        I aspire to innovate, Guiding
                        progress with passion and desire
                      </p>
                     {/*<p className="mb-0 theme">100+ Reviews</p>*/}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                  <div className="why-us-item p-5 pt-6 pb-6 border rounded bg-white">
                    <div className="why-us-content">
                      <div className="why-us-icon mb-1">
                        <i className="theme">
                          <IoLocationOutline />
                        </i>
                      </div>
                      <h4>
                        <a href=" ">Share Your Travel Locations</a>
                      </h4>
                      <p className="mb-2">
                        From bustling cities to serene shores, Exploring the
                        world.
                      </p>
                     {/*<p className="mb-0 theme">100+ Reviews</p>*/}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                  <div className="why-us-item p-5 pt-6 pb-6 border rounded bg-white">
                    <div className="why-us-content">
                      <div className="why-us-icon mb-1">
                        <i className="icon-directions theme">
                          <SlDirections />
                        </i>
                      </div>
                      <h4>
                        <a href=" ">Share Your Travel Preference</a>
                      </h4>
                      <p className="mb-2">
                        Seeking adventure , Discovering beauty, free from
                        constrain
                      </p>
                     {/*<p className="mb-0 theme">100+ Reviews</p>*/}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                  <div className="why-us-item p-5 pt-6 pb-6 border rounded bg-white">
                    <div className="why-us-content">
                      <div className="why-us-icon mb-1">
                        <i className="icon-compass theme">
                          <AiOutlineCompass />
                        </i>
                      </div>
                      <h4>
                        <a href=" ">100% Trusted Tour Agency</a>
                      </h4>
                      <p className="mb-2">
                        With reliable service, For unforgettable journeys, come
                        what may.
                      </p>
                     {/*<p className="mb-0 theme">100+ Reviews</p>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* why us ends */}
        </div>
        <div className="white-overlay" />
      </section>
      {/* about-us ends */}

      {/* top Destination starts */}
      <section className="trending pb-3 pt-0">
        <div className="container">
          <div className="section-title mb-6 w-50 mx-auto text-center">
            <h4 className="mb-1 theme1 fw-bold">Top Destinations</h4>
            <h2 className="mb-1 fw-bold">
              Explore <span className="theme fw-bold">Top Destinations</span>
            </h2>
            <p>
              "Discover the extraordinary. Explore top destinations with us."
            </p>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="row">
                {/* <div className="col-lg-12 mb-4">
                                    <div className="trend-item1">
                                        <div className="trend-image position-relative">
                                            <img src={Dest2} alt="image" />
                                            <div className="trend-content d-flex align-items-center justify-content-between position-absolute bottom-0 p-4 w-100 z-index">
                                                <div className="trend-content-title">
                                                    <h5 className="mb-0">
                                                        <NavLink to="/tours" className="theme1">
                                                            Goa
                                                        </NavLink>
                                                    </h5>
                                                    <h3 className="mb-0 white">Goa</h3>
                                                </div>
                                                <span className="white bg-theme p-1 px-2 rounded">
                                                    18 Tours
                                                </span>
                                            </div>
                                            <div className="color-overlay" />
                                        </div>
                                    </div>
                                </div> */}

                {lastFour.map((item, i) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                    <div className="trend-item1">
                      <div className="trend-image position-relative rounded">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt="Uploaded" />
                        )}
                        <div className="trend-content d-flex align-items-center justify-content-between position-absolute bottom-0 p-4 w-100">
                          <div className="trend-content-title">
                            <h5 className="mb-0">
                              <NavLink to="/tours" className="theme1">
                                {item.state}
                              </NavLink>
                            </h5>
                            <h3 className="mb-0 white">{item.place}</h3>
                          </div>
                          {/* <span className="white bg-theme p-1 px-2 rounded">
                                                    15 Tours
                                                </span> */}
                        </div>
                        <div className="color-overlay" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="col-lg-5 mb-4">
                            <div className="trend-item1">
                                <div className="trend-image position-relative rounded">
                                    <img src={Dest1} alt="image" />
                                    <div className="trend-content d-flex align-items-center justify-content-between position-absolute bottom-0 p-4 w-100 z-index">
                                        <div className="trend-content-title">
                                            <h5 className="mb-0">
                                                <NavLink to="/tours" className="theme1">
                                                    Himachal Pradesh
                                                </NavLink>
                                            </h5>
                                            <h3 className="mb-0 white"> Shimla-Manali</h3>
                                        </div>

                                    </div>
                                    <div className="color-overlay" />
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </section>
      {/* top Destination ends */}

      {/* best tour Starts */}
      <section className="trending bg-grey pt-17 pb-6">
        <div className="section-shape top-0">{/* <img src={Shape8} /> */}</div>
        <div className="container">
          <div className="row align-items-center justify-content-between mb-6 ">
            <div className="col-lg-7">
              <div className="section-title text-center text-lg-start">
                <h4 className="mb-1 theme1 fw-bold">Top Pick</h4>
                <h2 className="mb-1 fw-bold">
                  Best <span className="theme fw-bold">Tour Packages</span>
                </h2>
                <p>
                  Visit iconic landmarks and historical sites with our expert
                  guides. Book Your Expedition Today.
                </p>
              </div>
            </div>
            <div className="col-lg-5"></div>
          </div>
          <div className="trend-box">
            {/* <Slider {...settings}/> */}
            <div className="row">
              {lastThreeData.map((item, i) => (
                <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                  <div className="trend-item rounded box-shadow bg-white">
                    <div className="trend-image position-relative">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt="Uploaded" />
                      )}

                      <div className="color-overlay" />
                    </div>
                    <div className="trend-content p-4 pt-5 position-relative">
                      <div className="trend-meta bg-theme white px-3 py-2 rounded">
                        <div className="entry-author">
                          <i className="icon-calendar" />
                          <span className="fw-bold">
                            {" "}
                            {item.day} Days Tours
                          </span>
                        </div>
                      </div>
                      <h5 className="theme mb-1 fw-bold">
                        <i className="flaticon-location-pin" /> {item.name}
                      </h5>
                      <h3 className="mb-1 fw-bold">
                        <a href="/tours">{item.destination} </a>
                      </h3>
                      <div className="rating-main d-flex align-items-center pb-2">
                        <div className="rating">
                          <span className="fa fa-star checked" />
                          <span className="fa fa-star checked" />
                          <span className="fa fa-star checked" />
                          <span className="fa fa-star checked" />
                          <span className="fa fa-star checked" />
                        </div>
                        <span className="ms-2">(12)</span>
                      </div>
                      <p className=" border-b pb-2 mb-2">
                        {/* Ladakh is a popular destination for adventure enthusiasts, offering activities like trekking, river rafting, and mountain biking. */}
                        {item.description}
                      </p>
                      <div className="entry-meta">
                        <div className="entry-author d-flex align-items-center">
                          <p className="mb-0">
                            <span className="theme fw-bold fs-5">
                              {" "}
                              ₹ {item.price}
                            </span>{" "}
                            | Per person
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* best tour Ends */}

      {/* our teams starts */}
      <section className="our-team pb-0">
        <div className="container">
          <div className="section-title mb-6 w-75 mx-auto text-center">
            <h4 className="mb-1 theme1 fw-bold">Tour Guides</h4>
            <h2 className="mb-1 fw-bold">
              Meet Our <span className="theme fw-bold">Excellent Guides</span>
            </h2>
            <p>"Exceptional Guides for Unforgettable Journeys"</p>
          </div>
          <div className="team-main ">
            <div className="row shop-slider">
              {guide.map((item, i) => (
                <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                  <div className="team-list rounded">
                    <div className="team-image ">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt="Uploaded" />
                      )}
                    </div>
                    <div className="team-content text-center p-3 bg-theme">
                      <h4 className="mb-0 white">{item.name}</h4>
                      <p className="mb-0 white">{item.designation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* our teams Ends */}
    </div>
  );
}
