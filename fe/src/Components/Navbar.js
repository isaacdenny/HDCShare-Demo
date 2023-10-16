import React from "react";

const Navbar = () => {
  return (
    <div className="panel spread">
      <a className="logo" href="/">
        HDC
      </a>
      <div className="nav">
        <a href="/">View all Transfers</a>
        <a href="/upload">Send a Transfer</a>
        <a href="/login">Log out</a>
      </div>
      <button className="primary">Take a break</button>
    </div>
  );
};

export default Navbar;
