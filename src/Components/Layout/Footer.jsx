import React from "react";

const Footer = () => {
  return (
    <>
      <footer
        className="main-footer"
        style={{
          background: "#2d324e",
          border: "none",
          color: "#d0d2d6",
          marginTop: "7rem",
        }}
      >
        {/* To the right */}
        <div className="float-right d-none d-sm-inline">
          {/* Anything you want */}
        </div>
        <strong>
          Copyright © 2022-onwards &nbsp;
          <a href="#w">Alphanites</a>. &nbsp;
        </strong>{" "}
        All rights reserved.
        {/* Default to the left */}
      </footer>
    </>
  );
};

export default Footer;
