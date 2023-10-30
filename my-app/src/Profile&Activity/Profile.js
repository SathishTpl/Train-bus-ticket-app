import React, { useState } from "react";
import './Profile.css';
import { Link } from 'react-router-dom'
import Activity from "./Activity";
import { makeAPICall } from "../Services/api";
import { toast } from "react-toastify";

const Profile = (props) => {
    const [bookingType, setBookingType] = useState(localStorage.getItem("bookingType"))
    const [postName, setpostName] = useState(JSON.parse(localStorage.getItem("user")))
    // const [trains, setTrains] = useState([])

    const logOut = async () => {
        localStorage.clear();
        props.history.push('/login')

    }

    const handleChange = async (e) => {
        setpostName(prevState=>({...prevState,[e.target.name]:e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("postName",postName)
        const response=await makeAPICall({
            endpoint:"userUpdate",
                body:postName,
                query: postName._id
            
        })
        if(response?.data){
            console.log("response",response);
            toast.success(response?.message);
        }
        else{
            toast.error(response?.err.message)
        }
    }

    return (
        <div className={"container-fluid col-md-8 " + ((bookingType == '1') ? 'train-bg-image' : 'bus-bg-image')}>
            <div className=" root-container col-md-10">
                {/* navbar section */}

                <nav className="navbar navbar-expand-lg navbar-light ">
                    {/* bg-primary */}
                    <b>{bookingType == '1' ? "Train" : "Bus"} Ticket Reservation</b>
                    {/* <a className="navbar-brand" href="#">Train Ticket Reservation</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* button list */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className='link' to='/trainSearch'style={{ textDecoration: 'none' }}>  <a className="nav-link " href="#">{bookingType == '1' ? "Train" : "Bus"} Search</a></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="link" to='/Profile' style={{ textDecoration: 'none' }}><a className="nav-link" href="#">Profile</a></Link>
                            </li>
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
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" formControlName="name" className="form-control form-control-sm" name="name"
                                        value={postName.name} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select type="text" formControlName="gender" className="form-control form-control-sm" name="gender" 
                                        value={postName.gender} onChange={handleChange} >
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="number" formControlName="phone" className="form-control form-control-sm" name="phone"
                                        value={postName.phone} onChange={handleChange}  />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" formControlName="email" className="form-control form-control-sm" name="email"
                                        value={postName.email} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-outline-primary mr-2 mb-2 pt-1  align-item-center btn-sm">Update</button>
                                    </div>

                                </form>
                            </div>

                            <div className="tab-pane fade" id="nav-activity" role="tabpanel" aria-labelledby="nav-activity-tab">
                                <Activity />
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