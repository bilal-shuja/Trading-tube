import colorScheme from '../Colors/Styles.js';
import DepositData from '../Json/Data.js';
import React,{useState,useEffect} from 'react';

const AllDepositsTable = () => {
    const [checkBox , setCheckBox] = useState(false);
    const[depoChecks , setDepoChecks] = useState([]);
    const [depoDate , setDepoDate] = useState('');

    const depoHandler = (id)=>{
        setDepoChecks( prevState =>{
            const depID = [...prevState];
            depID.push(id)
            return depID;
        })
    }
    const despositCheckArr = ()=>{
        console.log("IDs arr",depoChecks)
        setCheckBox(false)
    }


  return (
    <>
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
        <button className="btn btn-outline-info  btn-md mt-2" onClick={()=>setCheckBox(true)}>
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

         <div className="row float-right deposit-date-row">
          <div className="col-8">
            <div className="form-group">
                    <input type="date"  className="form-control input-group-sm" id="exampleInputEmail1" placeholder="Enter Title" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} onChange={(e)=>setDepoDate(e.target.value)}/>
            </div>
          
            </div>
            <div className="col-4">
            <button className="btn btn-outline-info ">
           Approve
            </button>
            </div>
          </div>
      
      </div>
      
      <div className="card-body table-responsive p-0">
   
        <table className="table  text-nowrap">
          <thead className="text-center">
            <tr>
            <th>#</th>
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
                DepositData.map((items)=>{
                    return(
                        <tr key={items.id} style={{ color: colorScheme.card_txt_color }}>
                            <td>{items.id}</td>
                            <td>{items.account_title}</td>
                            <td>{items.account_type}</td>
                            <td>{items.account_subType}</td>
                            <td>{items.account_no}</td>
                            <td>{items.amount}</td>
                            <td>
                            <img src={items.deposit_slip} alt=""  width={60}/>
                            </td>
                            <td>{items.Verified_Status}</td>
                            <td>{items.Status}</td>
                            <td>{items.date}</td>
                        <td>
                        <div className="d-flex align-items-center">
                          <button  className="btn btn-outline-info btn-sm" >
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

    </>
  )
}

export default AllDepositsTable