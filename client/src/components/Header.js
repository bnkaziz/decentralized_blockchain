import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";

export default function Header() {
  const cookie = Cookie();
  const token = cookie.get("identification");
  const admin = cookie.get("access");
  let domain;
  if (process.env.REACT_APP_ENV === "production") {
    domain = process.env.REACT_APP_DOMAIN;
  } else {
    domain = "http://localhost:9982";
  }

  const hundleMenu = () => {
    if (document.querySelector(".menu ul").classList[2] === "df") {
      document.querySelector(".menu ul").classList.remove("df");
    } else {
      document.querySelector(".menu ul").classList.add("df");
    }
  };

  async function handleLogOut() {
    try {
      await axios.post(`${domain}/auth/logout`, null, {
        withCredentials: true,
      });
      cookie.remove("identification");
      cookie.remove("access");
      window.location.pathname = "/";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className="nav shadow">
      <div className="container">
        <div className="parent">
          <div className="nav-part">
            <Link to="/" className="logo">
              <div>
                <img src={require("../photo/logo.png")} alt="" />
              </div>
              <div>
                <h3>CRC</h3>
                <h4>Centralized refund system</h4>
              </div>
            </Link>
          </div>
          <div className="nav-part">
            {!token ? (
              <div className="menu">
                <i className="fa-solid fa-bars" onClick={hundleMenu}></i>
                <ul className="menuBar card">
                  <li>
                    <Link to="/" className="link-nav">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="link-nav">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="link-nav">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="menu">
                <i className="fa-solid fa-bars" onClick={hundleMenu}></i>
                <ul className="menuBar card">
                  {admin ? (
                    <li>
                      <Link to="/dashboard/users" className="link-nav">
                        Dashboard
                      </Link>
                    </li>
                  ) : (
                    <></>
                  )}
                  <li>
                    <Link to="/" className="link-nav">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={`/profile/${token}`} className="link-nav">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <div className="link-nav" onClick={handleLogOut}>
                      Log Out
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
