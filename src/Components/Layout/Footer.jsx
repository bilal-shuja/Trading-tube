import React from 'react'

const Footer = () => {
  return (
    <>
  <footer className="main-footer" style={{background:"#2d324e",border:"none",color:"#d0d2d6"}}>
  {/* To the right */}
  <div className="float-right d-none d-sm-inline">
    Anything you want
  </div>
  {/* Default to the left */}
  <strong>Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
</footer>

    </>
  )
}

export default Footer