import React from 'react';
import colorScheme from '../Colors/Styles.js';
import Profile from '../Images/profile.jpg';

const MemProfile = () => {
  return (
    <>
<div className="content-wrapper" style={{background:colorScheme.body_bg_color}}>
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Profile</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            {/* <li className="breadcrumb-item"><a href="#">Home</a></li> */}
            {/* <li className="breadcrumb-item active" style={{color:colorScheme.card_txt_color}}>User Profile</li> */}
          </ol>
        </div>
      </div>
    </div>
  </section>
<section className="content">
  <div className="container-fluid">
    <div className="row ">
    <div className="col-lg-4">
        <div className="card p-1" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
        <div className="card-body">
            <div className="text-center">
                <img className="img-fluid img-circle"src={Profile} alt="User_profile_picture" width={123} />
            </div>
            <h3 className="profile-username text-center">Sarib Arshad Khan</h3>
            <p className="text-muted text-center mt-4">React Native Developer</p>
            <p  className="text-muted text-center">Bay Area, San Francisco, CA</p>
            
            <div className="text-center">
            <button className="btn btn-info col-4">Follow</button>&nbsp;&nbsp;
            <button className="btn btn-outline-info col-4">Message</button>
            </div>
       
        </div>
        </div>
    </div>
    <div className="col-lg-8">
        <div className="card" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-3">
                    <i className="fa-solid fa-user fa-2x"></i>
                    </div>
                    <div className="col-sm-9 d-flex align-self-center">
                    <h5 class=" mb-0">Sarib Arshad Khan</h5>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-sm-3">
                    <i className="fa-solid fa-envelope fa-2x"></i>
                    </div>
                    <div className="col-sm-9 d-flex align-self-center">
                    <h5 class=" mb-0">Saribkhan84@gmail.com</h5>
                    </div>
                </div>

                <hr style={{color:colorScheme.card_txt_color}}/>

                <div className="row">
                    <div className="col-sm-3">
                    <i className="fa-solid fa-phone fa-2x"></i>
                    </div>
                    <div className="col-sm-9 d-flex align-self-center">
                    <h5 class=" mb-0">+92 310 4455217</h5>
                    </div>
                </div>

                    <hr />
                <div className="row">
                    <div className="col-sm-3">
                    <i className="fa-solid fa-address-card fa-2x"></i>
                    </div>
                    <div className="col-sm-9 d-flex align-self-center">
                    <h5 class=" mb-0">Bay Area, San Francisco, CA</h5>
                    </div>
                </div>
                <hr />
                
                <div className="row ">
                  <div className="col-sm-3">
                <i className="fa-solid fa-globe fa-2x"></i>
                  </div>

                   <div className="col-sm-9">
                    <i className="fa-brands fa-facebook-f fa-2x"></i>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     {/* </div>
                    <div className="col-sm-2">  */}
                    <i className="fa-brands fa-instagram fa-2x"></i>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     {/* </div>

                    <div className="col-sm-2"> */}
                    <i className="fa-brands fa-github fa-2x"></i>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* </div>

                    <div className="col-sm-2">  */}
                    <i className="fa-brands fa-twitter fa-2x"></i>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* </div>
                    <div className="col-sm-2">  */}
                    <i className="fa-brands fa-linkedin fa-2x"></i>
                    </div>
                    
                </div>
            </div>
            
        </div>
    </div>
    </div>
  </div>
</section>

</div>

    </>
  )
}

export default MemProfile