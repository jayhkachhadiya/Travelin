import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Background from '../images/bg1.jpg'
import SecBg1 from '../images/section-bg1.png'
import Shape8 from '../images/shape8.png'

import { NavLink } from 'react-router-dom'

export default function Destination() {

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

  const [state, setState] = useState("")
  const [place, setPlace] = useState("")
  const [image, setImage] = useState(null)

  useEffect(() => {
    showDetail()
  }, [])


  // const [authToken, setAuthToken] = useState(null)


  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setAuthToken(token);
  //   }
  // }, []);

  function showDetail() {
    // const token = localStorage.getItem('token');
    fetch('http://localhost:2000/api/destination/getDesti')
      .then((result) => result.json())
      .then((resp) => {
        console.log(resp);
        setData(resp);
        // setId(resp[0]._id)
        setState(resp[0].state)
        setPlace(resp[1].place)
        setImage(resp[2].image)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    // console.log(token)
  }

  console.log(data)

  return (
    <div>
      {/*  */}
      {/* BreadCrumb Starts */}
      <section className="breadcrumb-main pb-20 pt-14" style={Bg1}>
        <div
          className="section-shape section-shape1 top-inherit bottom-0"
          style={Shapes8}
        />
        <div className="breadcrumb-outer">
          <div className="container">
            <div className="breadcrumb-content text-center">
              <h1 className="mb-3 fw-bold">Destination List</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Destination Lists
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
      <section className="trending pb-0 pt-6">
        <div className="container">
          <div className="section-title mb-6 w-50 mx-auto text-center">
            <h4 className="mb-1 theme1 fw-bold">Top Destinations</h4>
            <h2 className="mb-1 fw-bold">
              Explore <span className="theme fw-bold">Top Destinations</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
          <div className="row align-items-center">
            {
              data.map((item) =>
                <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                  <div className="trend-item1">
                    <div className="trend-image position-relative rounded">
                      {/* <img width="50px" src={`http://localhost:2000/${item.imageUrl}`} /> */}
                      {item.imageUrl && <img width="50px" src={item.imageUrl} alt="Uploaded" />}
                      <div className="trend-content d-flex align-items-center justify-content-between position-absolute bottom-0 p-4 w-100 z-index">
                        <div className="trend-content-title">
                          <h5 className="mb-0">
                            <a  className="theme1">
                              {item.state}
                            </a>
                          </h5>
                          <h3 className="mb-0 white">{item.place}</h3>
                        </div>
                      </div>
                      <div className="color-overlay" />
                    </div>
                  </div>
                </div>
              )
            }

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
        <div
          className="section-shape  top-inherit bottom-0"
          style={{ backgroundImage: "url(images/shape6.png)" }}
        />
      </section>
      {/* Discount action Ends */}
    </div>
  )
}