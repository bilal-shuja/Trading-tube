import React,{useState, useEffect} from 'react';
import colorScheme from '../Colors/Styles.js';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from 'axios';


const WithdrawalSheet = () => {
  const [withdrawalData , setWithdrawalData] = useState([])
  const[widthDrawalSum , setWidthdrawalSum] = useState('');

  const [withdrawalDate , setWithdrawalDate] = useState('');
  const[withdrawalStatus , setWithdrawalStatus] = useState('All');
  const[withdrawalAcc , setWithdrawalAcc] = useState('');
  const[withdrawalPhone , setWithdrawalPhone] = useState('');

  const[appWithdrawalDate ,setAppWithdrawalDate] = useState('')
  const[roleID , setRoleID] = useState('');


  function gettingWithdrawal(){
    axios.get(`${process.env.REACT_APP_BASE_URL}fetch_all_withdrawl_request`)
    .then((res)=>{
      setWithdrawalData(res.data.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  function withdrawalReq(id){
    const withdrawalObj = {
      id:id
    }

    axios.post(`${process.env.REACT_APP_BASE_URL}approve_status`,withdrawalObj)
    .then((res)=>{
      toast.info(`Withdrawal ${res.data.message}`,{theme:"dark"});
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    })
    .catch((error)=>{
      if(error.status === 401){
      toast.warn(error.data.message,{theme:"dark"});

      }
      else{
        toast.warn("Something went wrong",{theme:"dark"});
      }
  
    })
  }
function approveWithdrawalByDate(){
  const withdrawalDateObj = {
    date:appWithdrawalDate,
    status:"approved"
  }

  axios.post(`${process.env.REACT_APP_BASE_URL}approve_withdrawl_status_withdate`,withdrawalDateObj)
  .then((res)=>{
   
      toast.info(res.data.message,{theme:"dark"});
      setTimeout(() => {
        window.location.reload()
      }, 2000);


  })
  .catch((error)=>{
    toast.warn(error.data.message,{theme:"dark"});
  })
  
}

function gettingWithdrawalSum(){
  if(withdrawalStatus ==='approved' || withdrawalStatus ==='unapproved' ){
    const getWithdrawalSum = withdrawalData.filter((items)=> items.status  === withdrawalStatus).reduce((acc, curr)=> acc+ +curr.requested_amount,0)
    console.log(getWithdrawalSum)
    setWidthdrawalSum(getWithdrawalSum)
  }
  else if( (withdrawalAcc !== '' && withdrawalStatus === 'All') || ( withdrawalAcc !== '' && withdrawalDate === ' ')){
    const getWithdrawalSum = withdrawalData.filter((items)=> items.account_number === withdrawalAcc).reduce((acc, curr)=> acc+ +curr.requested_amount,0)
    setWidthdrawalSum(getWithdrawalSum)
  }
  else if( ( withdrawalDate !== '' && withdrawalStatus === 'All') || ( withdrawalDate !== '' && withdrawalAcc === ' ')){
    const getWithdrawalSum = withdrawalData.filter((items)=> items.Idate === withdrawalDate).reduce((acc, curr)=> acc+ +curr.requested_amount,0)
    setWidthdrawalSum(getWithdrawalSum)
  }

  else{

    const getWithdrawalSum = withdrawalData.reduce((acc, curr)=> acc+ +curr.requested_amount,0)
    setWidthdrawalSum(getWithdrawalSum)

  }

 
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
    gettingWithdrawal()
    SetLocalLogin()

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
                  Withdrawals
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
                  className="card" style={{ background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one}}>
                  <div className="card-header">
                    <h5>Withdrawal Sheet</h5>
                    
                    <div className="row">
                      <div className="col-lg-3">
                      <div className="form-group">
                      <input type="text"  className="form-control form-control-sm" defaultValue={widthDrawalSum}  placeholder="total Amount" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                      </div>
                      </div>
                      <div className="col-lg-3">
                        <button className="btn btn-outline-info btn-sm" onClick={gettingWithdrawalSum}> Total Amount</button>
                      </div>
                    </div>

                    <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>
                    {
                roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                  <div className="row float-right deposit-date-row">
                    <div className="col-8">
                      <div className="form-group">
                              <input type="date"  className="form-control input-group-sm" id="exampleInputEmail1" placeholder="Enter Title" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} onChange={(e)=>setAppWithdrawalDate(e.target.value)}/>
                      </div>
                    
                      </div>
                      <div className="col-4">
                      <button onClick={()=> approveWithdrawalByDate()} className="btn btn-outline-info">
                    Approve
                      </button>
                      </div>
                    </div>
                }
                  </div>
                  <div className="row p-3">
                  <div className="col-sm-4">
                      <label htmlFor="" className="form-label"> Search with Status:</label>
                    <div className="form-group">
                      <select type="text" className="form-control" 
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=>setWithdrawalStatus(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="approved">approved</option>
                            <option value="unapproved">unapproved</option>
                         </select>
                    </div>
                    </div>
                    <div className="col-sm-4">
                    <label htmlFor="" className="form-label">Filter by Account No /Address:</label>
                        <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search by Account No..."
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=> setWithdrawalAcc(e.target.value)}
                      />
                        </div>
                    </div>
                  <div className="col-sm-4">
                          <label htmlFor="" className="form-label "> Search with Date:</label>
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search by Date..."
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  }}
                                  onChange={(e)=> setWithdrawalDate(e.target.value)}
                                />
                          </div>
                      </div>

                      <div className="col-sm-4">
                <label htmlFor="" className="form-label "> Search with Phone:</label>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search by Phone..."
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=> setWithdrawalPhone(e.target.value)}
                      />
                 </div>
            </div>
            </div>
                  <div className="card-body table-responsive p-2">
                    {
                      withdrawalData.length !==0?
                      <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Account Owner</th>
                          <th>Owner Phone</th>
                          <th>Account Title</th>
                          <th>Account Type</th>
                          <th>Account Sub-Type</th>
                          <th>Account No</th>
                          <th>Req Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                          {
                              roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                              
                          <th>Actions</th>
                          }
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        
                        {
                          withdrawalDate ==='' &&  withdrawalAcc === '' && (withdrawalStatus ==='approved' || withdrawalStatus ==='unapproved')
                          
                         ?
                      withdrawalData.filter((items)=> items.status === withdrawalStatus).map((items,index)=>{
                          return(
                            <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                            <td>{items.user_id}</td>
                            <td>{items.username}</td>
                            <td>{items.phone}</td>
                            <td>{items.account_title}</td>
                            <td>{items.account_type}</td>
                            <td>{items.account_subtype}</td>
                            <td>{items.account_number}</td>
                            <td>{items.requested_amount}</td>
                            {
                                items.status === "approved"?
                                <td style={{ color: "#64dd17" }}>{items.status}</td>
                                :
                                <td style={{ color: "#ff1744" }}>{items.status}</td>

                              }
  
                            <td>{items.Idate}</td>
                            {
                              roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                              <td>
                                <div className="d-flex">
                              
                                  <button onClick={()=>withdrawalReq(items.id)} className="btn btn-outline-info">
                                    <i className="fa fa-circle-check"></i>
                                  </button>
                                
                                </div>
                              </td>
                          }
                          </tr>

                          )
                        })
                        :
                        ( withdrawalAcc !== '' && withdrawalStatus === 'All') || ( withdrawalAcc !== '' && withdrawalDate === ' ')
                        ?
                        withdrawalData.filter((items)=> items.account_number === withdrawalAcc).map((items,index)=>{
                          return(
                            <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                            <td>{items.user_id}</td>
                            <td>{items.username}</td>
                            <td>{items.phone}</td>
                            <td>{items.account_title}</td>
                            <td>{items.account_type}</td>
                            <td>{items.account_subtype}</td>
                            <td>{items.account_number}</td>
                            <td>{items.requested_amount}</td>
                            {
                                items.status === "approved"?
                                <td style={{ color: "#64dd17" }}>{items.status}</td>
                                :
                                <td style={{ color: "#ff1744" }}>{items.status}</td>

                              }
  
                            <td>{items.Idate}</td>
                            {
                              roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                              <td>
                                <div className="d-flex">
                              
                                  <button onClick={()=>withdrawalReq(items.id)} className="btn btn-outline-info">
                                    <i className="fa fa-circle-check"></i>
                                  </button>
                                
                                </div>
                              </td>
                          }
                          </tr>

                          )
                        })
                        :
                        ( withdrawalDate !== '' && withdrawalStatus === 'All') || ( withdrawalDate !== '' && withdrawalAcc === ' ')
                        ?

                        withdrawalData.filter((items)=> items.Idate === withdrawalDate).map((items,index)=>{
                          return(
                            <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                            <td>{items.user_id}</td>
                            <td>{items.username}</td>
                            <td>{items.phone}</td>
                            <td>{items.account_title}</td>
                            <td>{items.account_type}</td>
                            <td>{items.account_subtype}</td>
                            <td>{items.account_number}</td>
                            <td>{items.requested_amount}</td>
                            {
                                items.status === "approved"?
                                <td style={{ color: "#64dd17" }}>{items.status}</td>
                                :
                                <td style={{ color: "#ff1744" }}>{items.status}</td>

                              }
  
                            <td>{items.Idate}</td>
                            {
                              roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                              <td>
                                <div className="d-flex">
                              
                                  <button onClick={()=>withdrawalReq(items.id)} className="btn btn-outline-info">
                                    <i className="fa fa-circle-check"></i>
                                  </button>
                                
                                </div>
                              </td>
                          }
                          </tr>

                          )
                        })
                        :
                        ( withdrawalPhone !== '' && withdrawalStatus === 'All') || ( withdrawalPhone !== '' && withdrawalAcc === ' ')
                        ?
                        withdrawalData.filter((items)=> items.phone === withdrawalPhone).map((items,index)=>{
                          return(
                            <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                            <td>{items.user_id}</td>
                            <td>{items.username}</td>
                            <td>{items.phone}</td>
                            <td>{items.account_title}</td>
                            <td>{items.account_type}</td>
                            <td>{items.account_subtype}</td>
                            <td>{items.account_number}</td>
                            <td>{items.requested_amount}</td>
                            {
                              items.status === "approved"?
                              <td style={{ color: "#64dd17" }}>{items.status}</td>
                              :
                              <td style={{ color: "#ff1744" }}>{items.status}</td>

                            }
  
                            <td>{items.Idate}</td>
                            {
                              roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                              <td>
                                <div className="d-flex">
                              
                                  <button onClick={()=>withdrawalReq(items.id)} className="btn btn-outline-info">
                                    <i className="fa fa-circle-check"></i>
                                  </button>
                                
                                </div>
                              </td>
                          }
                          </tr>

                          )
                        })
                        :
                          withdrawalData.map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.user_id}</td>
                              <td>{items.username}</td>
                              <td>{items.phone}</td>
                              <td>{items.account_title}</td>
                              <td>{items.account_type}</td>
                              <td>{items.account_subtype}</td>
                              <td>{items.account_number}</td>
                              <td>{items.requested_amount}</td>
                              {
                                items.status === "approved"?
                                <td style={{ color: "#64dd17" }}>{items.status}</td>
                                :
                                <td style={{ color: "#ff1744" }}>{items.status}</td>

                              }
    
                              <td>{items.Idate}</td>
                              {
                              roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                              <td>
                                <div className="d-flex">
                              
                                  <button onClick={()=>withdrawalReq(items.id)} className="btn btn-outline-info">
                                    <i className="fa fa-circle-check"></i>
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



                      :
                      <div className="text-center">
                      <h2>No Record Found</h2>
                      </div>
                    }
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

export default WithdrawalSheet