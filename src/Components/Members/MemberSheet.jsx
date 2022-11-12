import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
// import { Link } from "react-router-dom";
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
   
        axios.post(`${process.env.REACT_APP_BASE_URL}deletemembers/${id}`)
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
useEffect(() => {
    gettingMembers();
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
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">

                        {/* {
                          priceOp === "H-to-L" ?
                          PackageData.sort((a,b) => b.Price-a.Price).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          priceOp ==="L-to-H"?
                          PackageData.sort((a,b) => a.Price-b.Price).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          searchByDate !=='' && searchByStatus ==='All'?
                          PackageData.filter((item) => item.Created_at === searchByDate).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          searchByDate ==='' &&  (searchByStatus ==='Active' || searchByStatus ==='In-Active')?
                          PackageData.filter((item) => item.Status === searchByStatus).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          searchByDate !=='' &&  (searchByStatus ==='Active' || searchByStatus ==='In-Active')?
                          PackageData.filter((item) => item.Created_at === searchByDate && item.Status  ).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          priceOp === "All"?
                          PackageData.sort((a, b) =>new Date(...b.Created_at.split("/").reverse())-new Date(...a.Created_at.split("/").reverse())).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                className="col-lg-3"
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          searchByStatus === "All"?
                          PackageData.sort((a, b) =>new Date(...b.Created_at.split("/").reverse())-new Date(...a.Created_at.split("/").reverse())).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                          :
                          PackageData.sort((a, b) =>new Date(...b.Created_at.split("/").reverse())-new Date(...a.Created_at.split("/").reverse())).map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.Title}</td>
                              <td >{items.Quantity}</td>
                              <td>{items.Price}</td>
                              <td>{items.Income}</td>
                              <td>
                                <ReadMoreReact
                                  text={
                                   items.Description
                                  }
                                  min={10}
                                  ideal={35}
                                  max={80}
                                  readMoreText="...Read More"
                                />
                              </td>
                              {
                                items.Status === "Active"?
                              <td style={{color:"#64dd17"}}>{items.Status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.Status}</td>

                              }
                              <td>
                                <img className="img-fluid" src={items.Image} alt="" width={70} />
                              </td>
                              <td>{items.Created_at}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    to="/UpdatePackageForm"
                                    state={{ID:items.id}}
                                    className="btn btn-outline-info btn-sm"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            )
                          })
                        }
                        */}

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
                                null
                              }
                              <td>{items.created_at}</td>
                              <td>
                              <button className="btn btn-outline-danger btn-sm" onClick={()=>deleteMembers(items.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
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

export default MemberSheet