import React,{useEffect,useState} from "react";
import './Profile.css'
import { makeAPICall } from "../Services/api";
import { toast } from "react-toastify";
import moment from "moment";

const Activity=()=>{
    const [postName, setpostName] = useState(JSON.parse(localStorage.getItem("user")))
   const [postData,setpostData]=useState([])
    useEffect(() => {
        GetTrains()
    }, [])


    const cancelBook = async(id) =>{
        console.log("cancel");
        if(window.confirm("If you want to cancel the Ticket")){
        
        const response = await makeAPICall({
            
            endpoint: "cancelTrain",
           body : {
            bookingId : id
            }
            
        })
        if(response?.status){
            console.log("cancelResponse",response); 
            toast.success("sucessfully Cancelled")
        }
        
        }
    }

    // BookingDetails-Profile
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
            setpostData(response.data)

            toast.success(response?.message);

        }

    }
    const dateFormat=(date)=>{
        
        return moment(date).format("DD/MM/YYYY")
        
        }
    

 return(
       
    postData.map((item,i)=>(
            <div className="mb-2 card-1" >
            
            <div class="card-body" key={i}>
                    <div className="card-title clearfix" >
                    <div className="float-left text-uppercase mb-2"><b className="text-black">{item.trainDetails[0].trainName}</b>
                  {  item.status==1? <button type="button" className="btn btn-danger btn-sm float-right"onClick={()=>cancelBook(item._id)} >Cancel Ticket</button>:<div class="float-right">
                                             <span class="text-danger">Cancelled</span>
                                          </div>}

                    </div>
                    <div className="float-left text-uppercase"> {item.endPointsDetails.startPoint}-{item.endPointsDetails.destPoint}</div>
                        </div>
                        <div className="float-left "><span className="d-block">Boarding On:<b className=" font-size text-black">{dateFormat(item.bookingDate)}</b></span></div>
                        <div className="float-left "><small className="d-block">Departure Time:<b className="font-size text-black"> {item.endPointsDetails.departureTime}</b></small></div>
                        <div className="float-left "><small className="d-block">Arrival Time:<b className="font-size text-black"> {item.endPointsDetails.arrivalTime}</b></small></div>
                            <div className="float-left"><span className="span-color">Seat No:<b className="font-size text-black"> {item.seatNo} </b></span></div>
                        </div>
                </div>)
 ))
        // </div>



    // </div>


}


export default Activity;