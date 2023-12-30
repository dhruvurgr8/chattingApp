import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="#">
          VaartaLaap
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ml-auto mr-2 pd-5">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only"></span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Text Chat
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                VideoChat
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                About Us
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
