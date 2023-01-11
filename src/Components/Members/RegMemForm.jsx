import {useRegPostMutation} from '../services/Auth.js';
import React,{useState, useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from '../Colors/Styles.js';
import { toast } from "react-toastify";


const RegMemForm = () => {


    const [regPost , result] = useRegPostMutation();

    const[role , setRole] = useState('none');
    const[email , setEmail] = useState('');
    const[userName , setUsername] = useState('');
    const[firstName , setFirstName] = useState('');
    const[lastName , setLastName] = useState('');
    const[password , setPassword] = useState('');
    const[repassword , setRePassword] = useState('');
    const[phone , setPhone] = useState('');
    const [input , setInput] = useState(false);
    const[loading , setLoading] = useState(false);
    const[referCode, setReferCode] = useState('');
    const [sendRefCode , setSendRefCode] = useState('')
    const[cnic , setCnic] = useState('');

  // Getting admin information from local storage:

  const SetLocalLogin = async () => {
    try {
      let userObj = await localStorage.getItem('user');
      let parseUserObj = JSON.parse(userObj)
      
      if (parseUserObj !== null) {
        setReferCode(parseUserObj.referal_code)
      
      }

    } catch {
      return null;
    }
  }


// Function(RTQuery is used) for registering company members/hosts:

  const submitRegMembers = async (e)=>{
    e.preventDefault();
      setLoading(true)
      if(role && userName && email && password === repassword && phone){
          const regUserObj ={
              username:userName,
              password:password,
              password_confirmation:password,
              email:email,
              phone:phone,
              role_id:role,
              cnic:cnic,
              code:sendRefCode,
              firstname:firstName,
              lastname:lastName,
              question:"hey there",
              answer:"goood"
            }
            
        await regPost(regUserObj).unwrap()
        .then((res)=>{
            setLoading(false)
            toast.info("Member Registered!", {theme:"dark"})
                setRole('')
                setEmail('')
                setUsername('')
                setPassword('')
                setRePassword('')
                setPhone('')
                setCnic('')
                setSendRefCode('')
                setFirstName('')
                setLastName('')
   
        })
        .catch((res)=>{
          if(res.status === 401){
            setLoading(false)
            toast.warn(res.data.message,{theme:"dark"})
          }
          else{
            setLoading(false)
            toast.warn("Something went wrong",{theme:"dark"})

          }
         
         
      })

          setInput(false);
    }
    else if(password !== repassword){
        toast.warn("Password doesn't match",{theme:"dark"})
        setLoading(false)
         setInput(true)

    }
    else{
      
      toast.warn("Fill the information !",{theme:"dark"})
      setLoading(false)
      setInput(true)
    }


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
          <h1 style={{color:colorScheme.card_txt_color}}>Register</h1>
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
            Register Members &nbsp;&nbsp;&nbsp;
            <h5 className="align-items-center mt-1 text-bold">Your referral code &nbsp;&nbsp;"{referCode}"</h5>
            </div>
            {/* /.card-header */}
            {/* form start */}
      <form onSubmit={submitRegMembers}>

              <div className="card-body">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Role*</label>
                        <select  className={role === ''&& input === true?"form-control border border-danger":"form-control"}
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              onChange={(e)=>setRole(e.target.value)}
                              value={role}
                              >
                            <option value="none">None</option>
                            <option value="1">Super Admin</option>
                            <option value="6">Assist Admin</option>
                            <option value="2">Admin</option>
                            <option value="3">Manager</option>
                            <option value="4">Staff</option>
                            <option value="5">User</option>

                          </select>
                    </div>
                    </div>

                    
                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail2">Enter Referral Code*</label>
                        <input type="text" name="Referral" value={sendRefCode} className={sendRefCode === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail2"  onChange={(e)=>setSendRefCode(e.target.value)} placeholder="Enter Referral Code"   style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>
                    
                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail3">First name*</label>
                        <input type="text" name="firstName" value={firstName} className={firstName === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail3"  onChange={(e)=>setFirstName(e.target.value)} placeholder="Enter First Name"   style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>

               


            

                </div>

                <div className="row">
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail4">Last name*</label>
                        <input type="text" name="lastName" value={lastName} className={lastName === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail4"  onChange={(e)=>setLastName(e.target.value)} placeholder="Enter Last Name"   style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>
                    
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail5">Email*</label>
                        <input type="email" name="Income" value={email} className={email === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail5"  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"   style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>

                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword6">Username*</label>
                  <input type="text" name="Username" value={userName} className={userName === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword6"  onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Username" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                    </div>

                </div>
             

                <div className="row">
                  
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword7">Phone*</label>
                  <input type="number" name="Phone" value={phone} className={phone === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword7"  onChange={(e)=>setPhone(e.target.value)} placeholder="Enter Phone" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword7">CNIC*</label>
                  <input type="number" name="=cnic" value={cnic} className={cnic === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword7"  onChange={(e)=>setCnic(e.target.value)} placeholder="Enter Cnic" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>


                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword8">Password*</label>
                  <input type="password" name="Price" value={password} className={password === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword8"  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword9">Re-Password*</label>
                  <input type="password" name="Quantity" value={repassword} className={repassword === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword9"  onChange={(e)=>setRePassword(e.target.value)} placeholder="Enter Re-Password" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                
            


                </div>

              </div>
              {/* /.card-body */}
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-outline-info">
                    {loading === true? "loading...":"Submit"}
                </button>
              </div>
              </form>
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

export default RegMemForm