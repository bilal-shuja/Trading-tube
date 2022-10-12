import './App.css';
import React,{useState, useEffect} from 'react' ;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Navbar from './Components/Layout/Navbar.jsx';
import Sidebar from './Components/Layout/Sidebar.jsx';
import Footer from './Components/Layout/Footer.jsx';


// Auth
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';


// Packages 
import AddPackageForm from './Components/Packages/AddPackagesForm.jsx';
import PackageSheet from './Components/Packages/PackagesTable.jsx';
import UpdatePackageForm from './Components/Packages/UpdatePackageForm.jsx';

// Deposits
import AllDepositsTable from './Components/Deposits/AllDepositsTable.jsx';
import BalanceSheet from './Components/Deposits/BalanceSheet.jsx';

// Investments
import InvestmentSheet from './Components/Investments/InvestmentSheet.jsx';

import Content from './Components/Content.jsx';

function App() {
  const[login , setLogin] = useState(false)
  const SetLocalLogin= async ()=>{
    try{
      let userLogin = await localStorage.getItem('login');
      let parsed = JSON.parse(userLogin);
      if(parsed !== null){
        setLogin(parsed);
      }
    }catch{
        return null;
    }
  }
  useEffect(() => {
    SetLocalLogin()
  }, [])
  return (
    <div className="wrapper">
      {
        login === false?
            <Router>
            <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/Registeration" element={<Register/>}/>
          </Routes>
      </Router>
        :
           <Router>
           <Navbar/>
           <Sidebar/>
           <Routes>
           <Route path="/" element={<Content/>}/>

           <Route path="/AddPackageForm" element={<AddPackageForm/>}/>
           <Route path="/PackageSheet" element={<PackageSheet/>}/>
           <Route path="/UpdatePackageForm" element={<UpdatePackageForm/>}/>
          
           
           <Route path="/AllDepositsTable" element={<AllDepositsTable/>}/>
           <Route path="/BalanceSheet" element={<BalanceSheet/>}/>

           <Route path="/InvestmentSheet" element={<InvestmentSheet/>}/>

           
           
           </Routes>
           <Footer/>
           </Router>

      }
   
    </div>
  );
}

export default App;
