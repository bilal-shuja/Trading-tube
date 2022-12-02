import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import Filter from '../Filters/Filter';
import { toast } from "react-toastify";
import {Modal} from 'pretty-modal';
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';

const RewardApprovalSheet = () => {
    const[promotionSheet , setPromotionSheet] = useState([]);
    const [memID , setMemID] = useState('');
    const[rewardRejMessage ,setRewardRejMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const[roleID , setRoleID] = useState('');
    const[getRewardStat , setRewardStat] = useState('')
    const PromotionSheetIdentifier = "PromotionSheet";


    function gettingRewards (){
      axios.post(`${process.env.REACT_APP_BASE_URL}fetch_all_rewards`)
      .then((res)=>{
        setPromotionSheet(res.data.Rewards)
      })
      .catch((error)=>{
        console.log(error)
      })
    }

    function changingRewardAppStatus(memID){
      const rewardObj = {
        member_id:memID
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}update_reward_status_bymid`,rewardObj)
      .then((res)=>{
        if(res.data.status === '200'){
          toast.info(`Reward ${res.data.message}`,{theme:"dark"});
          setTimeout(() => {
            window.location.reload(true)
          }, 3000);
        }
        else{
          toast.info(`Reward${res.data.message}`,{theme:"dark"});

        }
     
      })
      .catch((error)=>{
        if(error.status === "401"){
        toast.warn(error.data.message,{theme:"dark"});

        } 
        toast.warn("Something went wrong",{theme:"dark"});
      })
      

    }


    
    function RewardRejection(){
      axios.post(`${process.env.REACT_APP_BASE_URL}delete_reward/${memID}`)
      .then((res)=>{
        if(res.data.status === '200'){
          toast.info(`Reward Approval Rejected!`,{theme:"dark"});
          setTimeout(() => {
            window.location.reload(true)
          }, 3000);
        }
        else{
          toast.info(`${res.data.message}`,{theme:"dark"});

        }

     
      })
      .catch((error)=>{
        if(error.status === "401"){
        toast.warn(error.data.message,{theme:"dark"});

        } 
        toast.warn("Something went wrong",{theme:"dark"});
      })
      

    }

    function geneNotification(){
      const notifiObj ={
        receiver_id:memID,
        body:rewardRejMessage,
        title:"Reward Rejection"
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}post_notification`,notifiObj)
      .then((res)=>{
        if(res.data.status === '200'){
          toast.info("Notified to User",{theme:"dark"});
        }
        else{
          toast.info(`${res.data.message}`,{theme:"dark"});

        }
      })
      .catch((error)=>{
        toast.warn("Something went wrong",{theme:"dark"});

      })
    }

    function gettingPromoStatus(){
      axios.get(`${process.env.REACT_APP_BASE_URL}getcheck`)
      .then((res)=>{
        setRewardStat(res.data.check)
      })
      .catch((error)=>{
        return error
      })
    }

    function startPromo(){
      const startPromoObj = {
        check :"0"
      
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}updatecheck`,startPromoObj)
      .then((res)=>{
        gettingPromoStatus()

        if(res.data.status === '200'){

          toast.info("Promotion Active",{theme:"dark"});
        }
        else{
          toast.error(res.data.message,{theme:"dark"});

        }
        console.log(res)
      })
      .catch((error)=>{
        toast.warn("Something went wrong",{theme:"dark"});
      })
      

    }

    
    function endPromo(){
      const endPromoObj = {
        check :"1"
      
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}updatecheck`,endPromoObj)
      .then((res)=>{
        gettingPromoStatus()
        if(res.data.status === '200'){
          toast.info("Promotion Removed",{theme:"dark"});
        }
        else{
          toast.error(res.data.message,{theme:"dark"});

        }
      })
      .catch((error)=>{
        toast.warn("Something went wrong",{theme:"dark"});
      })
      

    }
    function gettingDate(val){
      setPromotionSheet(val)
    }
    function gettingPrice(val){
      setPromotionSheet(val)
    } 

    const SetLocalLogin = async () => {
      try {
        let userObj = await localStorage.getItem('user');
        let parseUserObj = JSON.parse(userObj)
        
        if (parseUserObj !== null) {
          setRoleID(parseUserObj.role_id);
        }
    
      } catch {
        return null;
      }
    }
    

    useEffect(() => {
      SetLocalLogin()
      gettingRewards()
      gettingPromoStatus()
    }, [])
    
  return (
    <>
<div className="scroll-view-two scrollbar-secondary-two">
    <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                Reward Approvals
                </h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div
                  className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
                  <div className="card-header">
                    <h5>Reward Approval Sheet</h5>
                    <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>

                    {
                    roleID === "2"|| roleID === "3"|| roleID === "4" ? null:

                    <div className="float-right">
                      {
                        getRewardStat !=="0"?
                        <>
                        <button className="btn btn-outline-info btn-sm" onClick={()=>startPromo()}>
                        Start Promotion
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;
                        </>
                        :
                        <button className="btn btn-outline-danger btn-sm" onClick={()=>endPromo()}>
                        Stop Promotion
                      </button> 
                      }
                    
                       
                    </div>
                    
                    }
                  </div>
                  <div className="card-body table-responsive p-2">
                  <div className="row">
                  <Filter PromotionData={promotionSheet} DateFilter={gettingDate}  PriceStatus={gettingPrice} PromotionSheetIdentifier={PromotionSheetIdentifier}/>
                    
                  </div>
                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Member Name</th>
                          <th>Review CNIC</th>
                          <th>Amount</th>
                          <th>Review ScreenShot</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Time</th>
                          
                          
                          {
                        roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                          <th>Actions</th>
                            }
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {
                          promotionSheet.map((items, index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              
                              <td>{items.id}</td>
                              <td>{items.member_name}</td>
                              <td>
                                <img src={`${process.env.REACT_APP_IMG_URL}${items.image}`}  width={50}
                                  onClick={()=>window.open(`${process.env.REACT_APP_IMG_URL}${items.image}` , "_blank")}
                                  style={{cursor:"pointer"}}
                                  alt=""
                                />
                              </td>
                              <td>{items.amount}</td>
                              <td>
                                <img src={`${process.env.REACT_APP_IMG_URL}${items.image_2}`}  width={50}
                                  onClick={()=>window.open(`${process.env.REACT_APP_IMG_URL}${items.image_2}` , "_blank")}
                                  style={{cursor:"pointer"}}
                                  alt=""
                                />
                              </td>
                              {
                                items.status === "approved"?
                                <td style={{color:"#64dd17"}}>{items.status}</td>
                                :
                                <td style={{color:"#ff1744"}}>{items.status}</td>

                              }
                              <td>{items.Idate}</td>
                            <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>

                              {/*  items.status === "approved"? null: */}
                              {
                                roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                                 <td> 
                                  <div className="d-flex">
                                  <button onClick={() => {
                                //  setIsOpen(true)
                                //  setMemID(items.member_id)
                                 changingRewardAppStatus(items.member_id)
                                }} 
                                 className="btn btn-outline-info btn-sm">
                                   <i className="fa-solid fa-circle-check"></i>
                                 </button>&nbsp;&nbsp;
                                 <button onClick={() => {
                                 setIsOpen(true)
                                 setMemID(items.member_id)
                                }} 
                                 className="btn btn-outline-danger btn-sm">
                                   <i className="fa-solid fa-circle-xmark"></i>
                                 </button>

                                 
                                  </div>                   
                              
                                </td>
                          }
                          
                            </tr>
                            )
                          })
                        }
                       
                      </tbody>
                    </table>
                    <Modal 
                    ariaLabelledby="modal1_label"
                    ariaDescribedby="modal1_desc"
                    onClose={() => {setIsOpen(false)}} open={isOpen}>
                           <div className="card-body ">
                           <div className="form-group">
                           <label htmlFor="exampleInputEmail1">Rejection Reason*</label>
                            <textarea
                              type="text" className="form-control" id="exampleInputEmail1"  placeholder="Enter Rejection Reason" onChange={(e)=> setRewardRejMessage(e.target.value)} row={4} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                           </div>
                           <button onClick={()=>{
                            RewardRejection()
                            geneNotification()
                          }} className="btn btn-outline-info btn-sm">Submit</button>
                           </div>
                           </Modal>
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

export default RewardApprovalSheet