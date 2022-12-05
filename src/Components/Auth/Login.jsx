import {useLoginPostMutation} from '../services/Auth.js';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import React,{useState} from 'react';

toast.configure()
const Login = () => {
  const [loginPost , result] = useLoginPostMutation();
    const [login, setLogin] = useState({
        phone:'',
        password:''
      })
    
      const [loading , setLoading] = useState(false);
      const [input , setInput] = useState(false);
      
      const inputHandler = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
      };
      
      const userLogin = async (e)=>{
        e.preventDefault()
        setLoading(true)
        const loginObj = {
          phone:login.phone,
          password:login.password
        }
  
      
          await loginPost(loginObj).unwrap()
          .then((res) =>{
  
                  if(res.user.role_id !== 5){
                    setLoading(false)
                    setInput(false)
                    localStorage.setItem('login',true);
                    localStorage.setItem('user',JSON.stringify(res.user));
                    toast.info("Successfully logged In!",{theme:"dark"});
                    setInterval(() => {
                      window.location.reload(true);
                    }, 1500);
                  }
                  else if(login.email === "" && login.password === "")
                  {
                    toast.warn("Input fields are empty")
                    setLoading(false)
                    setInput(true)
                  }
                  else{
                    setLoading(false)
                    setInput(true)

                  }
          })
          .catch((error) =>{
            if(error.status === 401){
              setLoading(false)
              setInput(true)
                toast.warn(error.data.message,{theme: "dark"})
            }
            else{
              setLoading(false)
              setInput(true)
                toast.warn("Wrong Credentials",{theme: "dark"})
              
            }
          
            }
          )
        

        
        // setLogin({
        //   email:'',
        //   password:''
        // });

      }
      function displayMessage(){
        toast.info("Kindly contact your service provider",{theme:"dark"})
      }
    
      return (
        <>
 <div className="hold-transition login-page" style={{background:colorScheme.card_bg_color}}>
  <div className="login-box">
    <div className="login-logo">
      <a href="#b" style={{color:colorScheme.card_txt_color}}><b>Trading</b>&nbsp;Tube</a>
    </div>
    {/* /.login-logo */}
    <div className="login-bg-inner">
    <div className="card" style={{background:colorScheme.login_card_bg, boxShadow:colorScheme.box_shadow_one}}> 
      <div className="card-body">
        <p className="login-box-msg" style={{color:colorScheme.card_txt_color}}>Sign in to start your session</p>
        <form onSubmit={userLogin}>
            <label htmlFor="" className="form-label" style={{ color:colorScheme.card_txt_color}}>Phone</label>
          <div className="input-group mb-3">
            <input type="number" className={login.phone ===" " && input === true ? "form-control border border-danger":"form-control"} name="phone" placeholder="Enter Phone no" value={login.phone} onChange={inputHandler}  style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-phone" />
              </div>
            </div>
          </div>
          <label htmlFor="" className="form-label" style={{ color:colorScheme.card_txt_color}}>Password</label>
          <div className="input-group mb-3">
            <input type="password" className={login.password ===" " && input === true ? "form-control border border-danger":"form-control"} name="password" placeholder="Password"  value={login.password} onChange={inputHandler} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
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
          <a  onClick={()=>{displayMessage()}} style={{ color:colorScheme.card_txt_color, cursor:"pointer"}}>New on our platform? </a>
        </p>
        {/* <span  className="text-info">Create an account</span> */}
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