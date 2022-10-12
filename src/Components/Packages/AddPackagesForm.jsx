import React from 'react';
import colorScheme from '../Colors/Styles.js';

const AddPackagesForm = () => {
  return (
    <>
<div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Add Packages</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}}><i className="fa-solid fa-lock fa-2x"></i></a></li>
            {/* <li className="breadcrumb-item active">Add Package</li> */}
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        {/* left column */}
        <div className="col-12">
          {/* jquery validation */}
          <div className="card" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
            <div className="card-header">
             Add Packages
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form id="quickForm">
              <div className="card-body">
                <div className="row">
                    <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Title*</label>
                        <input type="text" name="title" className="form-control" id="exampleInputEmail1" placeholder="Enter Title" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>
                    <div className="col-6">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Quantity*</label>
                  <input type="number" name="Quantity" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                </div>
                    </div>

                </div>

                <div className="row">
                <div className="col-6">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Price*</label>
                  <input type="number" name="Price" className="form-control" id="exampleInputPassword1" placeholder="Enter Price" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                </div>
                    </div>
                    <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Income*</label>
                        <input type="number" name="Income" className="form-control" id="exampleInputEmail1" placeholder="Enter Income" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>
                </div>

                <div className="row">                
                <div className="col-12 mb-1">
                <label className="form-label" htmlFor="company-column"> 
                    <b>Description*</b> 
                </label>
                <textarea type="text" id="company-column" className="form-control" name="Description" placeholder="Description..." rows={4} style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                
                </div>
                </div>


                <div className="row">
                <div className="col-6">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Status*</label>
                  <input type="text" name="Status" className="form-control" id="exampleInputPassword1" placeholder="Enter Status" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                </div>
                    </div>
                    <div className="col-6">
                  
                    <div className="form-group" >
                <label htmlFor="exampleInputFile">Image*</label>
                <div className="input-group">
                    <div className="custom-file">
                    <input type="file" className="custom-file-input" id="exampleInputFile"  />
                    <label className="custom-file-label" htmlFor="exampleInputFile" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}>Choose file</label>
                    </div>
                    <div className="input-group-append">
                    <span className="input-group-text">Upload</span>
                    </div>
                </div>
                </div>

                    </div>

                </div>

              </div>
              {/* /.card-body */}
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-outline-info">Submit</button>
              </div>
            </form>
          </div>
          {/* /.card */}
        </div>
        {/*/.col (left) */}
        {/* right column */}
        <div className="col-md-6">
        </div>
        {/*/.col (right) */}
      </div>
      {/* /.row */}
    </div>{/* /.container-fluid */}
  </section>
</div>


    </>
  )
}

export default AddPackagesForm