import React, { useState } from "react";
import './login.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { makeAPICall } from '../Services/api';



const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRevealpwd,setIsRevealpwd]=useState(false)
    const signIn = async () => {
        // const { email, password } = usestate;
        if (email === '' && password === '') {
            toast.error('email or password is empty')
            return
        }
         
       
        const response = await makeAPICall({
            endpoint: "userLogin",
            body: {
                email,
                password
            }
        })

        console.log("inside");

        if (response?.status) {
            console.log("response",response);
            localStorage.setItem("user",JSON.stringify(response.user))
            toast.success(response?.message)
            props.history.push('/home')
        } else {
            
            toast.error(response?.message)
            
        }
    }
    return (
        <section className="vh-100">
            
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                        <div className="card text-white">
                            {/* style="border-radius: 1rem;" */}
                            <div className="card-body p-3 text-center">

                                <div className=" mt-md-3 pb-2">

                                    <h2 className="fw-bold mb-1 text-uppercase">Login</h2>
                                    <p className="text-whitesmoke-50 mb-2">Please enter your Email and password!</p>

                                    <div className="form-outline form-black mb-1">
                                        <label className="form-label" >Email</label>
                                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} id="typeEmailX" className="form-control form-control-md input-type" required/>
                                        {!email ? <span className="error">Email required</span> : null}
                                    </div>

                                    <div className="form-outline form-black mb-1">
                                        <label className="form-label" >Password</label>
                                        <input type={isRevealpwd ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value) }} id="typePasswordX"
                                         className="form-control form-control-md input-type" />
                                        <input type="checkbox" className="wt-10" onClick={e=>setIsRevealpwd(prevState => !prevState)} title={isRevealpwd ? "Hide password" : "Show password"}/>show password
                                        {!password ? <span className=" d-flex error">Password required</span> : null}
                                    </div>

                                    <p className="small mb-2 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                    <button className="login-btn" type="submit" onClick={signIn}>Login</button>
                                    {/* btn-success btn-block btn-md */}

                                </div>
                                <Link className='link' to='/register'>
                                    <div>
                                        <p className="mb-">Don't have an account?
                                            <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
                                    </div></Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login    
