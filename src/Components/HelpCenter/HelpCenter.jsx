import UserTimelineModal from '../UserTimeline/UserTimelineModal';
import React, { useState , useEffect , useRef} from "react";
import { Link, useLocation } from "react-router-dom";
import colorScheme from "../Colors/Styles.js";
import ReadMoreReact from "read-more-react";
import axios from 'axios';

const HelpCenter = () => {
  const [helpCenter, setHelpCenter] = useState([]);
  const [status, setStatus] = useState("pending");
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  function handleScroll(event) {
    setScrollPosition(event.target.scrollTop);
  }




  // Radio button which shows (pendig/closed) tickets in the screen:

  const changePeriod = (e) => {
    if (e.target.checked === true) {
      setStatus("pending");
    } else if (e.target.checked === false) {
      setStatus("closed");
    } else {
    }
  }

  // fetching all tickets of user in the screen:

  function gettingHelpData(){
    axios.get(`${process.env.REACT_APP_BASE_URL}fetch_all_tickets`)
    .then((res)=>{
      setHelpCenter(res.data.data);
 
    })
    .catch((error)=>{

      return error;
    })
    
  }
  // function handleScrollPosition() {
  //   const getScrollPosition = sessionStorage.getItem("scrollPosition");
  //   if (getScrollPosition) {
  //     window.scrollTo(0, parseInt(getScrollPosition));
  //     sessionStorage.removeItem("scrollPosition");
  //   }

  // };
  
  // function handleScrollClick () {
  //   sessionStorage.setItem("scrollPosition", scrollPosition);
  // };
function exampleClick(){
  window.scrollTo(0,2500);
}

  function handleScrollClick () {
    sessionStorage.setItem("scrollPosition", scrollPosition);
  }


  function HelpCenterChat({items,index}){
    const [isShowUserModal,setShowUserModal] = useState(false)
  
    function onHide(){
      setShowUserModal(false)
    }

    return(
      <>
         <div
                            className="card"
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              boxShadow: colorScheme.box_shadow_one,
                            }}
                          >
                            <div className="card-header">
                              <div className="card-tools">
                                <button
                                  type="button"
                                  className="btn btn-tool"
                                  data-card-widget="collapse"
                                  title="Collapse"
                                >
                                  <i className="fas fa-minus" />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-tool"
                                  data-card-widget="remove"
                                  title="Remove"
                                >
                                  <i className="fas fa-times" />
                                </button>
                              </div>
                              <div className="d-flex">
                            <h3 className="card-title">
                              <b>{items.title}</b>
                            </h3>&nbsp;&nbsp;&nbsp;
                            <h4 className="text-info">(#{items.id})</h4>
                            </div>
                            </div>
                            <div className="card-body">
                              <h4>{items.username}</h4>
                              <ReadMoreReact
                                text={items.body}
                                min={70}
                                ideal={140}
                                max={300}
                                readMoreText="...Read More"
                              />
                            </div>
                            <div className="card-footer d-flex bd-highlight">
                              <h6 className="flex-grow-1 bd-highlight">
                                {items.status === "pending" ? (
                                  <button className="btn btn-outline-warning">
                                    Pending
                                  </button>
                                ) : (
                                  <button className="btn btn-outline-success">
                                    Closed
                                  </button>
                                )}
                                &nbsp;&nbsp;&nbsp;
                                {items.Idate}
                              </h6>

                              <Link
                              to="/HelpChatCenter"
                              state={{
                                ID:items.id,
                                userID: items.user_id,
                                userName:items.username,
                                userTitle:items.title,
                                ticketStatus:items.status,
                                userBody:items.body,
                                userDate:items.created_at

                              }}
                              className="btn btn-outline-info btn-lg"
                            >
                              <i className="fa-sharp fa-solid fa-comment"></i>
                            </Link>
                            &nbsp;&nbsp;

                            <button className="btn btn-outline-primary" onClick={ ()=>{
                              setShowUserModal(true)                  
                              }}>
                              <i className="fa-solid fa-timeline"></i>
                            </button>
                             {/* <Link className="btn btn-outline-primary btn-lg"  to="/TimeLine"
                              state={{ID:items.user_id, target:"/HelpCenter"}}>
                             <i className="fa-solid fa-timeline"></i>
                              </Link> */}

                            </div>
                          </div>



                          {
                isShowUserModal === true &&
                <UserTimelineModal
                ID = {items.user_id}
                isShow = {isShowUserModal}
                onHide={onHide}
              />
              }
                  </>
    )
  
  }




  useEffect(() => {
    gettingHelpData()

  }, []);
  

  return (
    <>
    {/* onScroll={handleScroll} */}
<div className="scroll-view-two scrollbar-secondary-two" >
    
      <div className="content-wrapper" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid ">
            <div className="row mb-2">
              <div className="col-sm-12 text-center">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  &nbsp;&nbsp;Help Center &nbsp;&nbsp;
                  <i
                    className="fa-solid fa-headset "
                    style={{ fontSize: "1.3em" }}
                  ></i>
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section className="content p-4">
          <div className="container-fluid">
            <h4 style={{ color: colorScheme.card_txt_color }}>Check Tickets</h4>
            <label className="switch mb-4 mr-5">
              <input type="checkbox" onChange={changePeriod} value={status}/>
              <div className="slider round">
                <div className="on">Pending</div>
                <div className="off">Closed</div>
              </div>
            </label>
            <button
              className="btn btn-outline-info"
              onClick={() => {
                window.location.reload(true);
              }}
            >
              Reset
            </button>
            <div className="row">
              <div className="col-lg-10 col-sm-12">
                {status === "pending"
                  ? helpCenter
                      .filter((items) => items.status === status)
                      .map((items,index) => {
                        return (
                          <HelpCenterChat items={items} index={index}/>
                        );
                      })
                  : status === "closed"
                  ? helpCenter
                      .filter((items) => items.status === status)
                      .map((items,index) => {
                        return (
                          <HelpCenterChat items={items} index={index}/>
                        );
                      })
                  : helpCenter.map((items, index) => {
                      return (
                        <HelpCenterChat items={items} index={index}/>
                      );
                    })}
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
    </>
  );
};

export default HelpCenter;
