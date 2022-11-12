import { Link, useLocation } from "react-router-dom";
import React,{useState , useEffect} from "react";
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles.js";
import { toast } from "react-toastify";
import axios from 'axios';

const HelpChatCenter = () => {
  const location = useLocation();
  const ID = location.state.ID
  const userID = location.state.userID;
  const userName = location.state.userName;
  const title = location.state.userTitle;
  const body = location.state.userBody;
  const date = location.state.userDate


  const[userTickets , setTickets] = useState([])
  const[getTicketReplys , setTicketReplys] = useState([])
  const [adminID , setAdminID] = useState('')
  const[memName , setMemName] = useState('')
  const[ticketReply , setTicketReply] = useState('');
  const[loading , setLoading] = useState(false);

  const SetLocalLogin = async () => {
    try {
      let mem_Name = await localStorage.getItem('mem_Name');
      let admin_ID = await localStorage.getItem('id');
  
      if (mem_Name !== null && admin_ID !== null) {
        setAdminID(admin_ID);
        setMemName(mem_Name)
      }

    } catch {
      return null;
    }
  }

  function gettingUserTickets(){
    const userTicketID = {
      user_id:userID
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}fetch_ticket_by_userid`,userTicketID)
    .then((res)=>{
      setTickets(res.data.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  function replyingTicket(){
    setLoading(true)
    const sendingTicketObj={
      ticket_id:ID,
      sender_id:adminID,
      sender_type:memName,
      body:ticketReply
    }
    setTicketReplys(p =>[...p , sendingTicketObj])
    axios.post(`${process.env.REACT_APP_BASE_URL}post_reply`,sendingTicketObj)
    .then((res)=>{
      setLoading(false)
      toast.info("Message Send!",{theme:"dark"})
      setTicketReply('')
      gettingRelpyTicket()
    })
    .catch((error)=>{
      if(error.status === 401){
        setLoading(false)
        toast.warn(error.data.message,{theme:"dark"})
      }
      else{
        toast.warn("Something went wrong",{theme:"dark"})
        setLoading(false)

      }
    })
  }

  function gettingRelpyTicket(){
    const ticketID={
      ticket_id:ID
    }   
    axios.post(`${process.env.REACT_APP_BASE_URL}fetch_reply_by_ticketid`,ticketID)
    .then((res)=>{
      setTicketReplys(res.data.Reply)
      console.log(res.data.Reply)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  console.log(getTicketReplys)

  useEffect(() => {
    gettingUserTickets()
    gettingRelpyTicket()
    SetLocalLogin()
  }, [])
  

  return (
    <>
<div className="scroll-view-two scrollbar-secondary-inbox">

      <div className="content-wrapper" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid ">
            <div className="row mb-2 mt-5">
              <div className="col-sm-9">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  <div className="d-flex">
                    <i className="fas fa-life-ring" />
                    &nbsp;&nbsp;
                    <h4 style={{ fontFamily: colorScheme.FontFamily }}>
                      <strong>{title}</strong>
                    </h4>
                    &nbsp;&nbsp; (#{ID})
                  </div>
                </h1>
              </div>
              <div className="col-sm-3">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active">
                    <Link
                      to="/HelpCenter"
                      style={{ color: colorScheme.card_txt_color }}
                    >
                      <i className="fas fa-circle-arrow-left fa-2x" />
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <div className="border-line mx-auto" />

        
<section className="content mt-3">
  <div className="container">
    <div className="row">
      <div className="scroll-view-two scrollbar-secondary-two">
 
          <div className="col-lg-10 col-sm-12">
          {/* User Area */}
          <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
            <div className="card-header">
              <div className="card-tools">
                <button type="button" className="btn btn-tool user-date-box rounded text-white mr-2" data-card-widget="" title="Remove">
                {date}
                </button>
              </div>
              <div className="d-flex">
              <h3 className="card-title">
                 <strong>{userName}</strong> 
              </h3>&nbsp;&nbsp;
              <div className="user-box rounded">User</div>
              </div>
      
            </div>
            <div className="card-body">
                {
                  body
                }
            </div>
          </div>
                  
          </div>

      
           {/* Staff Area */}
           {
            getTicketReplys.map((items)=>{
              return(
                <div className={items.sender_type === "Admin"?"col-lg-10 col-sm-12 float-right":"ml-4 col-lg-10 col-sm-12 float-left"}>
                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
             <div className="card-header">
               <div className="card-tools">
                 <button type="button" className={items.sender_type === "Admin"?"btn btn-tool staff-date-box rounded text-white mr-2":"btn btn-tool staff-date-box rounded text-white mr-2"} data-card-widget="" title="Remove">
                 {items.Idate}
                 </button>
               </div>
               <div className="d-flex">
               <h3 className="card-title">
                  <strong>{items.sender_type === "Admin"?"Admin":items.sender_type}</strong> 
               </h3>&nbsp;&nbsp;
               <div className={items.sender_type ==="Admin"?"staff-box rounded":"user-box rounded"}>{items.sender_type ==="Admin"?"Staff":"User"}</div>
               </div>
       
             </div>
             <div className="card-body">
             {items.body}
             </div>
           </div>
           </div>
              )
            })
           }


        </div>
              
        <div className="col-lg-11 col-sm-12 mx-auto mb-2 mt-2">
        <div className="text-box">
        <textarea className="form-control type-message rounded p-4" placeholder="Type your message here..." value={ticketReply} onChange={(e)=>{setTicketReply(e.target.value)}} rows={5}  style={{ background: colorScheme.body_bg_color , color: colorScheme.card_txt_color  }} />
       
        <button onClick={replyingTicket} className="btn btn-outline-info d-block col-2 mt-3 float-right text-box-btn">
          {
            loading === true? "Loading...":"Send"
          }
        </button>
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

export default HelpChatCenter;
