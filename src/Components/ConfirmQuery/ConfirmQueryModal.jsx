import React from 'react';
import {Modal} from 'pretty-modal';
import colorScheme from "../Colors/Styles.js";


const ConfirmQueryModal = ({isShow,body,action}) => {
  return (

    <Modal open={isShow}>

    <div className="card" style={{ background: colorScheme.body_bg_color }}>
    <div className="card-body p-3">
    <h6>{body}</h6>
  </div>
</div>

<div className="card-footer">
    <button
    
    onClick={()=> action("No")}
    className="btn btn-outline-info col-3">No</button>
    <button
    
    onClick={()=> action("Yes")}
    className="btn btn-outline-danger float-right col-3">Agree?</button>

</div>    
</Modal>
  )
}

export default ConfirmQueryModal