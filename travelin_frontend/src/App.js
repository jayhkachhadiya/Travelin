import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavbarCom from "./component/Navbar/Navbar";
import Home from './component/Home/Home.js';
import Destination from './component/Destination/Destination.js';
import Footer from './component/Footer/Footer.js';
import Tours from './component/Tours/Tours.js';
import About from './component/About/About.js';
import Contact from './component/Contact/Contact.js';
import Error from './component/Error/Error.js';
import Booking from './component/Booking/Booking.js'
import Login from './component/Nav/Login.js';
import Single from './component/Tours/Single.js';
import Confirm from './component/Booking/Confirm.js';
import Forgot from './component/ForgotPassword/Forgot.js';

function App() {


  return (
    <div className="App">
      <Router>
        <NavbarCom />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/destination' element={<Destination />}></Route>
          <Route path='/tours' element={<Tours />}></Route>
          <Route path='/booking/:id' element={<Booking />}></Route>
          <Route path='/confirm' element={<Confirm />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path="/packageDetail/:id" element={<Single/>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/forgotPassword' element={<Forgot />}></Route>
          <Route path='/*' element={<Error />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div >
  );
}

export default App;
