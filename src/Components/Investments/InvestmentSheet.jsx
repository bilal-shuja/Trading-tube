import React,{useState} from "react";
import colorScheme from "../Colors/Styles.js";
import InvestData from "../Json/InvestmentData.js";
import ReadMoreReact from 'read-more-react';
import Filter from '../Filters/Filter';
import { Link } from "react-router-dom";

const InvestmentSheet = () => {

  const [investData , setInvestData] = useState(InvestData);
  const InvestmentSheetIdentifier = "InvestmentSheet";

  function gettingDate(val){
    setInvestData(val)
  }

  function gettingStatus(val){
    setInvestData(val)
  }

  function gettingPrice(val){
    setInvestData(val)
  }

  return (
    <>
     <div className="scroll-view-two scrollbar-secondary-two">

      <div
        className="content-wrapper p-3"
        style={{ background: colorScheme.body_bg_color }}
      >
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  Investment Sheet
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
                  className="card"
                  style={{
                    background: colorScheme.card_bg_color,
                    color: colorScheme.card_txt_color,
                    boxShadow: colorScheme.box_shadow_one,
                  }}
                >
                  <div className="card-header">
                    <h3 className="card-title">Investment Sheet</h3>
                  </div>
                  <div className="card-body table-responsive p-2">
                    <div className="row">

                    <Filter InvestData={InvestData} DateFilter={gettingDate} StatusFilter={gettingStatus} PriceStatus={gettingPrice} InvestmentSheetIdentifier={InvestmentSheetIdentifier}/>
                    </div>
                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                          <th>id</th>
                          <th>Investor Name</th>
                          <th>Package No</th>
                          <th>Title</th>
                          <th>Quantiy</th>
                          <th>Price</th>
                          <th>Income</th>
                          <th>Description</th>
                          <th>Profit Take</th>
                          <th>Profit Left</th>
                          <th>Is Finished</th>
                          <th>Status</th>
                          <th>Image</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                     
                      <tbody className="text-center">
                           {
                            investData.map((items)=>{
                         return(
                            <tr key={items.id} style={{ color: colorScheme.card_txt_color }}>
                                <td>{items.id}</td>
                                <td>{items.investor_name}</td>
                                <td>{items.Package_id}</td>
                                <td>{items.Title}</td>
                                <td>{items.Quantity}</td>
                                <td>{items.Price}</td>
                                <td>{items.Income}</td>
                                <td>
                                <ReadMoreReact
                                    text={
                                    items.Description
                                    }
                                    min={10}
                                    ideal={20}
                                    max={80}
                                    readMoreText="...Read More"
                                    />
                                </td>
                                <td>{items.profit_gained}</td>
                                <td>{items.profit_left}</td>
                                <td>{items.Is_finished}</td>
                                <td>{items.Status}</td>
                                <td>
                                    <img className="img-fluid" src={items.Image} alt="" width={60}/>
                                </td>
                                <td>
                                    {items.Created_at}
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
  );
};

export default InvestmentSheet;
