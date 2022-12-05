import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import {Link} from 'react-router-dom';
import {toast} from "react-toastify";
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';
const MemberSheet = () => {
  const[members , setMembers] = useState([]);
  const[memDate , setMemDate] = useState('');
  const[memPhone , setMemPhone] = useState('');

  const[roleID , setRoleID] = useState('');
    function gettingMembers(){
      axios.post(`${process.env.REACT_APP_BASE_URL}fetchallusers`)
      .then((res)=>{
        setMembers(res.data.Users)
      })
      .catch((error)=>{

      })
    }

    const newSheet = members.length > 0 && members.filter((items)=>                    
                        
    Number(roleID) === 2 ? items.role_id !== "1" && items.role_id !== "2" && items.role_id !== "5" :
    Number(roleID) === 3 ? items.role_id !== "1" && items.role_id !== "2" && items.role_id !== "5" && items.role_id !== "3" :
    Number(roleID) === 4 ? items.role_id !== "1" && items.role_id !== "2" && items.role_id !== "5" && items.role_id !== "3" && items.role_id !== "4" :
    items.role_id !=="5"
  
)


    function deleteMembers(id){
   
        axios.post(`${process.env.REACT_APP_BASE_URL}deleteuserwithid/${id}`)
        .then((res)=>{
            toast.error("Member deleted" , {theme:"dark"})
            setTimeout(() => {
              window.location.reload(true)
            }, 3000);
            })
        .catch((res)=>{
          toast.warn("Something went wrong" , {theme:"dark"})
        })
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


  


useEffect(() => {
    gettingMembers();
    SetLocalLogin();
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
                Members
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
        
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

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                  <div className="card-header">
                    <h5>Members Sheet</h5>   
                    <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>
                        <div className="row p-2">
                        <div className="col-sm-4">
                          <label htmlFor="" className="form-label "> Search with Date:</label>
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search by Date..."
                                style={{
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                  }}
                                  onChange={(e)=> setMemDate(e.target.value)}
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
                                onChange={(e)=> setMemPhone(e.target.value)}
                              />
                        </div>
                    </div>
                    </div>
                    
                  </div>
                  <div className="card-body table-responsive p-2">
                    {
                        members.length !==0?

                   <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>ID</th>
                          <th>Username</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Referral Code</th>
                          <th>Question</th>
                          <th>Answer</th>
                          <th>Phone</th>
                          <th>Role</th>
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
                           memDate !=='' &&  memPhone === '' ?

                           newSheet.filter((items)=> items.Idate === memDate).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{index+1}</td>
                              <td>{items.id}</td>
                              <td>{items.username}</td>
                              <td>{items.firstname}</td>
                              <td>{items.lastname}</td>
                              <td >{items.email}</td>
                              <td>{items.referal_code}</td>
                              <td>{items.question}</td>
                              <td>{items.answer}</td>
                              <td>{items.phone}</td>
                              {
                                items.role_id === "1"?
                                <td>Super Admin</td>
                                :
                                items.role_id === "2"?
                                <td>Admin</td>
                                :
                                items.role_id === "3"?
                                <td>Manager</td>
                                :
                                items.role_id === "4"?
                                <td>Staff</td>
                                :
                                items.role_id !== null || undefined || " "?
                                <td>User</td>
                                :
                                null
                              }
                              <td>{items.Idate}</td>
                              <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>
                              {
                        roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                              <td>
                                          <div className="d-flex justify-content-center">
                               <Link className="btn btn-outline-info btn-sm" to="/UpdateMemberForm" state={{ID:items.id}}>
                                    <i className="fa fa-pen"></i>
                                  </Link>&nbsp;&nbsp;
                              <button className="btn btn-outline-danger btn-sm" onClick={()=>deleteMembers(items.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                                </div>
                              </td>
                        }
                            </tr>
                            )
                          })
                          :
                          memDate ==='' &&  memPhone !== '' ?
                        
                          newSheet.filter((items)=> items.phone === memPhone).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                                <td>{index+1}</td>
                              <td>{items.id}</td>
                              <td>{items.username}</td>
                              <td>{items.firstname}</td>
                              <td>{items.lastname}</td>
                              <td >{items.email}</td>
                              <td>{items.referal_code}</td>
                              <td>{items.question}</td>
                              <td>{items.answer}</td>
                              <td>{items.phone}</td>
                              {
                                items.role_id === "1"?
                                <td>Super Admin</td>
                                :
                                items.role_id === "2"?
                                <td>Admin</td>
                                :
                                items.role_id === "3"?
                                <td>Manager</td>
                                :
                                items.role_id === "4"?
                                <td>Staff</td>
                                :
                                items.role_id !== null || undefined || " "?
                                <td>User</td>
                                :
                                null
                              }
                              <td>{items.Idate}</td>
                              <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>
                              {
                        roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                        <td>
                        <div className="d-flex justify-content-center">
                          <Link className="btn btn-outline-info btn-sm" to="/UpdateMemberForm" state={{ID:items.id}}>
                                <i className="fa fa-pen"></i>
                              </Link>&nbsp;&nbsp;
                          <button className="btn btn-outline-danger btn-sm" onClick={()=>deleteMembers(items.id)}>
                              <i className="fa fa-trash"></i>
                            </button>
                        </div>
                       </td>
                        }
                            </tr>
                            )
                          })
                          :

                       newSheet.map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                                <td>{index+1}</td>
                              <td>{items.id}</td>
                              <td>{items.username}</td>
                              <td>{items.firstname}</td>
                              <td>{items.lastname}</td>
                              <td >{items.email}</td>
                              <td>{items.referal_code}</td>
                              <td>{items.question}</td>
                              <td>{items.answer}</td>
                              <td>{items.phone}</td>
                              {
                                items.role_id === "1"?
                                <td>Super Admin</td>
                                :
                                items.role_id === "2"?
                                <td>Admin</td>
                                :
                                items.role_id === "3"?
                                <td>Manager</td>
                                :
                                items.role_id === "4"?
                                <td>Staff</td>
                                :
                                items.role_id !== null || undefined || " "?
                                <td>User</td>
                                :
                                null
                              }
                              <td>{items.Idate}</td>
                              <td><Moment date={items.updated_at} format="hh:mm:ss"/></td>
                              {
                        roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                              <td>
                             <div className="d-flex justify-content-center">
                              <Link className="btn btn-outline-info btn-sm" to="/UpdateMemberForm" state={{ID:items.id}}>
                                    <i className="fa fa-pen"></i>
                                  </Link>&nbsp;&nbsp;
                              <button className="btn btn-outline-danger btn-sm" onClick={()=>deleteMembers(items.id)}>
                                  <i className="fa fa-trash"></i>
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

export default MemberSheet