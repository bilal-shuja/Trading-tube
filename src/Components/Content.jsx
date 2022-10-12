import React from 'react';
import {useGetAllBlogsQuery} from '../Components/services/GetBlogs.js';

const Content = () => {
  const {data, isError , isLoading , isSuccess} = useGetAllBlogsQuery();

  console.log({
    "data":data,
    "Success":isSuccess,
    "Loading":isLoading,
    "Error":isError
  }
   
  );
  return (
    <>
    {/* Content Wrapper. Contains page content */}
<div className="content-wrapper" style={{background:"#0a0f26"}} >
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0"  style={{color:"#d0d2d6"}}>Starter Page</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item" ><a href="#"  style={{color:"#d0d2d6"}}>Home</a></li>
            <li className="breadcrumb-item active"  style={{color:"#d0d2d6"}}>Starter Page</li>
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content-header */}
  {/* Main content */}
  <div className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          <div className="card" style={{background:"#161d31", color:"#d0d2d6"}}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's
                content.
                {
                  data.map((items)=>{
                    return(
                      <>
                      {/* <p>{items.id}</p> */}
                      <p>{items.category}</p>
                      </>
                    )
                  })
                }
              </p>
              <a href="#" className="card-link" style={{color:"#d0d2d6"}}>Card link</a>
              <a href="#" className="card-link" style={{color:"#d0d2d6"}}>Another link</a>
            </div>
          </div>
          <div className="card card-primary " style={{background:"#161d31", color:"#d0d2d6"}}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's
                content.
              </p>
              <a href="#" className="card-link" style={{color:"#d0d2d6"}}>Card link</a>
              <a href="#" className="card-link" style={{color:"#d0d2d6"}}>Another link</a>
            </div>
          </div>{/* /.card */}
        </div>
        {/* /.col-md-6 */}
        <div className="col-lg-6">
          <div className="card" style={{background:"#161d31", color:"#d0d2d6"}}>
            <div className="card-header" >
              <h5 className="m-0">Featured</h5>
            </div>
            <div className="card-body">
              <h6 className="card-title">Special title treatment</h6>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" className="btn btn-outline-info">Go somewhere</a>
            </div>
          </div>
          <div className="card" style={{background:"#161d31", color:"#d0d2d6"}}>
            <div className="card-header">
              <h5 className="m-0">Featured</h5>
            </div>
            <div className="card-body">
              <h6 className="card-title">Special title treatment</h6>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" className="btn btn-outline-info">Go somewhere</a>
            </div>
          </div>
        </div>
        {/* /.col-md-6 */}
      </div>
      {/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content */}
</div>
{/* /.content-wrapper */}

    </>
  )
}

export default Content