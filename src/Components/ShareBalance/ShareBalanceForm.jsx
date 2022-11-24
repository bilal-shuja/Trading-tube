import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";
import React,{useState , useEffect} from 'react';
import axios from 'axios';

const ShareBalanceForm = () => {

    const[userName , setUserName] = useState('');
    const[userID ,setUserID] = useState('');
    const[userPhone , setUserPhone] = useState('');
    const[amount ,setAmount] = useState('');

    const[loading , setLoading] = useState(false);
    const [input , setInput] = useState(false);

    const [adminID , setAdminID] = useState('')
    const[roleID , setRoleID] = useState('')
    const SetLocalLogin = async () => {
      try {
        let userObj = await localStorage.getItem('user');
        let parseUserObj = JSON.parse(userObj)
        
        if (parseUserObj !== null) {
          setAdminID(parseUserObj.id)
            setRoleID(JSON.parse(parseUserObj.role_id))
        }
  
      } catch {
        return null;
      }
    }

    function getEnterCodeForPhone(e){

      let keyCode = e.code;
      if( keyCode ==="Enter" || keyCode  === "NumpadEnter"){
        getUserByPhone(e);
      }
      
      else{
       return null;
        }

    }

    function getUserByPhone(e){
      axios.post(`${process.env.REACT_APP_BASE_URL}fetch_user_with_phone/${e.target.value}`,)
      .then((res)=>{
        setUserName(res.data.Data.username)
        setUserID(res.data.Data.id)
        setUserPhone(res.data.Data.phone)
      })
      .catch((error)=>{
        console.log(error)
      })
      
    }

    function submitBalance(){
        setLoading(true)
        const balanceObj ={
            user_id:userID,
            sender_id:adminID,
            role_id:roleID,
            phone:userPhone,
            amount:amount
        }
  
        axios.post(`${process.env.REACT_APP_BASE_URL}Send_balance`,balanceObj)
        .then((res)=>{
          toast.info("Balance Sended!",{theme:"dark"});
          geneNotification()
          setInput(false);
          setLoading(false)
          setTimeout(() => {
            setUserPhone('')
            setUserName('')
            setAmount('')
          }, 2000);
       
      
        })
        .catch((error)=>{
          toast.warn("Something went wrong",{theme:"dark"});
          setInput(false);
          setLoading(false)
  
        })
    
      }

      function geneNotification(){
        const notifiObj ={
          receiver_id:userID,
          body:`Congratulations! You have received amount ${amount} from trading tube`,
          title:"Balance Received!"
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}post_notification`,notifiObj)
        .then((res)=>{
          toast.info("Notified to User",{theme:"dark"});
        })
        .catch((error)=>{
          toast.warn("Something went wrong",{theme:"dark"});

        })
      }


      useEffect(() => {
        SetLocalLogin()
      }, [])
      
  return (
    <>
       <div className="scroll-view-two scrollbar-secondary-two">

<div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>
<section className="content-header">
<div className="container-fluid">
<div className="row mb-2">
  <div className="col-sm-6">
    <h1 style={{color:colorScheme.card_txt_color}}>Share Balance</h1>
  </div>
  <div className="col-sm-6">
    <ol className="breadcrumb float-sm-right">
    </ol>
  </div>
</div>
</div>{/* /.container-fluid */}
</section>
<section className="content">
<div className="container-fluid">      
<div className="row">

  <div className="col-12 col-sm-12">
    {/* jquery validation */}
    <div className="card" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
      <div className="card-header">
       Balance Form
      </div>
      {/* /.card-header */}
      {/* form start */}
        <div className="card-body">
          <div className="row">
              <div className="col-lg-4 col-sm-12">
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1">User Phone*</label>
                  <input type="number" name="userPhone"  className={userPhone === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail1" onKeyPress={(e)=>getEnterCodeForPhone(e)} placeholder="Enter User Phone" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
              </div>
              </div>

              <div className="col-lg-4 col-sm-12">
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1">User Name*</label>
                  <input type="text" name="Username"  className="form-control" value={userName} id="exampleInputEmail1" onKeyPress={(e)=>getEnterCodeForPhone(e)} placeholder="User Name" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
              </div>
              </div>

                <div className="col-lg-4 col-sm-12">
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Amount*</label>
                <input type="number" name="amount" value={amount} className={amount === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword1"  onChange={(e)=>setAmount(e.target.value)} placeholder="Enter Amount" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                </div>
                </div>
          </div>

        </div>
        {/* /.card-body */}
        <div className="card-footer text-right">
          <button type="submit" className="btn btn-outline-info" onClick={submitBalance}>
            {loading === true?"loading...":"Submit"}
            </button>
        </div>
    </div>
    {/* /.card */}
  </div>
  
 
</div>
</div>
</section>
</div>
</div>
    </>
  )
}

export default ShareBalanceForm