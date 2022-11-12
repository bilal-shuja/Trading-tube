import React,{useState } from 'react';
import colorScheme from "../Colors/Styles.js";


const Filter = ({PackageData,DepositData, InvestData,BalanceData ,PromotionData,StopPromotionData,luckyDrawData,ParticipantData,DateFilter,StatusFilter , PriceStatus, PackageTableIdentifier, DepoSheetIdentifier,InvestmentSheetIdentifier,BalanceSheetIdentifier,PromotionSheetIdentifier,StopPromoSheetIdentifier,LuckyDrawSheetIdentifier,ParticipantSheetIdentifier}) => {



    function searchByDate(e){
      if(PackageTableIdentifier){
        if(e.target.value !== " "){
          const dateFilter = PackageData.filter((items)=> items.Idate === e.target.value)
          DateFilter(dateFilter)      
        }
        else{
          DateFilter(PackageData)
        }
      }
   
      else if(DepoSheetIdentifier){
        if(e.target.value !== " "){
          const dateFilter = DepositData.filter((items)=> items.Idate === e.target.value)
          DateFilter(dateFilter)      
        }
        else{
          DateFilter(DepositData)
        }
      }
    else if(InvestmentSheetIdentifier){
      if(e.target.value !== " "){
        const dateFilter = InvestData.filter((items)=> items.Created_at === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(InvestData)
      }
    }
    else if(BalanceSheetIdentifier){
      if(e.target.value !== " "){
        const dateFilter = BalanceData.filter((items)=> items.date === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(BalanceData)
      }

    }
    else if(PromotionSheetIdentifier){
      if(e.target.value !== " "){
        const dateFilter = PromotionData.filter((items)=> items.date === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(PromotionData)
      }
    }
    else if(StopPromoSheetIdentifier){
      if(e.target.value !== " "){
        const dateFilter = StopPromotionData.filter((items)=> items.date === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(StopPromotionData)
      }
    }
    else if(LuckyDrawSheetIdentifier){
      if(e.target.value !== " "){
        const dateFilter = luckyDrawData.filter((items)=> items.Idate === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(luckyDrawData)
      }

    }
    else if(ParticipantSheetIdentifier){
      if(e.target.value !== " "){
        const dateFilter = ParticipantData.filter((items)=> items.date === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(ParticipantData)
      }
    }
      
      else{
        console.log("")
      }
    }

    function searchByStatus(e){
      if(PackageTableIdentifier){
        if(e.target.value !== "All"){
          console.log(PackageData)
          const statusFilter = PackageData.filter((items)=> items.status === e.target.value)
          StatusFilter(statusFilter)
        }
        else{
          StatusFilter(PackageData)
        }
  
      }
      else if(DepoSheetIdentifier){
        if(e.target.value !== "All"){
          console.log(e.target.value)
          const statusFilter = DepositData.filter((items)=> items.status === e.target.value)
          StatusFilter(statusFilter)
        }
        else{
          StatusFilter(DepositData)
        }
      }
      else if(InvestmentSheetIdentifier){
        if(e.target.value !== "All"){
          const statusFilter = InvestData.filter((items)=> items.Status === e.target.value)
          StatusFilter(statusFilter)
        }
        else{
          StatusFilter(InvestData)
        }
      }
      else if(BalanceSheetIdentifier){
        if(e.target.value !== "All"){
          const statusFilter = BalanceData.filter((items)=> items.Status === e.target.value)
          StatusFilter(statusFilter)
        }
        else{
          StatusFilter(BalanceData)
        }

      }
      else if(LuckyDrawSheetIdentifier){
        if(e.target.value !== "All"){
          const statusFilter = luckyDrawData.filter((items)=> items.status === e.target.value)
          StatusFilter(statusFilter)
        }
        else{
          StatusFilter(luckyDrawData)
        }

      }
      else{
        console.log("")
      }
     

    }
    
    function searchByPrice(e){
      if(PackageTableIdentifier){
  
      if(e.target.value === "H-to-L"){

        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.price-a.price)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){

        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.price-b.price)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }
    }
    else if(DepoSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.amount-a.amount)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.amount-b.amount)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }

    }
    else if(InvestmentSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.Price-a.Price)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.Price-b.Price)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }
    }
    else if(BalanceSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.amount-a.amount)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.amount-b.amount)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }
    }
    else if(PromotionSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.Amount-a.Amount)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.Amount-b.Amount)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }
    }
    else if(StopPromoSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.Amount-a.Amount)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.Amount-b.Amount)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }
    }
    else if(LuckyDrawSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.fees-a.fees)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.fees-b.fees)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }

    }
    else if(ParticipantSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.Amount-a.Amount)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.Amount-b.Amount)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.mem_id-a.mem_id)
          return temparr
          
         })
      }

    }
    else{
      console.log("")
    }

    }



    
  return (
    <>
        <div className={PromotionSheetIdentifier || StopPromoSheetIdentifier || ParticipantSheetIdentifier?"col-sm-5":"col-sm-4"}>
                    <label htmlFor="" className="form-label">Filter by {LuckyDrawSheetIdentifier || ParticipantSheetIdentifier ? "Fee":"Price"}:</label>
                        <div className="form-group">
                          <select  className="form-control" 
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              onChange={(e)=>searchByPrice(e)}
                              >
                            <option value="All">All</option>
                            <option value="H-to-L">High to Low</option>
                            <option value="L-to-H">Low to High</option>

                          </select>
                        </div>
                    </div>
                    
                    {
                      PromotionSheetIdentifier || StopPromoSheetIdentifier || ParticipantSheetIdentifier? null:
                      <div className="col-sm-4">
                      <label htmlFor="" className="form-label"> Search with Status:</label>
                    <div className="form-group">
                      <select type="text" className="form-control" 
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=>searchByStatus(e)}
                        >
                            <option value="All">All</option>
                            <option value={DepoSheetIdentifier?"approved":"active"}>{DepoSheetIdentifier?"approved":"active"}</option>
                            <option value={DepoSheetIdentifier?"unapproved":"in-active"}>{DepoSheetIdentifier?"unapproved":"in-active"}</option>
                         </select>
                    </div>
                    </div>
                    }
      
         <div className={PromotionSheetIdentifier || StopPromoSheetIdentifier || ParticipantSheetIdentifier?"col-sm-5":"col-sm-4"}>
                <label htmlFor="" className="form-label "> Search with Date:</label>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search by Date..."
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=> searchByDate(e)}
                      />
                 </div>
            </div>

    </>
  )
}

export default Filter