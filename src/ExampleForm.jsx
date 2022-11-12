import React,{useState} from 'react';
import {useCreatePostMutation} from './Components/services/GetBlogs.js';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const ExampleForm = () => {
    const [createPost , result] = useCreatePostMutation()
    const [text, seText] = useState('');
    const [textt, seTextt] = useState('');
    const [texttt, seTexttt] = useState('');
    const [textttt, seTextttt] = useState('');
    const [texttttt, seTexttttt] = useState('');
    const[file , setFile] = useState('');



const  sendData = async ()=>{
    // if(result.isSuccess){
        var formdata = new FormData();
        formdata.append("email",text);
        formdata.append("password", textt);
        // formdata.append("num_of_reviews", texttt);
        // formdata.append("total_orders", textttt);
        // formdata.append("content", texttttt);
        // formdata.append("avatar", file);
    
        await createPost(formdata).unwrap()
        .then((res)=>{
            toast.info("Goods")
            console.log(res.user.username)
            console.log(result)
        })
        .catch((error)=>{
            toast.warn("Error")
            console.log(result)
            // console.table(error)
        })

    // }
    // else{
    //     toast.warn(result.isError)
    // }
  

    // axios.post(`${process.env.REACT_APP_BASE_URL}postfaq`,formdata)
    // .then((res)=>{
    //     toast.info('Good')
    //     console.log(res)
    // })
    // .catch((error)=>{
    //     console.log(error)
    // })
}


  return (
    <>
    <div className="content-wrapper">
        <div className="card">
            <div className="card-header">
                Form
            </div>
            <div className="card-body">
                <input type="email" className="form-control" onChange={(e)=> seText(e.target.value)} />
                <input type="text" className="form-control" onChange={(e)=> seTextt(e.target.value)} />
                {/* <input type="text" className="form-control" onChange={(e)=> seTexttt(e.target.value)} /> */}
                {/* <input type="text" className="form-control" onChange={(e)=> seTextttt(e.target.value)} /> */}
                {/* <input type="text" className="form-control" onChange={(e)=> seTexttttt(e.target.value)} /> */}
                {/* <input type="file" className="form-control" onChange={(e)=>setFile(e.target.files[0])}/> */}

                <button className="btn btn-outline-info" onClick={sendData}>Submit</button>


            </div>
        </div>

    </div>
    </>
  )
}

export default ExampleForm