import React,{useState , useEffect} from 'react';
import colorScheme from "../Colors/Styles.js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';
const StaffQuerySheet = () => {
    
    const[users , setUsers] = useState([]);
    const[userDate , setUserDate] = useState('');
    const[userPhone , setUserPhone] = useState('');
    const[roleID , setRoleID] = useState('');

    
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

    function gettingUsers(){
        const roleObj = {
            role_id:1
        }
      axios.post(`${process.env.REACT_APP_BASE_URL}fetch_queries`,roleObj)
      .then((res)=>{
        setUsers(res.data.data)
        console.log(res.data.data)
      })
      .catch((error)=>{
        toast.warn("Something went wrong" , {theme:"dark"})
      })
    }

    function updateIssueStatus(id){
        const statObj = {
            status:"solved"
        }
      axios.post(`${process.env.REACT_APP_BASE_URL}update_query/${id}`,statObj)
      .then((res)=>{
            toast.info(res.data.message , {theme:"dark"})
            setTimeout(() => {
                window.location.reload(true)
              }, 3000);
    
     
          })
      .catch((error)=>{
        toast.warn("Something went wrong" , {theme:"dark"})
      })
    }



useEffect(() => {
  gettingUsers();
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
                Staff Queries
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

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                  <div className="card-header">
                    <h5>Staff Query Sheet</h5>
                    <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>
                        <div className="row p-2">
                        <div className="col-sm-5">
                          <label htmlFor="" className="form-label "> Search with Date:</label>
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search by Date..."
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  }}
                                  onChange={(e)=> setUserDate(e.target.value)}
                                />
                          </div>
                      </div>

                      <div className="col-sm-5">
                        <label htmlFor="" className="form-label "> Search with Phone:</label>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Search by Phone..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                                }}
                                onChange={(e)=> setUserPhone(e.target.value)}
                              />
                        </div>
                    </div>
                    </div>
                  </div>
                  <div className="card-body table-responsive p-2">

                        {
                          users.length !== 0?

                          <table className="table  text-nowrap">
                          <thead className="text-center">
                            <tr>
                              <th>#</th>
                              <th>Sender ID</th>
                              <th>Sender Name</th>
                              <th>Sender Phone</th>
                              <th>User ID</th>
                              <th>Username</th>
                              <th>User Phone</th>
                              <th>Issue</th>
                              <th>Status</th>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            {
                              userDate !=='' &&  userPhone === '' ?

                              users.filter((items)=> items.date === userDate).map((items,index)=>{
                                return(
                                  <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                                    <td>{index+1}</td>
                                  <td>{items.sender_id}</td>
                                  <td>{items.sender_name}</td>
                                  <td >{items.sender_phone}</td>
                                  <td>{items.user_id}</td>
                                  <td>{items.username}</td>
                                  <td>{items.userphone}</td>
                                  <td>{items.message}</td>
                                  {
                                    items.status === "pending"?
                                  <td className="text-warning">{items.status}</td>
                                  :
                                  <td className="text-success">{items.status}</td>
                                  }
                                  
                                  <td>{items.date}</td>
                                  <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>
                                  <td>
                                  {
                                roleID === "2"|| roleID === "3"|| roleID === "4" || roleID === "6"? null:
                                <div className="d-flex justify-content-center">
                                {/* <Link className="btn btn-outline-info btn-sm" to="/UpdateUserForm" state={{ID:items.id}}>
                                      <i className="fa fa-pen"></i>
                                    </Link>&nbsp;&nbsp; */}

                                <button className="btn btn-outline-danger btn-sm" onClick={()=>updateIssueStatus(items.id)}>
                                    <i className="fa fa-trash"></i>
                                  </button>
                                
                        
                               
                                </div>
                              }

                              </td>
                                </tr>
                                )
                              })
                              :
                              userDate ==='' &&  userPhone !== '' ?

                              users.filter((items)=> items.userphone === userPhone).map((items,index)=>{
                                return(
                                  <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                                    <td>{index+1}</td>
                                  <td>{items.sender_id}</td>
                                  <td>{items.sender_name}</td>
                                  <td >{items.sender_phone}</td>
                                  <td>{items.user_id}</td>
                                  <td>{items.username}</td>
                                  <td>{items.userphone}</td>
                                  <td>{items.message}</td>
                                  {
                                           items.status === "pending"?
                                           <td className="text-warning">{items.status}</td>
                                           :
                                           <td className="text-success">{items.status}</td>
                                  }
                           
                                  
                                  <td>{items.date}</td>
                                  <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>
                                  <td>
                                  {
                               roleID === "2"|| roleID === "3"|| roleID === "4" || roleID === "6"? null:
                               <div className="d-flex justify-content-center">
                               {/* <Link className="btn btn-outline-info btn-sm" to="/UpdateUserForm" state={{ID:items.id}}>
                                    <i className="fa fa-pen"></i>
                                  </Link>&nbsp;&nbsp; */}

                                <button className="btn btn-outline-danger btn-sm" onClick={()=>updateIssueStatus(items.id)}>
                                    <i className="fa fa-trash"></i>
                                  </button>
                                  &nbsp;&nbsp;
                                
                          
                               
                                </div>
                              }
                              </td>
                                </tr>
                                )
                              })

                              :
                            users.map((items,index)=>{
                                return(
                                  <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                                     <td>{index+1}</td>
                                  <td>{items.sender_id}</td>
                                  <td>{items.sender_name}</td>
                                  <td >{items.sender_phone}</td>
                                  <td>{items.user_id}</td>
                                  <td>{items.username}</td>
                                  <td>{items.userphone}</td>
                                  <td>{items.message}</td>
                                  {
                                           items.status === "pending"?
                                           <td className="text-warning">{items.status}</td>
                                           :
                                           <td className="text-success">{items.status}</td>
                                  }
                           
                                  
                                  <td>{items.date}</td>
                                  <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>
                                  
                              <td>
                              {
                                  roleID === "2"|| roleID === "3"|| roleID === "4" || roleID === "6"? null:
                               <div className="d-flex justify-content-center">
                               {/* <Link className="btn btn-outline-info btn-sm" to="/UpdateUserForm" state={{ID:items.id}}>
                                    <i className="fa fa-pen"></i>
                                  </Link>&nbsp;&nbsp; */}

                                <button className="btn btn-outline-info btn-sm" onClick={()=>updateIssueStatus(items.id)}>
                                    <i className="fa-solid fa-circle-check"></i>
                                  </button>
                                
                                  
                                </div>
                              }
                              </td>
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

export default StaffQuerySheet