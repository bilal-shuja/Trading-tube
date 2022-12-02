import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import axios from "axios";

const ShareBalanceSheet = () => {
  const [balanceSheet , setBalanceSheet] = useState([]);

  function gettingShareBalance(){
      axios.post( `${process.env.REACT_APP_BASE_URL}fetch_send_balance`)
      .then((res)=>{
        setBalanceSheet(res.data.data)
      })
      .catch((error)=>{
          console.log(error)
      })
  }
  useEffect(() => {
    gettingShareBalance()
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
                  Balance Sheet
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
                    <h5>Share Balance Sheet</h5>   
                  </div>
                  <div className="card-body table-responsive p-2">
            {

            balanceSheet.length !==0?
                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Sender Name</th>
                          <th>Sender Phone</th>
                          <th>Received By</th>
                          <th>Receiver Phone</th>
                          <th>Shared Amount</th>
                          <th>Date&Time</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {      
                        
                        balanceSheet.map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{items.id}</td>
                              <td>{items.sender_name}</td>
                              <td>{items.sender_phone}</td>
                               <td>{items.username}</td>
                               <td>{items.userphone}</td>
                               <td>{items.send_amount}</td>
                              <td>{items.date}</td>

                              <td>
                               <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                               
                                </div>   
                                 
                              </td>
                            </tr>
                            )
                          })
                        
                        }

                      </tbody>
                    </table>

                    :
                    <div className="text-center">
                    <h2>No Data Found!</h2>
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

export default ShareBalanceSheet