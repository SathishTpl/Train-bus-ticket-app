import React, { useState, useEffect } from "react";
import './Profile.css';
import { makeAPICall } from "../Services/api";
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Activity from "./Activity";




const Profile = (props) => {
    const [bookingType, setBookingType] = useState(localStorage.getItem("bookingType"))
    const [postName, setpostName] = useState(JSON.parse(localStorage.getItem("user")))
    const [postData, setPostData] = useState(JSON.parse(localStorage.getItem("searchtrain")))
    // const [trains, setTrains] = useState([])

    const logOut = async () => {
        localStorage.clear();
        props.history.push('/login')

    }
    useEffect(() => {
        // GetTrains()
    }, [])

    const GetTrains = async () => {

        console.log("inside");
        let userId = localStorage.getItem("user")?._id
        const response = await makeAPICall({
            endpoint: "getBookingDetails",
            body: {
                userId: postName._id,


            }
        })

        if (response?.data) {
            console.log("BookingReponse", response);
            toast.success(response?.message);

        }

    }

    // const cancelTrain=async()=>{

    // }

    return (
        <div className={"container-fluid col-md-8 " + ((bookingType=='1')? 'train-bg-image':'bus-bg-image')}>
            <div className=" root-container col-md-10">
                {/* navbar section */}

                <nav className="navbar navbar-expand-lg navbar-light ">
                    {/* bg-primary */}
                    <b>{bookingType=='1'?"Train":"Bus"} Ticket Reservation</b>
                    {/* <a className="navbar-brand" href="#">Train Ticket Reservation</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* button list */}
                        <ul className="navbar-nav">
                            <li className="nav-item active ">
                                <Link className="link" to='/trainSearch'><a className="nav-link " href="#">{bookingType=='1'?"Train":"Bus"} Search</a></Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="collapse" data-bs-target="#navbarDropdownMenuLink1" aria-controls="navbarNa">
                                    Profile
                                </a>
                                <div className="dropdown-menu" id="navbarDropdownMenuLink1">
                                <Link className="link" to ='/Profile'><a className="dropdown-item" href="#">Profile</a></Link><a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Activity</a></div></li>
                            
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={logOut}>Logout</a>
                            </li>

                        </ul>
                    </div>
                </nav>


                {/* Profile page */}

                <div className="row p-3 justify-content-center">
                    <div className="col-sm-6 w-75 bg-white">

                        <nav>
                            <div className="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Profile</button>
                                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-activity" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">My Activity</button>
                                {/* <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button> */}
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-home-tab">
                                <form>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" formControlName="name" className="form-control form-control-sm" value={postName.name} />
                                    </div>
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select type="text" formControlName="gender" className="form-control form-control-sm">
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="text" formControlName="phone" className="form-control form-control-sm" value={postName.phone} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" formControlName="email" className="form-control form-control-sm" value={postName.email} />
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-outline-primary mr-2 mb-2 pt-1  align-item-center btn-sm">Update</button>
                                    </div>

                                </form>
                            </div>

 <div className="tab-pane fade" id="nav-activity" role="tabpanel" aria-labelledby="nav-activity-tab">
     <Activity/>
     
          
            </div>
     </div>



                        </div>



                    </div>
                </div>
            </div>
        // </div>
    );
}

export default Profile;