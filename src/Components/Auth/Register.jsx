import React from 'react';
import {Link} from 'react-router-dom';
import colorScheme from '../Colors/Styles.js';


const Register = () => {
  return (
    <div className="wrapper ">
    <div class="hold-transition register-page " style={{background:colorScheme.card_bg_color}}>
<div className="register-box">
  <div className="register-logo">
    <a href="#" style={{color:colorScheme.card_txt_color}}><b>Trading</b>Tube</a>
  </div>
  <div className="card"  style={{background:colorScheme.login_card_bg, boxShadow:colorScheme.box_shadow_one}}>
    <div className="card-body">
      <p className="login-box-msg" style={{color:colorScheme.card_txt_color}}>Register a new membership</p>
      <form action="#" method="post">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Username"  style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Email"  style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password"  style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Retype password"  style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="number" className="form-control" placeholder="Phone"  style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-phone" />
            </div>
          </div>
        </div>
       
        {/* <div className="row"> */}
          {/* <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" />
              <label htmlFor="agreeTerms">
                I agree to the <a href="#">terms</a>
              </label>
            </div>
          </div> */}
          {/* /.col */}
          {/* <div className="col-4"> */}
            <button type="submit" className="btn btn-outline-info btn-block ">Register</button>
          {/* </div> */}
          {/* /.col */}
        {/* </div> */}
      </form>
   <p className="text-center mt-4 mb-0">
      <Link to="/"  style={{ color:colorScheme.card_txt_color}}>Already have an account? &nbsp; <span className="text-info">Sign in instead</span> </Link>
   </p>
    </div>
    {/* /.form-box */}
  </div>{/* /.card */}
</div>


</div>
        
    </div>
  )
}

export default Register