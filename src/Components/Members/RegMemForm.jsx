import React,{useState} from 'react';
import { toast } from "react-toastify";
import colorScheme from '../Colors/Styles.js';
import "react-toastify/dist/ReactToastify.css";
import {useRegPostMutation} from '../services/Auth.js';


const RegMemForm = () => {


    const [regPost , result] = useRegPostMutation();

    const[role , setRole] = useState('none');
    const[email , setEmail] = useState('');
    const[userName , setUsername] = useState('');
    const[password , setPassword] = useState('');
    const[repassword , setRePassword] = useState('');
    const[phone , setPhone] = useState('');
    const [input , setInput] = useState(false);
    const[loading , setLoading] = useState(false);


  const submitPackage = async (e)=>{
    e.preventDefault();
      setLoading(true)
      if(role && userName && email && password === repassword && phone){
          const regUserObj ={
              username:userName,
              password:password,
              password_confirmation:password,
              email:email,
              phone:phone,
              role_id:role
            }
            
        await regPost(regUserObj).unwrap()
        .then((res)=>{
            setLoading(false)
            toast.info("Member Registered", {theme:"dark"})
            
                setRole('')
                setEmail('')
                setUsername('')
                setPassword('')
                setRePassword('')
                setPhone('')
   
        })
        .catch((error)=>{
          if(error.status === 401){
            setLoading(false)
            toast.warn(error.data.message)
          }
          else{
            setLoading(false)
            toast.warn("Something went wrong",{theme:"dark"})
            console.log(error)

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
  return (
    <>
    <div className="scroll-view-two scrollbar-secondary-two">
<div className="content-wrapper p-3" style={{background:colorScheme.body_bg_color}}>

  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Register Members</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            {/* <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}}><i className="fa-solid fa-lock fa-2x"></i></a></li> */}
            {/* <li className="breadcrumb-item active">Add Package</li> */}
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
            Register Members
            </div>
            {/* /.card-header */}
            {/* form start */}
      <form onSubmit={submitPackage}>

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
                            <option value="2">Admin</option>
                            <option value="3">Manager</option>
                            <option value="4">Staff</option>
                            <option value="5">User</option>

                          </select>
                    </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email*</label>
                        <input type="email" name="Income" value={email} className={email === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputEmail2"  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"   style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}}/>
                    </div>
                    </div>

                    <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Username*</label>
                  <input type="text" name="Quantity" value={userName} className={userName === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword3"  onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Username" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                    </div>

                </div>

                <div className="row">

                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password*</label>
                  <input type="password" name="Price" value={password} className={password === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword4"  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Re-Password*</label>
                  <input type="password" name="Quantity" value={repassword} className={repassword === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword5"  onChange={(e)=>setRePassword(e.target.value)} placeholder="Enter Re-Password" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
                </div>
                </div>

                
                <div className="col-lg-4 col-sm-12">
                    <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Phone*</label>
                  <input type="number" name="Quantity" value={phone} className={phone === ''&& input === true?"form-control border border-danger":"form-control"} id="exampleInputPassword6"  onChange={(e)=>setPhone(e.target.value)} placeholder="Enter Phone" style={{background:colorScheme.login_card_bg, color:colorScheme.card_txt_color}} />
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