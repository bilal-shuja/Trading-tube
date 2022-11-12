import React,{useState, useEffect} from 'react';
import colorScheme from '../Colors/Styles.js';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from 'axios';


const WithdrawalSheet = () => {
  const [withdrawalData , setWithdrawalData] = useState([])
  const [withdrawalDate , setWithdrawalDate] = useState('');
  const[withdrawalStatus , setWithdrawalStatus] = useState('All');
  const[withdrawalAcc , setWithdrawalAcc] = useState('');

  const[appWithdrawalDate ,setAppWithdrawalDate] = useState('')


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
      id:id,
      status:"approved"
    }

    axios.post(`${process.env.REACT_APP_BASE_URL}approve_status`,withdrawalObj)
    .then((res)=>{
      toast.info("Withdrawal Approved!",{theme:"dark"});
      setTimeout(() => {
        window.location.reload()
      }, 2000);
      console.log(res)
    })
    .catch((error)=>{
      if(error.status === 401){
      toast.warn(error.data.message,{theme:"dark"});

      }
      else{
        toast.warn("Something went wrong",{theme:"dark"});
        console.log(error)
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
   
      toast.info("All Withdrawal Approved !",{theme:"dark"});
      console.log(res.data.status)
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    
   

  })
  .catch((error)=>{
    // toast.warn(error.data.message,{theme:"dark"});
    console.log(error)
  })
  
}

  useEffect(() => {
    gettingWithdrawal()
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
                  Withdrawal Sheet
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  {/* <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}}>Home</a></li> */}
                  {/* <li className="breadcrumb-item active">Add Package</li> */}
                </ol>
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
                    <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>
                    
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
                  </div>
                  <div className="card-body table-responsive p-2">
                    <div className="row">
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
                  </div>

                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Account Owner</th>
                          <th>Account Title</th>
                          <th>Account Type</th>
                          <th>Account Sub-Type</th>
                          <th>Account No</th>
                          <th>Req Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
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
                            <td>
                              <div className="d-flex">
                              
                                <button onClick={()=>withdrawalReq(items.id)} className="btn btn-outline-info">
                                  {/* <i className="fa fa-trash"></i> */}
                                  <i className="fa fa-circle-check"></i>
                                </button>
                              </div>
                            </td>
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
                            <td>
                              <div className="d-flex">
                              
                                <button onClick={()=>withdrawalReq(items.id)} className="btn btn-outline-info">
                                  {/* <i className="fa fa-trash"></i> */}
                                  <i className="fa fa-circle-check"></i>
                                </button>
                              </div>
                            </td>
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
                            <td>
                              <div className="d-flex">
                              
                                <button onClick={()=>withdrawalReq(items.id)} className="btn btn-outline-info">
                                  {/* <i className="fa fa-trash"></i> */}
                                  <i className="fa fa-circle-check"></i>
                                </button>
                              </div>
                            </td>
                          </tr>

                          )
                        })

                        :
                          withdrawalData.map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.user_id}</td>
                              <td>{items.username}</td>
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
                              <td>
                                <div className="d-flex">
                                
                                  <button onClick={()=>withdrawalReq(items.id)} className="btn btn-outline-info">
                                    <i className="fa fa-circle-check"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>

                            )
                          })

                          

                        }
                     

                      </tbody>
                    </table>

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