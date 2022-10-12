import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link} from 'react-router-dom';
import React,{useState} from 'react';
import colorScheme from '../Colors/Styles.js';
import axios from 'axios';

toast.configure()
const Login = () => {
    const [login, setLogin] = useState({
        email:'',
        password:''
      })
    
      const [loading , setLoading] = useState(false)
    //   const [loginUser , {isLoading,isError,isSuccess}] = useLoginUserMutation();
      
      const inputHandler = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
      };
      
      const submit =  (e)=>{
        e.preventDefault()
        setLoading(true)
        const userObj = {
          email:login.email,
          password:login.password
        }
  
    
        axios.post(`https://www.essayapi.khannburger.com/api/login`,userObj)
        .then((res) =>{
                
                if(res.data.user){
                  setLoading(false)
                  localStorage.setItem('login',true);
    
                  localStorage.setItem('email',login.email);
                  localStorage.setItem('password',login.password);
                  localStorage.setItem('id',res.data.user.id);
                  toast.info("Successfully logged In!");
                  setInterval(() => {
                    window.location.reload(true);
                  }, 1500);
                }
                else{
                  setLoading(false)
    
                  toast.warn("Invalid User");
                }
              
               
        })
        .catch((error) =>{
          setLoading(false)
            toast.warn("Wrong Credentials")
            console.log(error)
          }
        )
    
        setLogin({
          email:'',
          password:''
        });
      }
      return (
        <>
 <div className="hold-transition login-page" style={{background:colorScheme.card_bg_color}}>
  <div className="login-box">
    <div className="login-logo">
      <a href="#" style={{color:colorScheme.card_txt_color}}><b>Trading</b>&nbsp;Tube</a>
    </div>
    {/* /.login-logo */}
    <div className="login-bg-inner">
    <div className="card" style={{background:colorScheme.login_card_bg, boxShadow:colorScheme.box_shadow_one}}> 
      <div className="card-body">
        <p className="login-box-msg" style={{color:colorScheme.card_txt_color}}>Sign in to start your session</p>
        <form onSubmit={submit}>
            <label htmlFor="" className="form-label" style={{ color:colorScheme.card_txt_color}}>Email</label>
          <div className="input-group mb-3">
            <input type="email" className="form-control" name="email" placeholder="john@example.com" onChange={inputHandler}  style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope" />
              </div>
            </div>
          </div>
          <label htmlFor="" className="form-label" style={{ color:colorScheme.card_txt_color}}>Password</label>
          <div className="input-group mb-3">
            <input type="password" className="form-control" name="password" placeholder="Password" onChange={inputHandler} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
            
          </div>
                <div className="icheck-info d-flex ">
            <input type="checkbox" id="blankCheckbox" value="option1" />&nbsp;&nbsp;
            <label htmlFor="remember" style={{ color:colorScheme.card_txt_color, fontWeight:colorScheme.fontWeight_One, marginTop:"0.4em"}}>
              Remember Me
            </label>
          </div>

         
              <button type="submit" className="btn btn-outline-info btn-block mt-1">
                {
                    loading === true?"Loading...":"Sign In"
                }
              </button>
            {/* /.col */}
        </form>
        <div className="social-auth-links text-center mb-3">
          <p style={{ color:colorScheme.card_txt_color}}>- OR -</p>
          {/* <a href="#" className="btn btn-block btn-outline-primary">
            <i className="fab fa-facebook mr-2" /> Sign in using Facebook
          </a>
          <a href="#" className="btn btn-block btn-outline-danger">
            <i className="fab fa-google-plus mr-2" /> Sign in using Google+
          </a> */}
        </div>
        {/* /.social-auth-links */}
        {/* <p className="mb-1">
          <a href="forgot-password.html">I forgot my password</a>
        </p> */}
        <p className="text-center mb-0">
          <Link to="/Registeration" style={{ color:colorScheme.card_txt_color}}>New on our platform? <span  className="text-info">Create an account</span> </Link>
        </p>
      </div>
      {/* /.login-card-body */}
    </div>
    </div>
  </div>
  {/* /.login-box */}
</div>

    </>
  )
}

export default Login