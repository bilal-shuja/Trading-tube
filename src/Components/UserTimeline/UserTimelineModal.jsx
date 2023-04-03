import UserTimelineModalSub from '../UserTimeline/UserTimelineModalSub';
import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import Moment from 'react-moment';
import Modal from 'react-modal';
import axios from 'axios';
import 'moment-timezone';

const UserTimelineModal = ({ID,isShow,onHide}) => {

  const[userWithdrawal , setUserWithdrawal] = useState([]);
  const[userTeamOne , setUserTeamOne] = useState([]);
  const[userTeamTwo , setUserTeamTwo] = useState([]);
  const[userTotal , setUserTotal] = useState('');
  const[userInfo , setUserInfo] = useState('');
  const[userDepo , setUserDepo] = useState([]);
  const[getReferral, setReferral] = useState([]);
  const [getInvestment , setInvestment] = useState([]);
  const[roleID , setRoleID] = useState('');
  const[showTotalMemOne , setShowTotalMemOne] = useState('');
  const[showTotalMemTwo , setShowTotalMemTwo] = useState('');

  const[display , setDisplay] = useState(0);

  // const [isShowUserModal,setShowUserModal] = useState(false)

  //   function onHide(){
  //     setShowUserModal(false)
  //   }
  
    function handleDisplay(val){

          setTimeout(() => {
            setDisplay(val)
          }, 1000);
    }


    
  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem('user');
      let parseUserObj = JSON.parse(userObj)
      
      if (parseUserObj !== null) {
        setRoleID(parseUserObj.role_id)
      }

    } catch {
      return null;
    }
  }


    function  getUserInfo(){
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

    function getWithdrawalInfo(){
      const withdrawalObj = {
        user_id:ID
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}fetch_withdrawl_request_by_userid`,withdrawalObj)
    .then((res)=>{
      setUserWithdrawal(res.data.data)
    })
    .catch((error)=>{
       return null
    })
    }

    function getUserInvestments(){
      const investObj = {
        user_id:ID
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}fetch_investment_uid`,investObj)
      .then((res)=>{
        setInvestment(res.data.data)
      })
      .catch((error)=>{
         return null
      })
    }
    
  console.log(getInvestment)


    
    function getAllUsers(){
      const withdrawalObj = {
        user_id:ID
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}get_my_team`,withdrawalObj)
    .then((res)=>{
      setUserTeamOne(res.data.first_members)
      setUserTeamTwo(res.data.second_members)
      setShowTotalMemOne(res.data.first_members_count)
      setShowTotalMemTwo(res.data.second_members_count)
    })
    .catch((error)=>{
       return null

    })
    }



    function getUserTotals(){
    
      const userTotalObj = {
        user_id:ID
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}fetch_totals`,userTotalObj)
    .then((res)=>{
      setUserTotal(res.data)
    })
    .catch((error)=>{
       return null
    })
    }

    function gettingReferralTotal(){
      const userObj = {
        user_id:ID
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}fetch_referral`,userObj)
    .then((res)=>{
      setReferral(res.data.data)
    })
    .catch((error)=>{
       return null
    })
    }

    
    function GetTeamOne({items , index}){
      const [isShowUserModal,setShowUserModal] = useState(false)

      function onHide(){
        setShowUserModal(false)
      }
      return(
        <>
                           
        <div key={index+1} className="col-lg-4">
        <li className="m-3 text-warning" style={{listStyle:"none", fontSize:"1.5em"}}>User#<b>{index+1}</b>
        &nbsp;&nbsp; 
        <button className="btn btn-outline-primary btn-sm" onClick={()=>{setShowUserModal(true)}}>
          <i className="fa-solid fa-timeline"></i>
          </button>
        </li>
        <li>Username:&nbsp;<b>{items.username}</b> </li>
        <li>First Name:&nbsp;<b>{items.firstname}</b> </li>
        <li>Last Name:&nbsp;<b>{items.lastname}</b> </li>

        
        <li>Referral Code:&nbsp;<b>{items.referal_code}</b> </li>
        <li>Level:&nbsp;<b>{items.level}</b> </li>
        <li>Email:&nbsp;<b>{items.email}</b></li>
        <li>Phone:&nbsp;<b>{items.phone}</b></li>
        <li>Cnic:&nbsp;<b>{items.cnic}</b> </li>

        <li>Question:&nbsp;<b>{items.question}</b></li>
        <li>Answer:&nbsp;<b>{items.answer}</b> </li>

        <li style={{listStyle:"none"}}> <i className="fas fa-calendar-days"/>&nbsp;&nbsp;<b>{items.Idate}</b></li> 

        <li style={{listStyle:"none"}}> <i className="fas fa-clock"/>&nbsp;&nbsp;&nbsp;<b><Moment date={items.updated_at} format="hh:mm:ss"/></b></li>
        </div>

        
        {
        isShowUserModal === true &&
        <UserTimelineModalSub
        ID = {items.id}
        // ariaHideApp={false}
        appElement={document.getElementById('root') || undefined}
        isShow = {isShowUserModal}
        onHide={onHide}
      />
      } 
     

        </>
      )
    }

    function GetTeamTwo({items , index}){
      const [isShowUserModal,setShowUserModal] = useState(false)

      function onHide(){
        setShowUserModal(false)
      }

      return(
        <>
        <div key={index+1} className="col-lg-4">
        <li className="m-3 text-warning" style={{listStyle:"none", fontSize:"1.5em"}}>User#<b>{index+1}</b>
        &nbsp;&nbsp; 
        <button className="btn btn-outline-primary btn-sm" onClick={()=>{setShowUserModal(true)}}>
          <i className="fa-solid fa-timeline"></i>
          </button>
        </li>
        <li>Username:&nbsp;<b>{items.username}</b> </li>
        <li>First Name:&nbsp;<b>{items.firstname}</b> </li>
        <li>Last Name:&nbsp;<b>{items.lastname}</b> </li>

        
        <li>Referral Code:&nbsp;<b>{items.referal_code}</b> </li>
        <li>Level:&nbsp;<b>{items.level}</b> </li>
        <li>Email:&nbsp;<b>{items.email}</b></li>
        <li>Phone:&nbsp;<b>{items.phone}</b></li>
        <li>Cnic:&nbsp;<b>{items.cnic}</b> </li>

        <li>Question:&nbsp;<b>{items.question}</b></li>
        <li>Answer:&nbsp;<b>{items.answer}</b> </li>
        <li style={{listStyle:"none"}}> <i className="fas fa-calendar-days"/>&nbsp;&nbsp;<b>{items.Idate}</b></li> 

        <li style={{listStyle:"none"}}> <i className="fas fa-clock"/>&nbsp;&nbsp;&nbsp;<b><Moment date={items.updated_at} format="hh:mm:ss"/></b></li>
        </div>

        {
        isShowUserModal === true &&
        <UserTimelineModalSub
        ID = {items.id}
        // ariaHideApp={false}
        appElement={document.getElementById('root') || undefined}
        isShow = {isShowUserModal}
        onHide={onHide}
      />
      } 
     
        </>
      )

    }


    function ReferralTimeline({items , index}){
      const [isShowUserModal,setShowUserModal] = useState(false)

      function onHide(){
        setShowUserModal(false)
      }

      return(
        <>
         <div className="d-flex mt-3">
                <h4 className="text-bold">Referred by:&nbsp;&nbsp;{items.username}
                &nbsp;&nbsp;({items.referal_code})&nbsp;&nbsp;

                  <button className="btn btn-outline-primary" onClick={ ()=>{
                    setShowUserModal(true)                  
                    }}>
                    <i className="fa-solid fa-timeline"></i>
                  </button> <br/>
                Ph#({items.phone})
                </h4>
                </div>


                {
                  isShowUserModal === true &&
                  <UserTimelineModalSub
                  ID = {items.id}
                  // ariaHideApp={false}
                  appElement={document.getElementById('root') || undefined}
                  isShow = {isShowUserModal}
                  onHide={onHide}
                />
                }
        </>
      )

    }


    useEffect(() => {
        getUserInfo()
        getDepositInfo()
        getWithdrawalInfo()
        getAllUsers()
        getUserInvestments()
        getUserTotals()
        gettingReferralTotal()
        SetLocalLogin()
    }, [])
    
  return (
    <Modal isOpen={isShow} className="content-wrapper  user_modal">
  <div className="usermodal_height"  style={{ background: colorScheme.body_bg_color }}>
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Timeline</h1>
          {
            getReferral.map((items,index)=>{
              return(
                <ReferralTimeline items={items} index={index}/>
              )
            })
          }
        </div>  
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item">
              <a  className="text-white"
              style={{cursor:"pointer"}}
              onClick={onHide}>
              <i class="fas fa-circle-arrow-left fa-2x"></i>
              </a>
              </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
  <div className="scroll-view-two scrollbar-secondary-two">

  <section className="content usermodal_Content">
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
              
              <div className="timeline-item" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              <span className="time"><i className="fas fa-calendar-days" />&nbsp;&nbsp;{userInfo.Idate}</span>
              {
                  display !==1 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(1)}><i className="fa-solid fa-arrow-down fa-1x"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up fa-1x"></i></span>

              }
              <h3 className="timeline-header text-white">Personal Info</h3>
              {
                display !== 1 ? null:
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
    
              }
            </div>
      
              {/* UserInfo Card */}

            </div>


                  
            <div>
              <i className="fas fa-building-columns bg-white" />
              <div className="timeline-item"  style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              {
                  display !== 2 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(2)}><i className="fa-solid fa-arrow-down"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up"></i></span>

              }
                <h3 className="timeline-header text-white">Total Cash Flow</h3>
              {
                 display !== 2 ? null:
                <div className="timeline-body">
                 <div className="row">
              
                      <div className="col-lg-3 p-2">
                      <li style={{listStyle:"none"}}>Total Balance:&nbsp;<b>{Number(userTotal.Total_balance).toFixed(2)}</b> </li>
                      </div>

                      <div className="col-lg-3 p-2">
                      <li style={{listStyle:"none"}}>Total Deposit:&nbsp;<b>{userTotal.Total_deposit}</b> </li>
                      </div>

                      <div className="col-lg-3 p-2">
                      <li style={{listStyle:"none"}}>Total Withdrawal:&nbsp;<b>{userTotal.Total_withdrawl}</b> </li>
                      </div>
                      
                      <div className="col-lg-3 p-2">
                      <li style={{listStyle:"none"}}> Total Income:&nbsp;<b>{Number(userTotal.Total_income).toFixed(2)}</b> </li>
                      </div>

                      <div className="col-lg-3 p-2">
                      <li style={{listStyle:"none"}}>Total Investment:&nbsp;<b>{userTotal.Total_investment}</b> </li>
                      </div>
                      
                      <div className="col-lg-3 p-2">
                      <li style={{listStyle:"none"}}>Level:&nbsp;<b>{userTotal.my_level}</b> </li>
                      </div>
                      
                      <div className="col-lg-3 p-2">
                      <li style={{listStyle:"none"}}>Referral Code:&nbsp;<b>{userTotal.my_code}</b> </li>
                      </div>

               
                      </div>
        
          
                </div>

                }
              </div>
            </div>


                {/* Users Investment Section */}

            <div>
              <i className="fas fa-money-bill-transfer bg-white" />
              <div className="timeline-item"  style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              {
                  display !== 3 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(3)}><i className="fa-solid fa-arrow-down"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up"></i></span>

              }
                <h3 className="timeline-header text-white">Total Investments</h3>
              {
                 display !== 3 ? null:
                <div className="timeline-body">
                 <div className="row">

                    {
                      getInvestment.map((items,index)=>{
                        return(
                          <div className="col-lg-4 p-2">
                          <li style={{listStyle:"none"}}>Package ID:&nbsp;<b>{items.package_id}</b> </li>
                          <li style={{listStyle:"none"}}>Package End Date:&nbsp; <b>{items.end_date}</b></li>
                          <li style={{listStyle:"none"}}>Single Earning:&nbsp; <b>{items.single_earning}</b></li>

                          
                          <li style={{listStyle:"none"}}>Balance Got: &nbsp; <b>{items.balance_got}</b></li>
                          <li style={{listStyle:"none"}}>Balance Left: &nbsp; <b>{items.balance_left}</b></li> 
                          <li style={{listStyle:"none"}}>Earning compilation: &nbsp; <b>{items.earn_date}</b></li> 

                          

                          </div>
                        )
                      })
                    }
                 

               
                      </div>
        
          
                </div>

                }
              </div>
            </div>
            





            <div>
              <i className="fas fa-briefcase bg-white" />
              <div className="timeline-item" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              {
                  display !== 4 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(4)}><i className="fa-solid fa-arrow-down"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up"></i></span>

              }
                <h3 className="timeline-header text-white">Deposite Info</h3>
                {
                display !== 4 ? null:
                <div className="timeline-body">
          
                {
                  userDepo.length !== 0 ?
                 <div className="row">
                  {
                   userDepo.map((items,index)=>{
                    return(
                      <div key={index+1} className="col-lg-4">
                      <li className="mb-3" style={{listStyle:"none"}}>Deposit No:&nbsp;<b>{index+1}</b></li>
                      <li>Account Title:&nbsp;<b>{items.account_title}</b> </li>
                      <li>Account No:&nbsp;<b>{items.account_no}</b> </li>
                      <li>Account Type:&nbsp;<b>{items.account_type}</b> </li>
       
                      <li>Account Sub-Type:&nbsp;<b>{items.account_subtype}</b> </li>
                      <li>Amount:&nbsp;<b>{items.amount}</b> </li>
                      <li>Status:&nbsp;<b>{items.status}</b> </li>
                      <li style={{listStyle:"none"}}> <i className="fas fa-calendar-days"/>&nbsp;&nbsp;&nbsp;<b>{items.Idate}</b></li> 


                      </div>
                    )
                })
              }
                 </div>
                 :
                 <h3 className="text-center">No Deposits!</h3>
               }

                </div>
               }
               
              </div>
            </div>

            <div>
              <i className="fas fa-money-bill-wave bg-white" />
              <div className="timeline-item"  style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              {
                  display !== 5 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(5)}><i className="fa-solid fa-arrow-down"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up"></i></span>

              }
                <h3 className="timeline-header text-white">Withdrawal Info</h3>
                {
                  display !== 5 ? null:
                <div className="timeline-body">
                {
                  userWithdrawal.length !== 0 ?
                 <div className="row">
                  {
                   userWithdrawal.map((items,index)=>{
                    return(
                      <div key={index+1} className="col-lg-4">
                      <li className="mb-3" style={{listStyle:"none"}}>Withdrawal No:&nbsp;<b>{index+1}</b></li>
                      <li>Username:&nbsp;<b>{items.username}</b> </li>
                      <li>Account Title:&nbsp;<b>{items.account_title}</b> </li>

                      
                      <li>Account No:&nbsp;<b>{items.account_number}</b> </li>
                      <li>Account Type:&nbsp;<b>{items.account_type}</b> </li>
       
                      <li>Account Sub-Type:&nbsp;<b>{items.account_subtype}</b> </li>
                      <li>Amount:&nbsp;<b>{items.requested_amount}</b> </li>
                      <li>Status:&nbsp;<b>{items.status}</b> </li>
                      <li style={{listStyle:"none"}}> <i className="fas fa-calendar-days"/>&nbsp;&nbsp;<b>{items.Idate}</b></li> 

                      <li style={{listStyle:"none"}}> <i className="fas fa-clock"/>&nbsp;&nbsp;&nbsp;<b><Moment date={items.updated_at} format="hh:mm:ss"/></b></li>
                      </div>
                    )
                })
              }
                 </div>
                 :
                 <h3 className="text-center">No Withdrawals!</h3>
               }

                </div>
                }
              </div>
            </div>

            <div>
              <i className="fas fa-people-group bg-white" />
              <div className="timeline-item"  style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color}}>
              {
                  display !== 6 ? 
              <span className="btn btn-outline-info btn-sm float-right" onClick={()=>handleDisplay(6)}><i className="fa-solid fa-arrow-down"></i></span>
                :
              <span className="btn btn-outline-primary btn-sm float-right" onClick={()=>handleDisplay(0)}><i className="fa-solid fa-arrow-up"></i></span>

              }
                <h3 className="timeline-header text-white">Teams</h3>
                {
                    display !== 6 ? null:
                <div className="timeline-body">

                  <h3 className="ml-2 text-center text-danger"> <b>"Team One"</b></h3>
                  <h5>Total Team One Members:&nbsp;{showTotalMemOne}</h5>
                {
                  userTeamOne.length !== 0 ?
                 <div className="row p-3">

                  {
                    userTeamOne.map((items,index)=>{
                       
                   
                      return(
                      <>
                           
                      <GetTeamOne items={items} index={index} />

                      </>
                    )
                })
              }

                 </div>
                 :
                 <h3 className="text-center">No Team Found!</h3>
          
               }

        <h3 className="ml-2 text-center text-danger"> <b>"Team Two"</b> </h3>
        <h5>Total Team Two Members:&nbsp;{showTotalMemTwo}</h5>

               {
             userTeamOne.length !==0?
                 <div className="row p-3">
                  
                  {
                   userTeamTwo.map((items,index)=>{
                     return(
                      <>
                      <GetTeamTwo items={items} index={index}/>
                      </>
                    
                    )
                })
              }
                 </div>
                 :
                 <h3 className="text-center">No Team Found!</h3>
          
               }



                </div>
                }
              </div>
            </div>
     
      

    
            <div>
              <i className="fas fa-multiply bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


 </div>
 

 </div> 
    </Modal>
  )
}

export default UserTimelineModal