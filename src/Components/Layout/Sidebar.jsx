import React,{useEffect} from 'react'
import {Link} from 'react-router-dom';

const Sidebar = () => {
  useEffect(() => {
    const trees = window.$('[data-widget="treeview"]');
    trees.Treeview('init');
  }, [])
  
  return (
    <>
<aside className="main-sidebar sidebar-dark-primary elevation-4" style={{background:"#2d324e"}}>
  {/* Brand Logo */}
  <a href="/" className="brand-link">
    <img src="assets/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">Trading Tube</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="assets/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <a href="/" className="d-block">Bilal Shuja</a>
      </div>
    </div>

    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="true">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item menu treeview" style={{color:"#d0d2d6"}}>
          <Link to="#" className="nav-link">
            <i className="nav-icon fas fa-box mr-2" />
            <p>
              Packages
              <i className="right fas fa-angle-left" />
            </p>
          </Link>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to="/AddPackageForm" className="nav-link ">
                <i className="far fa-circle nav-icon" />
                <p>Add Package</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/PackageSheet" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Packages Sheet</p>
              </Link>
            </li>
          </ul>
        </li>

          <li className="nav-item menu treeview">
            <Link to="#" className="nav-link   ">
              <i className="nav-icon fas fa-briefcase" />
              <p>
                Deposits
                <i className="right fas fa-angle-left" />
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/AllDepositsTable" className="nav-link ">
                  <i className="far fa-circle nav-icon" />
                  <p>Deposit Sheet</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/BalanceSheet" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Balance Sheet</p>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item menu treeview">
            <Link to="#" className="nav-link   ">
              <i className="nav-icon fas fa-money-bill-transfer" />
              <p>
                Investments
                <i className="right fas fa-angle-left" />
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/InvestmentSheet" className="nav-link ">
                  <i className="far fa-circle nav-icon" />
                  <p>Investment Sheet</p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/BalanceSheet" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Balance Sheet</p>
                </Link>
              </li> */}
            </ul>
          </li>


       
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

    </>
  )
}

export default Sidebar