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
import MemberSheet from './Components/Members/MemberSheet.jsx';
import UpdateMemberForm from './Components/Members/UpdateMemForm.jsx';
import StaffQuerySheet from './Components/Members/StaffQuerySheet.jsx';
import StaffTicketSheet from './Components/Members/StaffTicketSheet.jsx';



// Users
import UserSheet from './Components/Users/UserSheet.jsx';
import UpdateUserForm from './Components/Users/UpdateUserForm.jsx';
import TimeLine from './Components/UserTimeline/UserTimelineSheet.jsx';
import SuspendedUsers from './Components/Users/SuspendedUserSheet.jsx';


// Packages 
import AddPackageForm from './Components/Packages/AddPackagesForm.jsx';
import PackageSheet from './Components/Packages/PackagesTable.jsx';
import UpdatePackageForm from './Components/Packages/UpdatePackageForm.jsx';

// Deposits
import AllDepositsSheet from './Components/Deposits/AllDepositsSheet.jsx';
import BalanceSheet from './Components/Deposits/BalanceSheet.jsx';
import RejectDepositSheet from './Components/Deposits/RejectDepositSheet.jsx';

// Investments & Withdrawals
import InvestmentSheet from './Components/Investments/InvestmentSheet.jsx';
import WithdrawalSheet from './Components/Withdrawals/WithdrawalSheet.jsx';
import WithdrawalRejectSheet from './Components/Withdrawals/WithdrawalRejectionSheet.jsx';

// Promotions
import RewardApprovalSheet from './Components/Promotions/RewardApprovalSheet.jsx';
import StopPromoSheet from './Components/Promotions/StopPromotionSheet.jsx';

// Lucky Draw
import AddLuckyDrawForm from './Components/LuckyDraw/AddLuckyDraw.jsx';
import LuckyDrawSheet from './Components/LuckyDraw/LuckyDrawSheet.jsx';
import ParticipantSheet from './Components/LuckyDraw/ParticipantSheet.jsx';

import PaymentForm from './Components/Payments/PaymentForm.jsx';
import PaymentSheet from './Components/Payments/PaymentSheet.jsx';
import UpdatePaymentSheet from './Components/Payments/UpdatePaymentForm.jsx';

// Levels
import AddLevelForm from './Components/Levels/AddLevelForm.jsx';
import LevelSheet from './Components/Levels/LevelSheet.jsx';
import LevelRewardSheet from './Components/Levels/LevelRewardSheet.jsx';


// Share Balance
import ShareBalanceForm from './Components/ShareBalance/ShareBalanceForm.jsx';
import ShareBalanceSheet from './Components/ShareBalance/ShareBalanceSheet.jsx';
import RetBalanceSheet from './Components/ShareBalance/RetBalance.jsx';

// Deduct Balance Sheet
import DeductBalanceForm from './Components/DeductBalance/DeductBalanceForm.jsx';
import DeductBalanceSheet from './Components/DeductBalance/DeductBalanceSheet.jsx';



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
            {/* <Route path="/Registeration" element={<Register/>}/> */}
          </Routes>
      </Router>
        :
           <Router>
           <Navbar/>
           <Sidebar/>
           <Routes>
           <Route path="/" element={<MemProfile/>}/>

           <Route path="/UserSheet" element={<UserSheet />}/>
           <Route path="/UpdateUserForm" element={<UpdateUserForm/>}/>
           <Route path="/TimeLine" element={<TimeLine/>}/>
           <Route path="/SuspendedUsers" element={<SuspendedUsers/>}/>

           <Route path="/RegMemForm" element={<RegMemForm/>}/>
           <Route path="/MemberSheet" element={<MemberSheet/>}/>
           <Route path="/UpdateMemberForm" element={<UpdateMemberForm/>}/>
           <Route path="/StaffQuerySheet" element={<StaffQuerySheet/>}/>
           <Route path="/StaffTicketSheet" element={<StaffTicketSheet/>}/>

           <Route path="/AddPackageForm" element={<AddPackageForm/>}/>
           <Route path="/PackageSheet" element={<PackageSheet/>}/>
           <Route path="/UpdatePackageForm" element={<UpdatePackageForm/>}/>
          
           
           <Route path="/AllDepositsSheet" element={<AllDepositsSheet/>}/>
           <Route path="/BalanceSheet" element={<BalanceSheet/>}/>
           <Route path="/RejectDepositSheet" element={<RejectDepositSheet/>}/>

           

           <Route path="/InvestmentSheet" element={<InvestmentSheet/>}/>
           <Route path="/WithdrawalSheet" element={<WithdrawalSheet/>}/>
           <Route path="/WithdrawalRejectSheet" element={<WithdrawalRejectSheet/>}/>

           


           <Route path="/RewardApprovalSheet" element={<RewardApprovalSheet/>}/>
           <Route path="/StopPromotionSheet" element={<StopPromoSheet/>}/>

           <Route path="/AddLuckyDrawForm" element={<AddLuckyDrawForm/>}/>
           <Route path="/LuckyDrawSheet" element={<LuckyDrawSheet/>}/>
           <Route path="/ParticipantSheet" element={<ParticipantSheet/>}/>

           <Route path="/DailyChart" element={<DailyChart/>}/>
           <Route path="/RevenueChart" element={<RevenueChart/>}/>

           <Route path="/AddLevelForm" element={<AddLevelForm/>}/>
           <Route path="/LevelSheet" element={<LevelSheet/>}/>
           <Route path="/LevelRewardSheet" element={<LevelRewardSheet/>}/>    

           <Route path="/ShareBalanceForm" element={<ShareBalanceForm/>}/>
           <Route path="/ShareBalanceSheet" element={<ShareBalanceSheet/>}/> 
           <Route path="/RetBalanceSheet" element={<RetBalanceSheet/>}/> 

              

           <Route path="/DeductBalanceForm" element={<DeductBalanceForm/>}/>
           <Route path="/DeductBalanceSheet" element={<DeductBalanceSheet/>}/>    

           



           <Route path="/TipsTricksForm" element={<TipsTricksForm/>}/>
           <Route path="/TipsTrickSheet" element={<TipsTrickSheet/>}/>

           
           <Route path="/PaymentForm" element={<PaymentForm/>}/>
           <Route path="/PaymentSheet" element={<PaymentSheet/>}/>
           <Route path="/UpdatePaymentSheet" element={<UpdatePaymentSheet/>}/>

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
