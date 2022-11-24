import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import {toast} from "react-toastify";
import axios from 'axios';

const MemberSheet = () => {
    const[members , setMembers] = useState([]);
    function gettingMembers(){
      axios.get(`${process.env.REACT_APP_BASE_URL}fetchallmembers`)
      .then((res)=>{
        setMembers(res.data.Packages)
      })
      .catch((error)=>{
        console.log(error)
      })
    }


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

    const[roleID , setRoleID] = useState('')
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
                Members Sheet
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

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                  <div className="card-header">
                    <h5>Members Sheet</h5>   
                        {/* <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button> */}
                  </div>
                  <div className="card-body table-responsive p-2">
                    <div className="row p-2">               
                        {/* <Filter PackageData={PackageData} DateFilter={gettingDate} StatusFilter={gettingStatus} PriceStatus={gettingPrice} PackageTableIdentifier={PackageTableIdentifier}/> */}
                    </div>
                    {
                        members.length !==0?

                   <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Role</th>
                          <th>Date</th>
                          {
                        roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                          <th>Actions</th>
}
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {
                 
                        members.map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.username}</td>
                              <td >{items.email}</td>
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
                              {
                        roleID === "2"|| roleID === "3"|| roleID === "4"? null:
                              <td>
                              <button className="btn btn-outline-danger btn-sm" onClick={()=>deleteMembers(items.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
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