import React, { useState, useEffect } from 'react';
import './trainSearch.css';
import 'bootstrap/dist/js/bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { makeAPICall } from '../Services/api';
import {Link} from 'react-router-dom';


const TrainSearch = (props) => {
    const [bookingType, setBookingType] = useState(localStorage.getItem("bookingType"))

    const [endPoints, setEndPoints] = useState([])
    const [source, setSource] = useState([])
    const [destination, setDestination] = useState([])
    const [date, setDate] = useState('')
    const [sourceName, setSourceName] = useState([])
    const [destinationName, setDestinationName] = useState([])



    useEffect(() => {
        Getendpoint()
    }, [])
    
    const logOut=async()=> {
        localStorage.clear();
        props.history.push('/login');
       }

    const Getendpoint = async () => {

        console.log("inside");
        const response = await makeAPICall({
            endpoint: "trainGetendpoint",
        })

        if (response?.status) {

            setEndPoints(response?.data)
            let datas = response?.data
            let startPoints = datas.map((item, idx) => {
                return item.startPoint
            })
            console.log("startPoints", new Set(startPoints))
            setSource([...new Set(startPoints)])


        }

    }

    const searchTrain = async () => {
        if (sourceName === '' && destinationName === '' && date === '') {
            toast.error("Starting or ending point required")
            return
        }
        console.log("inside");
        
        localStorage.setItem("searchtrain",JSON.stringify({source:sourceName,destination:destinationName,date:date}))
        props.history.push('/trainList');
    }

    // filter the matched startpoint
    const changestartpoint = (e) => {
        console.log(e.target.value)
        setSourceName(e.target.value)
        let filterdespoint = endPoints.filter(item => item.startPoint == e.target.value)
        let destPoint = filterdespoint.map((item, idx) => {
            return item.destPoint  
        })
        console.log("destPoint", new Set(destPoint))
        setDestination([...new Set(destPoint)])

    }

    return (
        // body section
        <div className={"container-fluid col-md-8 " + ((bookingType=='1')? 'train-bg-image':'bus-bg-image')} >
            <div className=" root-container col-md-10">
                {/* navbar section */}

                <nav className="navbar navbar-expand-lg navbar-light ">
                  
                    <b>{bookingType=='1'?"Train":"Bus"} Ticket Reservation</b>
                    {/* <a className="navbar-brand" href="#">Train Ticket Reservation</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* button list */}
                        <ul className="navbar-nav">
                            <li className="nav-item ">
                                <Link className='link' to='/trainSearch'>  <a className="nav-link " href="#">{bookingType == '1' ? "Train" : "Bus"} Search</a></Link>
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
                {/* -------------------------------------------------------------------------------------------------------------*/}
                {/* TrainSearch Menu */}
                <div className="row justify-content-center pb-5 pt-5" >
                    <div className="col-md-5 box block mt-5 bg-white pt-4 pb-4">
                        <form className="d-flex justify-content-center">
                            <div className="row justify-content-center">
                                <div className="form-group col-md-6">
                                    <label className='label fw-bold'>From</label>
                                    <select className='form-control form-control-sm input-type' onChange={(e) =>changestartpoint(e)}>
                                        <option value="">From</option>
                                        {source.map((item, i) => (
                                            <option key={i} value={item}>{item}</option>
                                        ))}
                                        {/* {!source?<span className="error">From</span>:null} */}
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className='label fw-bold'>To</label>
                                    <select className='form-control form-control-sm input-type' onChange={(e) => { setDestinationName(e.target.value)}}>
                                        <option value="">To</option>
                                        {destination.map((item, i) => (
                                            <option key={i} value={item}>{item}</option>
                                        ))}
                                        {/* {!destination?<span className="error">endpoint required</span>:null} */}
                                    </select>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className="form-group col-md-6" value={date} onChange={(e) => { setDate(e.target.value) }}>
                                        <label className='label fw-bold'>Departing On</label>
                                        <input type="date" className='form-control form-control-sm input-type' />
                                      <button type="button" className="search-btn" onClick={searchTrain}> <i className="fas mr-2 fa-search"></i>Search Trains </button><ToastContainer />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default TrainSearch;