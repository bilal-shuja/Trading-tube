import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import {useLocation} from 'react-router-dom';
import { toast } from "react-toastify";
import Filter from '../Filters/Filter';
import {Modal} from 'pretty-modal';
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';

const UserTimelineSheet = () => {

    const location = useLocation();
    const ID = location.state.ID;
    const[userInfo , setUserInfo] = useState('');
    const[userDepo , setUserDepo] = useState([])


    function getUserInfo(){
        axios.post(`${process.env.REACT_APP_BASE_URL}fetchuserwithid/${ID}`)
        .then((res)=>{
            setUserInfo(res.data.data)
        })
        .catch((error)=>{
           return null
        })
    }

    function getDepositInfo(){
        const depoObj = {
            payer_id:ID
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}fetchdepositwithid`,depoObj)
        .then((res)=>{
            setUserDepo(res.data.data)
        })
        .catch((error)=>{
           return null
        })
    }


    useEffect(() => {
        getUserInfo()
        getDepositInfo()
    }, [])
    
  return (
    <>
    <div className="scroll-view-two scrollbar-secondary-two">
   <div className="content-wrapper"  style={{ background: colorScheme.body_bg_color }}>
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Timeline</h1>
          
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Timeline</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="timeline">
            {/* <div className="time-label">
              <span className="bg-white">10 Feb. 2014</span>
            </div> */}
            <div>
              <i className="fas fa-user bg-white" />
            {/* UserInfo Card */}
              <div className="timeline-item" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,}}>
                <span className="time"><i className="fas fa-calendar-days" />&nbsp;&nbsp;{userInfo.Idate}</span>
                <h3 className="timeline-header text-white">User Info</h3>
                <div className="timeline-body">
                 <div className="row">
                    <div className="col-lg-4">
                    <li>Name:&nbsp;<b>{userInfo.firstname}</b> </li>
                    <li>Last Name:&nbsp;<b>{userInfo.lastname}</b> </li>
                    <li>Phone:&nbsp;<b>{userInfo.phone}</b> </li>
                    </div>

                    <div className="col-lg-4">
                    <li>CNIC:&nbsp;<b>{userInfo.cnic}</b> </li>
                    <li>Email:&nbsp;<b>{userInfo.email}</b> </li>
                    <li>Referral Code:&nbsp;<b>{userInfo.referal_code}</b> </li>
                    </div>

                    <div className="col-lg-4">
                    <li>Username:&nbsp;<b>{userInfo.username}</b> </li>
                    <li>Question:&nbsp;<b>{userInfo.question}</b> </li>
                    <li>Answer:&nbsp;<b>{userInfo.answer}</b> </li>
                    </div>

                 </div>
      

                </div>
                {/* <div className="timeline-footer">
                  <a className="btn btn-primary btn-sm">Read more</a>
                  <a className="btn btn-danger btn-sm">Delete</a>
                </div> */}
              </div>
            {/* UserInfo Card */}

            </div>
            
            <div>
              <i className="fas fa-briefcase bg-white" />
              <div className="timeline-item" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,}}>
                <span className="time"><i className="fas fa-clock" /> 5 mins ago</span>
                <h3 className="timeline-header text-white">Deposite Info</h3>
                <div className="timeline-body">
                 <div className="row">
                {
                    userDepo.map((items)=>{
                        return(
                            <div className="col-lg-4">
                    <li>Name:&nbsp;<b>{userInfo.firstname}</b> </li>
                    <li>Last Name:&nbsp;<b>{userInfo.lastname}</b> </li>
                    <li>Phone:&nbsp;<b>{userInfo.phone}</b> </li>
                    </div>
                        )
                    })
                }
                    

                    

                 </div>
      

                </div>
               
              </div>
            </div>

            <div>
              <i className="fas fa-comments bg-yellow" />
              <div className="timeline-item">
                <span className="time"><i className="fas fa-clock" /> 27 mins ago</span>
                <h3 className="timeline-header"><a href="#">Jay White</a> commented on your post</h3>
                <div className="timeline-body">
                  Take me to your leader!
                  Switzerland is small and neutral!
                  We are more like Germany, ambitious and misunderstood!
                </div>
                <div className="timeline-footer">
                  <a className="btn btn-warning btn-sm">View comment</a>
                </div>
              </div>
            </div>
            <div className="time-label">
              <span className="bg-green">3 Jan. 2014</span>
            </div>
            <div>
              <i className="fa fa-camera bg-purple" />
              <div className="timeline-item">
                <span className="time"><i className="fas fa-clock" /> 2 days ago</span>
                <h3 className="timeline-header"><a href="#">Mina Lee</a> uploaded new photos</h3>
                <div className="timeline-body">
                  <img src="https://placehold.it/150x100" alt="..." />
                  <img src="https://placehold.it/150x100" alt="..." />
                  <img src="https://placehold.it/150x100" alt="..." />
                  <img src="https://placehold.it/150x100" alt="..." />
                  <img src="https://placehold.it/150x100" alt="..." />
                </div>
              </div>
            </div>
            <div>
              <i className="fas fa-video bg-maroon" />
              <div className="timeline-item">
                <span className="time"><i className="fas fa-clock" /> 5 days ago</span>
                <h3 className="timeline-header"><a href="#">Mr. Doe</a> shared a video</h3>
                <div className="timeline-body">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/tMWkeBIohBs" allowFullScreen />
                  </div>
                </div>
                <div className="timeline-footer">
                  <a href="#" className="btn btn-sm bg-maroon">See comments</a>
                </div>
              </div>
            </div>
            <div>
              <i className="fas fa-clock bg-gray" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
    </div>

    </>
  )
}

export default UserTimelineSheet