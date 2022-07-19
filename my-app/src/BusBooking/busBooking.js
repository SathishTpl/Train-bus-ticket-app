import React,{useState} from "react";
import './busBooking.css';
import {  toast } from 'react-toastify';
import { makeAPICall } from "../Services/api";





const BusBooking = (props) => {
    const [postData, setPostData] = useState(JSON.parse(localStorage.getItem("searchtrain")))
    const [postName,setpostName] =useState(JSON.parse(localStorage.getItem("user")))

    
    const bookConfirm = async()=>{
        console.log("inside",props.trainDetails)
        
        const response=await makeAPICall({
            endpoint:"bookTrain",
            
                body:{
                    date:postData.date,
                    trainNo:props.trainDetails.trainInfo.trainNo,
                    seatNo:"SN"+(props.trainDetails.seatAvailability - 1),
                    noofseats:1,
                    endPointId:props.trainDetails._id,
                    userId:postName._id

                }
            
        })
        if(response?.data){
            console.log("response",response);
            toast.success(response?.message);
            props.history.push('/Profile');
        }
        else{
            toast.error(response?.err.message)
        }
       
        
    }

   
    return (
    
        <div className="confirm-wrapper d-flex justify-content-center mr-0 align-item-center">
            <div className="w-100">
                <h3 className="mb-3">Booking Confirmation</h3>

                <hr />
                <div className="clearfix">
                    <table className="table table-bordered">
                        <tbody className="table-bg">
                       
                            <tr>
                                <td>From</td>
                                <td className="fw-bold">{postData.source}</td>
                            </tr>
                            <tr>
                                <td>To</td>
                                <td className="fw-bold">{postData.destination}</td>
                            </tr>
                        

                            <tr>
                                <td>Train</td>
                                <td className="fw-bold">{props.trainDetails.trainInfo.trainName}</td>
                            </tr>
                            

                            <tr>
                                <td>Boarding on</td>
                                <td className="fw-bold">{postData.date}</td>
                            </tr>
                            
                            <tr>
                                <td>Departure@</td>
                                <td className="fw-bold">{props.trainDetails.departureTime}</td>
                            </tr>
                              
                              
                            <tr>
                                <td>Arrival@</td>
                                <td className="fw-bold">{props.trainDetails.arrivalTime}</td>
                            </tr>
                            

                           
                            <tr>
                                <td>Fare</td>
                                <td className="fw-bold">Rs.{props.trainDetails.fare}</td>
                            </tr>       
                        

                            
                            <tr>
                                <td>No. of Seats</td>
                                <td className="fw-bold">1{props.trainDetails.totalSeats}</td>
                            </tr>
                            
                            <tr>
                                <td>Username</td>
                                <td className="fw-bold">{postName.name}</td>
                            </tr>
                        
                        </tbody>
                      

                        
                    </table>
                    <div className="d-flex justify-content-center">
                            <button type="submit" className="btn pushable" id="Book" onClick={bookConfirm}><span className="push">Book</span></button>
                            </div>
                </div>
            </div>
            
        </div>


    );
}
export default BusBooking;