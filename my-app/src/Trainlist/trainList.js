import React, { useEffect, useState } from 'react';
import './trainList.css';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import { makeAPICall } from '../Services/api';
import Booking from '../TrainBooking/trainBooking';






const Trainlist = (props) => {
    const [bookingType, setBookingType] = useState(localStorage.getItem("bookingType"))

    const [postData, setpostData] = useState(JSON.parse(localStorage.getItem("searchtrain")))
    const [trains, setTrains] = useState([])


    useEffect(() => {
        GetTrains()
    }, [])
    
    const logOut=()=> {
        localStorage.clear();
        props.history.push('/login');
       }
       
      


    const GetTrains = async () => {
       
        console.log("inside");

        const response = await makeAPICall({
            endpoint: "trainAvaiableList",
            body: {
                source:postData.source,
                destination:postData.destination,
                date:postData.date,
                
            
            }
        })

         
        if (response?.data) {

           console.log('respose',response?.data)
           setTrains(response?.data)


                   }

                
        
                  
    }

    return (

        // header section
        <div className={"container-fluid col-md-8 " + ((bookingType=='1')? 'train-bg-image':'bus-bg-image')}>
            <div className=" root-container col-md-10">
                {/* navbar section */}

                <nav className="navbar navbar-expand-lg navbar-light ">
                    <b>{bookingType=='1'?"Train":"Bus"}Ticket Reservation</b>
                    {/* <a className="navbar-brand" href="#">Train Ticket Reservation</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* button list */}
                        <ul className="navbar-nav">
                            <li className="nav-item active ">
                              <Link className='link' to='/trainSearch'>  <a className="nav-link " href="#">{bookingType=='1'?"Train":"Bus"} Search</a></Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="collapse" data-bs-target="#navbarDropdownMenuLink1" aria-controls="navbarNa">
                                    Profile
                                </a>
                                <div className="dropdown-menu" id="navbarDropdownMenuLink1">
                                <Link className="link" to ='/Profile'><a className="dropdown-item" href="#">Profile</a></Link> <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Activity</a></div></li>

                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={logOut}>Logout</a>
                            </li>

                        </ul>
                    </div>
                </nav>


                <div className="row justify-content-center text-white pl-5 pt-4" >
                    <div className="col-md-8 box block mt-2 bg-black pd-2">
                        <div className="row">
                            <div className="col-md-5 pt-2">
                                <p><small>Results for</small></p>
                                <h6>{postData.source}-{postData.destination}</h6>
                                <p><small>Date:{postData.date}</small></p >
                            </div>
                        </div>
                        <hr />

                        <div className="row search-result pb-3">
                            <div className="col-sm-12 my-2">
                                <h5>{trains.length} Train(s)</h5>
                            </div>
                            {trains.map((item,i)=>(
                            <div className="col-sm-12" key={i}>
                                <div className="card card-1">
                                    <div className="card-body">
                                        <div className="card-title row clearfix">
                                            <div className="float-left col-8 text-uppercase">{item.trainInfo.trainName} </div>
                                            <div className="float-right col-4 ">
                                                
                                            <Popup
                                            trigger={<button className="btn btn-primary float-right btn-outline btn-sm" value={Booking}>Book</button>}
                                            modal
                                                 >
                                             <Booking history={props.history} trainDetails={item}/>
                                                 </Popup>
                                               </div>  
                                        </div>
                                        <div className="card-subtitle font-weight-normal text-uppercase">
                                            
                                            {item.startPoint}-{item.destPoint}
                                        </div>
                                        <div className="card-text text-white"> <small className="d-block">Running On: <b className='fs-15 tcolor'> {item.trainInfo.days}</b></small>
                                            <small className="d-block">Departure Time: <b className='fs-20 tcolor'>{item.departureTime}</b> Arrival Time: <b className='fs-15 tcolor'>{item.arrivalTime}</b></small>
                                            <div className="my-2 small clearfix">
                                                <span className="float-left fs-white large">Rs.<b className="fs-20 tcolor">{item.fare}</b></span>
                                                <span className="float-right pl-8"><b className="fs-10 tcolor">{item.seatAvailability}</b> seat(s) available.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>

                    </div>
                </div>




            </div>
        </div>
    );
}
export default Trainlist;