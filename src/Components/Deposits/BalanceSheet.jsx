import React from "react";
import colorScheme from "../Colors/Styles.js";
import showImage from "../Images/profile.jpg";
import { Link } from "react-router-dom";

const BalanceSheet = () => {
  return (
    <>
      <div
        className="content-wrapper p-3"
        style={{ background: colorScheme.body_bg_color }}
      >
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  Balance Sheet
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
                    <h3 className="card-title">Balance Sheet</h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table  text-nowrap">
                      <thead>
                        <tr>
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
                      <tbody>
                        <tr style={{ color: colorScheme.card_txt_color }}>
                          <td>1</td>
                          <td>700</td>
                          <td style={{ color: "green" }}>Completed</td>
                          <td>Bilal Shuja</td>
                          <td>200,000</td>
                          <td>
                            <img src={showImage} alt="" width={70} />
                          </td>
                          <td>Lorem Ipsum</td>

                          <td style={{ color: "red" }}>False</td>

                          <td>3/30/2022</td>
                          <td>
                            <div className="d-flex">
                              <Link
                                to="/UpdatePackageForm"
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

                        <tr style={{ color: colorScheme.card_txt_color }}>
                          <td>2</td>
                          <td>800</td>
                          <td style={{ color: "red" }}>Not Completed</td>
                          <td>Affan Sheikh</td>
                          <td>300,800</td>
                          <td>
                            <img
                              className="img-fluid"
                              src={showImage}
                              alt=""
                              width={70}
                            />
                          </td>
                          <td>Lorem Ipsum</td>

                          <td style={{ color: "green" }}>True</td>
                          <td>3/30/2022</td>
                          <td>
                            <div className="d-flex">
                              <button className="btn btn-outline-info btn-sm">
                                <i className="fa fa-pencil"></i>
                              </button>
                              &nbsp;&nbsp;
                              <button className="btn btn-outline-danger btn-sm">
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>

                        <tr style={{ color: colorScheme.card_txt_color }}>
                          <td>3</td>
                          <td>900</td>
                          <td style={{ color: "red" }}>Not Completed</td>
                          <td>Fahad Arif</td>
                          <td>89,00,000</td>
                          <td>
                            <img src={showImage} alt="" width={70} />
                          </td>
                          <td>Lorem Ipsum</td>

                          <td style={{ color: "red" }}>False</td>
                          <td>3/30/2022</td>

                          <td>
                            <div className="d-flex">
                              <button className="btn btn-outline-info btn-sm">
                                <i className="fa fa-pencil"></i>
                              </button>
                              &nbsp;&nbsp;
                              <button className="btn btn-outline-danger btn-sm">
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
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
  );
};

export default BalanceSheet;
