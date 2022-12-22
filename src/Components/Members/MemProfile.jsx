import SendNotification from '../Notifications/SendNotifications';
import React,{useState , useEffect} from 'react';
import colorScheme from '../Colors/Styles.js';
import Profile from '../Images/avatar5.png';
import axios from 'axios';

const MemProfile = () => {

  const[mem , setMem] = useState('');
  const[amount , setAmount] = useState('');
  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem('user');
      let parseUserObj = JSON.parse(userObj)
      
      if (parseUserObj !== null) {
        gettingMembers(parseUserObj.id);
        gettingTotalAmount(parseUserObj.id)
      
      }

    } catch {
      return null;
    }
  }

  function gettingMembers(id){
    axios.post(`${process.env.REACT_APP_BASE_URL}fetchuserwithid/${id}`)
    .then((res)=>{
      setMem(res.data.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }


  function gettingTotalAmount(id){
    const memIdObj ={
      user_id:id
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}fetch_totals`,memIdObj)
    .then((res)=>{
      setAmount(res.data.Total_balance)
    })
    .catch((error)=>{
      console.log(error)
    })
  }



  useEffect(() => {
    SetLocalLogin()
  }, [])
  

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
            {/* <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}} onClick={logOut}><i className="fa-solid fa-lock fa-2x"></i></a></li> */}

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
            <h3 className="profile-username text-center">{mem.username}</h3>
            <p className="text-muted text-center mt-4">Trading Tube Co.</p>
            <p  className="text-muted text-center">Bay Area, San Francisco, CA</p>
            
            <div className="text-center">
            <button className="btn btn-info col-4" onClick={()=>{
              SendNotification("userID","Withdrawal Rejection", "queryOne")
              
            }}>Follow</button>&nbsp;&nbsp;
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
                    <h5 class=" mb-0">{mem.username}</h5>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-sm-3">
                    <i className="fa-solid fa-envelope fa-2x"></i>
                    </div>
                    <div className="col-sm-9 d-flex align-self-center">
                    <h5 class=" mb-0">{mem.email}</h5>
                    </div>
                </div>

                <hr style={{color:colorScheme.card_txt_color}}/>

                <div className="row">
                    <div className="col-sm-3">
                    <i className="fa-solid fa-phone fa-2x"></i>
                    </div>
                    <div className="col-sm-9 d-flex align-self-center">
                    <h5 class=" mb-0">{mem.phone}</h5>
                    </div>
                </div>

                    <hr />
                <div className="row">
                    <div className="col-sm-3">
                    <i className="fa-solid fa-money-bill-wave fa-2x"></i>
                    </div>
                    <div className="col-sm-9 d-flex align-self-center">
                    <h5 class=" mb-0">{amount}</h5>
                    </div>
                </div>
                <hr />
                
                <div className="row ">
                  <div className="col-sm-3">
                <i className="fa-solid fa-file-signature fa-2x"></i>
                  </div>
                  <h4>{`Your referral code is "${mem.referal_code}"`}</h4>
                    
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