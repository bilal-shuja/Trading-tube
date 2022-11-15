import React,{useState,useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import Filter from '../Filters/Filter';
import axios from 'axios';

const AllDepositsTable = () => {
    const [checkBox , setCheckBox] = useState(false);
    const[getDepos , setDepos] = useState([]);

    const[depoChecks , setDepoChecks] = useState([]);
    const[depoTemArr , depoTempArr] = useState([]);
    const [depoDate , setDepoDate] = useState('');

    const DepoSheetIdentifier = "DepositSheet";

      function gettingDeposits(){
        axios.post(`${process.env.REACT_APP_BASE_URL}getalldeposits`)
        .then((res)=>{
          setDepos(res.data.Data)
          depoTempArr(res.data.Data)
        })
        .catch((error)=>{
          console.log(error)
        })

      }

    const depoHandler = (id)=>{
        setDepoChecks( prevState =>{
            const depID = [...prevState];
            depID.push(id)
            return depID;
        })
    }
    const despositCheckArr = ()=>{
        console.log("IDs arr",depoChecks)
        setTimeout(() => {
          
          setCheckBox(false)
        }, 2000);
    }

    function gettingDate(val){
      depoTempArr(val)
    }
  
    function gettingStatus(val){
      depoTempArr(val)
    }
  
    function gettingPrice(val){
      depoTempArr(val)
    }


    function approveSingleDepo(id){
      const depObj ={
        id:id,
        status:"approved"
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}show`,depObj)
      .then((res)=>{
      toast.info("Status Updated!",{theme:"dark"});
      setTimeout(() => {
        window.location.reload(true)
      }, 2000);
      })
      .catch((error)=>{
        toast.info("Something went wrong",{theme:"dark"});
      })
    }

    function approveDepoByDate(){
      const dateDepObj={
        Idate:depoDate
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}approve_deposit_bydate`,dateDepObj)
      .then((res)=>{
        toast.info("Status Updated!",{theme:"dark"});
        setTimeout(() => {
          window.location.reload(true)
        }, 2000);
      })
      .catch((error)=>{
        toast.warn("Something went wrong",{theme:"dark"});

      })
    }

  

    useEffect(() => {
      gettingDeposits()
    }, [])
    

  return (
    <>
<div className="scroll-view-two scrollbar-secondary-two">
<div className="content-wrapper p-3 " style={{background:colorScheme.body_bg_color}}>
<section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Deposits Sheet</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            {/* <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}}>Home</a></li> */}
            {/* <li className="breadcrumb-item active">Add Package</li> */}
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  <section className="content">
    <div className="container-fluid">
 <div className="row">
  <div className="col-12">
    <div className="card" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
      <div className="card-header">

        <h3>Deposits Sheet</h3>
      <button className="btn btn-outline-info mt-2 btn-sm" onClick={()=>{window.location.reload()}}>Reset Filters</button>
      &nbsp;&nbsp;&nbsp;&nbsp; 

          {/* <button className="btn btn-outline-info  btn-md mt-2" onClick={()=>setCheckBox(true)}>
              Check & Approve
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp; 
          {
              checkBox === true ?
            <button className="btn btn-outline-info  btn-md mt-2" onClick={despositCheckArr}>
            <i className="fa-solid fa-check-double"></i>
            </button> 
            :
            null
          }
          &nbsp;&nbsp; */}


         <div className="row float-right deposit-date-row">
          <div className="col-8">
            <div className="form-group">
                    <input type="date"  className="form-control input-group-sm" id="exampleInputEmail1" placeholder="Enter Title" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} onChange={(e)=>setDepoDate(e.target.value)}/>
            </div>
          
            </div>
            <div className="col-4">
            <button onClick={()=> approveDepoByDate()} className="btn btn-outline-info">
           Approve
            </button>
            </div>
          </div>
      
      </div>
      <div className="row p-3">
          <Filter DepositData={getDepos} DateFilter={gettingDate} StatusFilter={gettingStatus} PriceStatus={gettingPrice} DepoSheetIdentifier={DepoSheetIdentifier} />
        </div>
      
      <div className="card-body table-responsive p-2">

       
        <table className="table  text-nowrap">
          <thead className="text-center">
            <tr>
            <th>#</th>
            <th>Deposit ID</th>
            <th>Account Title</th>
            <th>Account Type</th>
            <th>Account Sub-Type</th>
            <th>Account No</th>
            <th>Amount</th>
            <th>Deposit Slip</th>
            <th>Verified Status</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>

            </tr>
          </thead>
          <tbody className="text-center">
            {
              depoTemArr.length !==0 ?
                depoTemArr.map((items)=>{
                    return(
                        <tr key={items.id} style={{ color: colorScheme.card_txt_color }}>
                            <td>{items.id}</td>
                            <td>{items.payer_id}</td>
                            <td>{items.account_title}</td>
                            <td>{items.account_type}</td>
                            <td>{items.account_subtype}</td>
                            <td>{items.account_no}</td>
                            <td>{items.amount}</td>
                            <td>
                            <img className="img-fluid" src={`${process.env.REACT_APP_IMG_URL}${items.proof_image}`} alt=""  width={60}
                             style={{cursor:"pointer"}}
                             onClick={()=>window.open(`${process.env.REACT_APP_IMG_URL}${items.proof_image}`, "_blank")}
                            />
                            </td>
                            {
                             items.verified === "true"?
                            <td style={{color:"#64dd17"}}>{items.verified}</td>
                            :
                            <td style={{color:"#ff1744"}}>{items.verified}</td>
                            }

                            {
                              items.status === "approved"?
                              <td style={{color:"#64dd17"}}>{items.status}</td>
                              :
                              <td style={{color:"#ff1744"}}>{items.status}</td>

                            }
                            <td>{items.Idate}</td>
                        <td>
                        <div className="d-flex align-items-center">
                          <button onClick={()=> approveSingleDepo(items.id)}  className="btn btn-outline-info btn-sm" >
                            <i  className="fa fa-person-circle-check"></i>
                          </button>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                      {
                        checkBox === true? 
                         <div className="custom-control custom-checkbox">
                         <input className="custom-control-input custom-control-input-info" type="checkbox" id={`customCheckbox${items.id}`} onChange={()=>depoHandler(items.id)} />
                         <label htmlFor={`customCheckbox${items.id}`} className="custom-control-label">Check</label>
                         </div>
                         :
                         null
                      }
                       

                        </div>
                        </td>
                      </tr>
                    )
                })
                :
                <div className="text-center">
                <h2>No Record Found</h2>
                </div>
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

export default AllDepositsTable