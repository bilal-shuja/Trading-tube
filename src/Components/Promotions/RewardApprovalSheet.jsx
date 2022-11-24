import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import Filter from '../Filters/Filter';
import { toast } from "react-toastify";
import {Modal} from 'pretty-modal';
import axios from 'axios';

const RewardApprovalSheet = () => {
    const[promotionSheet , setPromotionSheet] = useState([]);
    const [memID , setMemID] = useState('');
    const[rewardAppStatus ,setRewardAppStatus] = useState('All')
    const [isOpen, setIsOpen] = useState(false)
    const[roleID , setRoleID] = useState('');
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

    function changingRewardAppStatus(){
      const rewardObj = {
        status:rewardAppStatus,
        member_id:memID
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}update_reward_status_bymid`,rewardObj)
      .then((res)=>{
        toast.info("Status Updated",{theme:"dark"});
        setTimeout(() => {
          window.location.reload(true)
        }, 3000);
      })
      .catch((error)=>{
        if(error.status === 401){
        toast.warn(error.data.message,{theme:"dark"});

        } 
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
                          <th>Review ScreenShot</th>
                          <th>Amount</th>
                          <th>Review CNIC</th>
                          <th>Status</th>
                          <th>Date</th>
                          
                          
                          {
                        roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                          <th>Approval</th>
                            }
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {
                          promotionSheet.map((items, index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              
                              <td>{items.member_id}</td>
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
                                  onClick={()=>window.open(`${process.env.REACT_APP_IMG_URL}${items.image}` , "_blank")}
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
                              {/* {
                                 items.status === "approved"? null: */}
                              {
                                roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                                 <td>                               
                                 <button onClick={() => {
                                 setIsOpen(true) 
                                 setMemID(items.member_id)}}  className="btn btn-outline-info btn-sm">
                                   <i className="fa-solid fa-circle-check"></i>
                                 </button>
                                </td>
                          }
                              {/* } */}
                          
                            </tr>
                            )
                          })
                        }
                       
                      </tbody>
                    </table>
                    <Modal  onClose={() => {setIsOpen(false)}} open={isOpen}>
                           <div className="card-body ">
                           <div className="form-group">
                           <p><b>Change Status</b></p>
                           <select className="form-control-sm" aria-label="Default select example"style={{ background: colorScheme.login_card_bg,color: colorScheme.card_txt_color,paddingRight:"11em"}}
                             onChange={(e) => setRewardAppStatus(e.target.value)}>
                             <option value="All">All</option>
                             <option value="approved">approved</option>
                             <option value="unapproved">unapproved</option>
                             </select>
                           </div>
                           <button onClick={()=>{changingRewardAppStatus()}} className="btn btn-outline-info btn-sm">Submit</button>
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