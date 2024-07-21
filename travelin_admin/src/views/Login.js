// ** React Imports
import { Link, redirect, useNavigate } from "react-router-dom";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";


// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

import Cruis from "@src/assets/images/pages/cruis.jpg"

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { useEffect, useState } from "react";


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (localStorage.getItem('user-info')) {
  //     navigate('/home')
  //   }
  // }, [])

  async function savedDetail() {
    const data = { email, password }
    let result = await fetch('http://localhost:2000/api/admin/loginAdmin', {
      method: "POST",
      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    })
    result = await result.json()
    localStorage.setItem("admin-info", JSON.stringify(result))
    const userString = localStorage.getItem("admin-info")
    const userObject = JSON.parse(userString)
    const status = userObject.status

    // .then((result) => {
    //   result.json().then((resp) => {
    //     console.log(resp)
    //   })
    // })

    if (status == 200) {
      window.location.href = '/home';
    } else if (499) {
      return MySwal.fire({
        title: 'Error!',
        text: ' all field are required !',
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    } else {
      return MySwal.fire({
        title: 'Error!',
        text: ' Email or Password is incorrect!',
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    }
  }


  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <h2 className="brand-text text-info ms-1">TravelIn</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={Cruis} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Welcome to TravelIn!
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="login-email"
                  placeholder="john@example.com"
                  autoFocus
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password" className="text-black">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  onChange={(e) => { setPassword(e.target.value) }}
                />
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div>
              {/* <Button tag={Link} to="/" color="info" block onClick={savedDetail}> */}
              <Button color="info" block onClick={savedDetail}>
                Sign in
              </Button>
            </Form>

          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
