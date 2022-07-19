import './register.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeAPICall } from '../Services/api';


const Register =(props)=> {

  const[username, setUsername]=useState([]) 
  const[email, setEmail]=useState('')
  const[password, setPassword]=useState('')
  const[gender,setGender]=useState('')
  const[number,setNumber]=useState('')

  const Register = async () =>{
    if(username != '' && password != '' && gender != '' && email != '' && number != '')
    {
      console.log("values",username,email,gender,password,number)
    }
    else
    {
      toast.error("email or password required")
    }

    console.log("inside");

    localStorage.setItem("username",JSON.stringify({name:username}))
    console.log(username)
    const response = await makeAPICall({
      endpoint: "usercreateUser",
      body: {
        name:username,
        email:email,
        gender:gender,
        password:password,
        phone:number
      }
    })
    if (response?.status) {
      toast.success(response?.message+"  Please continue with login")
      props.history.push('/login')
  } else {
     
          toast.error(response?.message)
   
  }
  }

  return (
    <section className="vh-100 ">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-4 col-md-5 col-xl-4">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-3 p-md-3">

                <h2 className="mb-2 pb-2 pb-md-0 mb-md-3 text-white fw-bold text-uppercase">Register</h2>

                <div className="row">
                  <div className="col-md-12 mb-1">

                    <div className="form-outline">
                      <label className="form-label text-white">User Name</label>
                      <input type="text" placeholder="Enter the username"   
                      value={username} onChange={(e)=>{setUsername(e.target.value)}} 
                      id="firstName"
                       className="form-control form-control-sm input-type" />
                      {!username?<span className='error'>username required</span>:null}
                    </div>

                  </div>


                  <div className="col-md-12 mb-1 ">

                    <div className="form-outline m-auto">
                      <label className="form-label text-white">Email</label>
                      <input type="email" placeholder="Enter the email" 
                       value={email} onChange={(e)=>{setEmail(e.target.value)}}
                        id="emailAddress" 
                       className=" form-control form-control-sm input-type" />
                      {!email?<span className='error' >Email required</span>:null}
                    </div>

                  </div>
                  <div className="col-md-12 mb-1 ">

                    <div className="form-outline m-auto">
                      <label className="form-label text-white" >Gender</label>
                      <select  className="select form-control form-control-sm input-type" 
                      placeholder="gender" 
                      value={gender} onChange={(e)=>setGender(e.target.value)} >
                        <option value="">Select gender</option>
                        <option  value="1" >Male</option>
                        <option  value="2" >Female</option>
                      </select>
                      {!gender?<span className='error'>Gender required</span>:null}
                    </div>

                  </div>
                  <div className="col-md-12">
                    <div className="form-outline mb-1 ">
                      <label className="form-label text-white" >Password</label>
                      <input type="password" placeholder="Enter the password" 
                       value={password} onChange={(e)=>{setPassword(e.target.value)}}
                        id="typePasswordX" 
                        className="form-control form-control-sm input-type" />
                      {!password?<span className='error'>Password required</span>:null}
                    </div>

                  </div>
                  <div className="col-md-12  pb-2">

                    <div className="form-outline">
                      <label className="form-label text-white">Phone Number</label>
                      <input type="phone" placeholder="Enter the phonenumber"  
                      value={number} onChange={(e)=>{setNumber(e.target.value)}}
                       id="phoneNumber" 
                       className="form-control form-control-sm input-type" />
                      {!number?<span className='error'>phonenumber required</span>:null}
                    </div>

                  </div>
                </div>
                {/* <Link className='link' to='/login'> */}
                <div className="d-flex justify-content-center">
                  <button type="button" onClick={Register}
                   className="reg-btn">Register</button><ToastContainer/>
                </div>
                {/* btn btn-success btn-block btn-md gradient-custom-4 text-body */}
                {/* </Link> */}

                <p className="text-center text-muted mt-2 mb-0">Have already an account? <Link className='link' to = 'login'><a href="#!" className="fw-bold text-body"><u className=''>Login here</u></a></Link></p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
