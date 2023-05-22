import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import axios from "axios";


const TopInvesterSheet = () => {
    const [getTopInvest , setTopInvest] = useState([]);

    // Function for fetching level reward in the sheet:

    function gettingTopInvesters(){
        axios.post( `${process.env.REACT_APP_BASE_URL}get_top_investors`)
        .then((res)=>{
            setTopInvest(res.data.data)
        })
        .catch((error)=>{
          return null;
        })
    }



    useEffect(() => {
        gettingTopInvesters()
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
                  Top Investers
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
                    <h5>Top Investers Sheet</h5>   
                  </div>
                  <div className="card-body table-responsive p-2">

                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Invester #</th>
                          <th>Invester Referral</th>
                          <th>Invester Name</th>
                          <th>Invester Phone</th>
                          <th>Invested Amount</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {      
                        
                        getTopInvest.map((items,index)=>{
                            return(
                              <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                              <td>{getTopInvest.length-index}</td>
                              <td>{items.investor_id}</td>
                              <td>{items.referal_code}</td>
                              <td>{items.username}</td>
                              <td>{items.phone}</td>
                              <td>{items.total_invested}</td>
                              <td>{items.created_at}</td>

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

export default TopInvesterSheet