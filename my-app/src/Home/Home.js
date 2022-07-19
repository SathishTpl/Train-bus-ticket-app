import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FaTrain,FaBus,FaFacebook,FaGoogle } from "react-icons/fa";
import { type } from '@testing-library/user-event/dist/type';


function Home(props) {

  const handleClickType=(type)=>{
    localStorage.setItem('bookingType',type)
    props.history.push('/trainSearch')

  }
  
  return (
    <div className="container-fluid container-fluid-1 ">
      <div className=" root-container col-md-10">
      <nav className="navbar navbar-expand-lg navbar-light ">
         
      {/* <h1 className="d-flex h1 pt-2 mb-1 justify-content-center 
          align-item-center text-white text-uppercase fw-bold">Welcome</h1> */}
        <ul className='nabar-nav'>
       
          <li className='nav-item'>
          <a className="facebook" href="#"><svg stroke="currentColor" fill="white" stroke-width="0" viewBox="0 0 512 512" height="30" 
      width="30" xmlns="http://www.w3.org/2000/svg">
        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z">
          </path>
      </svg></a>
          </li>
          <li className='nav-item'>
          <a className='google' href='#'><svg stroke="currentColor" fill="yellow" stroke-width="0" viewBox="0 0 512 512" height="30" 
      width="30" xmlns="http://www.w3.org/2000/svg">
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
        </path></svg></a>
            </li>
          </ul>
        </nav>
        <h1 className="d-flex h1 pt-2 mb-1 justify-content-center 
          align-item-center text-white text-uppercase fw-bold">Welcome</h1>
          
        <div className="row">
          <div className="col-sm-6">
            <div className="card card1 ">
            <div onClick={()=>handleClickType('2')}>
              {/* <Link className='link' to='busSearch'> */}
              <div className="card-body">
                <FaBus size={69} color='blue'/>
                {/* <button type="submit" className="busloginbtn btn btn-outline-success btn-sm">Login</button> */}
              </div></div>
            </div>
          </div>
        
        
          <div className="col-sm-6">
          <marquee  className="marquee">Safe Journey Happy Journey!!!</marquee>
            <div className=" card2 card">
              <div onClick={()=>handleClickType('1')}>
            {/* <Link className='link' to='/trainSearch'> */}
              <div className="card-body">
                <FaTrain size={69}  color='yellow'/>
                {/* <button type="submit" className="trainloginbtn btn btn-outline-success btn-sm">Login</button> */}
              </div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home
