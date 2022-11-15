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

// Members
import MemProfile from './Components/Members/MemProfile.jsx';
import RegMemForm from './Components/Members/RegMemForm.jsx';

// Users
import UserSheet from './Components/Users/UserSheet.jsx';
import MemberSheet from './Components/Members/MemberSheet.jsx';

// Packages 
import AddPackageForm from './Components/Packages/AddPackagesForm.jsx';
import PackageSheet from './Components/Packages/PackagesTable.jsx';
import UpdatePackageForm from './Components/Packages/UpdatePackageForm.jsx';

// Deposits
import AllDepositsSheet from './Components/Deposits/AllDepositsSheet.jsx';
import BalanceSheet from './Components/Deposits/BalanceSheet.jsx';

// Investments & Withdrawals
import InvestmentSheet from './Components/Investments/InvestmentSheet.jsx';
import WithdrawalSheet from './Components/Investments/WithdrawalSheet.jsx';

// Promotions
import RewardApprovalSheet from './Components/Promotions/RewardApprovalSheet.jsx';
import StopPromoSheet from './Components/Promotions/StopPromotionSheet.jsx';

// Lucky Draw

import AddLuckyDrawForm from './Components/LuckyDraw/AddLuckyDraw.jsx';
import LuckyDrawSheet from './Components/LuckyDraw/LuckyDrawSheet.jsx';
import ParticipantSheet from './Components/LuckyDraw/ParticipantSheet.jsx';

// Levels
import AddLevelForm from './Components/Levels/AddLevelForm.jsx';
import LevelSheet from './Components/Levels/LevelSheet.jsx';


// Statistics

import DailyChart from './Components/Statistics/DailyChart.jsx';
import RevenueChart from './Components/Statistics/RevenueChart.jsx';


// Tips&Tricks
import TipsTricksForm from './Components/Tips&Tricks/TipsTricksForm.jsx';
import TipsTrickSheet from './Components/Tips&Tricks/TipsTrickSheet.jsx';

// Help Center
import HelpCenter from './Components/HelpCenter/HelpCenter.jsx';
import HelpChatCenter from './Components/HelpCenter/HelpChatCenter.jsx';
import LiveChat from './Components/HelpCenter/LiveChat.jsx';
import LiveChatCenter from './Components/HelpCenter/LiveChatCenter.jsx';




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
           <Route path="/" element={<MemProfile/>}/>
           <Route path="/RegMemForm" element={<RegMemForm/>}/>
           <Route path="/MemberSheet" element={<MemberSheet/>}/>

           

           <Route path="/UserSheet" element={<UserSheet/>}/>

           
           

           <Route path="/AddPackageForm" element={<AddPackageForm/>}/>
           <Route path="/PackageSheet" element={<PackageSheet/>}/>
           <Route path="/UpdatePackageForm" element={<UpdatePackageForm/>}/>
          
           
           <Route path="/AllDepositsSheet" element={<AllDepositsSheet/>}/>
           <Route path="/BalanceSheet" element={<BalanceSheet/>}/>

           <Route path="/InvestmentSheet" element={<InvestmentSheet/>}/>
           <Route path="/WithdrawalSheet" element={<WithdrawalSheet/>}/>


           <Route path="/RewardApprovalSheet" element={<RewardApprovalSheet/>}/>
           <Route path="/StopPromotionSheet" element={<StopPromoSheet/>}/>

           <Route path="/AddLuckyDrawForm" element={<AddLuckyDrawForm/>}/>
           <Route path="/LuckyDrawSheet" element={<LuckyDrawSheet/>}/>
           <Route path="/ParticipantSheet" element={<ParticipantSheet/>}/>

           <Route path="/DailyChart" element={<DailyChart/>}/>
           <Route path="/RevenueChart" element={<RevenueChart/>}/>

           <Route path="/AddLevelForm" element={<AddLevelForm/>}/>
           <Route path="/LevelSheet" element={<LevelSheet/>}/>

           <Route path="/TipsTricksForm" element={<TipsTricksForm/>}/>
           <Route path="/TipsTrickSheet" element={<TipsTrickSheet/>}/>


           

           <Route path="/HelpCenter" element={<HelpCenter/>}/>
           <Route path="/HelpChatCenter" element={<HelpChatCenter/>}/>
           
           <Route path="/LiveChat" element={<LiveChat/>}/>
           <Route path="/LiveChatCenter" element={<LiveChatCenter/>}/>

           

           
           </Routes>
           <Footer/>
           </Router>

      }
   
    </div>
  );
}

export default App;
