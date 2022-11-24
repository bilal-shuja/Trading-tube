import React, {useState,useEffect} from "react";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import ReadMoreReact from "read-more-react";
// import { Link } from "react-router-dom";
import Filter from "../Filters/Filter";
import {toast} from "react-toastify";
import {Modal} from 'pretty-modal';
import axios from 'axios';

const PackagesTable = () => {

  const PackageTableIdentifier = "PackageTable";

  const[getPackageSheet , setPackageSheet] = useState([]);
  const[tempPackageArr , setTempPackageArr] = useState([]);
  const [packageStatus , setPackageStatus] = useState('All');
  const [stateID , setStateID] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const[roleID , setRoleID] = useState('');


  function gettingPackages(){

    axios.get(`${process.env.REACT_APP_BASE_URL}fetchallpackage`)
    .then((res)=>{
      setPackageSheet(res.data.Packages)
      setTempPackageArr(res.data.Packages)
    })
    .catch((error)=>{
      console.log(error)
    })
  }



  function changingPackageStatus(){
    const packStatus = {
      status:packageStatus
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}UpdatePackageStatus/${stateID}`,packStatus)
    .then((res)=>{
      toast.info("Status Updated",{theme:"dark"});
      setTimeout(() => {
        window.location.reload(true)
      }, 3000);
    })
    .catch((error)=>{
      toast.warn("Something went wrong",{theme:"dark"});
    })
  }

  function deletePackage(id){
    axios.post(`${process.env.REACT_APP_BASE_URL}deletepackage/${id}`)
    .then((res)=>{
        toast.error("Package deleted" , {theme:"dark"})
        setTimeout(() => {
          window.location.reload(true)
        }, 3000);
        })
    .catch((res)=>{
      toast.warn("Something went wrong" , {theme:"dark"})
    })
  }


  
  
  function gettingDate(val){
    setTempPackageArr(val)
  }
  
  function gettingStatus(val){
    setTempPackageArr(val)
  }

  function gettingPrice(val){
    setTempPackageArr(val)
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
  gettingPackages()
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
                  Packages Sheet
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
                    <h5>Packge Sheet</h5>   
                        <button className="btn btn-outline-info btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>
                        <div className="row p-2">  
                        <Filter PackageData={getPackageSheet} DateFilter={gettingDate} StatusFilter={gettingStatus} PriceStatus={gettingPrice} PackageTableIdentifier={PackageTableIdentifier}/>
                    </div>
                  </div>
                  <div className="card-body table-responsive p-2">
                  
                    {
                        tempPackageArr.length !==0?
                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Income</th>

                          <th>Profit Income</th>
                          <th>Profit Duration</th>
                          <th>Cycle Income</th>
                          <th>Cycle Duration</th>
                          <th>Single Payment</th>

                          <th>Description</th>
                          <th>Status</th>
                          <th>Total Days</th>
                          <th>Image</th>
                          <th>Date</th>
                          {

                            roleID === "2"|| roleID === "3"|| roleID === "4"? null: <th>Actions</th>
                          }
                          
                        </tr>
                      </thead>
                     
                      <tbody className="text-center">
                       {/* { isLoading && <h5>Taking couple of seconds ...</h5>} */}
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

              

                    tempPackageArr.map((items,index)=>{
        
                          return(
                            <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                            <td>{items.id}</td>
                            <td>{items.title}</td>
                            <td >{items.quantity}</td>
                            <td>{items.price}</td>
                            <td>{items.income}</td>
                            <td>{items.profit_income}</td>
                            <td>{items.profit_duration}</td>
                            <td>{items.cycle_income}</td>
                            <td>{items.cycle_duration}</td>
                            <td>{items.single_payment}</td>
                            <td>
                              <ReadMoreReact
                             
                                text={
                                 items.description
                                }
                                min={10}
                                ideal={35}
                                max={80}
                                readMoreText="...Read More"
                              />
                            </td>
                            {
                              items.status === "active"?
                            <td style={{color:"#64dd17"}}>{items.status}</td>
                            :
                            <td style={{color:"#ff1744"}}>{items.status}</td>
                  
                            }
                            <td>{items.total_days}</td>
                            <td>
                              <img className="img-fluid" src={`${process.env.REACT_APP_IMG_URL}${items.image}`} alt="package_img"
                              style={{cursor:"pointer"}}
                              onClick={()=>window.open(`${process.env.REACT_APP_IMG_URL}${items.image}`, "_blank")}
                              />
                            </td>
                            <td>{items.Idate}</td>
                            {
                              roleID === "2" || roleID === "3" || roleID === "4" ?
                              null
                              :
                            <td>
                              <div className="d-flex">
                                {/* <Link
                                  to="/UpdatePackageForm"
                                  state={{ID:items.id}}
                                  className="btn btn-outline-info btn-sm"

                                >
                                  <i className="fa fa-pencil"></i>
                                </Link>
                                &nbsp;&nbsp; */}
                                <button   onClick={() => {
                                  setIsOpen(true) 
                                  setStateID(items.id)}}  className="btn btn-outline-warning btn-sm">
                                <i className="fa-solid fa-spinner"></i>
                                </button>
                                &nbsp;&nbsp;
                                <button className="btn btn-outline-danger btn-sm" onClick={()=>deletePackage(items.id)}>
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
                 <Modal  onClose={() => {setIsOpen(false)}} open={isOpen}>
                           <div className="card-body ">
                           <div className="form-group">
                           <p><b>Change Status</b></p>
                           <select className="form-control-sm" aria-label="Default select example"style={{ background: colorScheme.login_card_bg,color: colorScheme.card_txt_color,paddingRight:"11em"}}
                             onChange={(e) => setPackageStatus(e.target.value)}>
                             <option value="All">All</option>
                             <option value="active">active</option>
                             <option value="in-active">in-active</option>
                             </select>
                           </div>
                           <button onClick={()=>{changingPackageStatus()}} className="btn btn-outline-info btn-sm">Submit</button>
                           </div>
                           </Modal>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default PackagesTable;
