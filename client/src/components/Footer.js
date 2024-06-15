import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";

export default function Footer() {
  const cookie = Cookie();
  const token = cookie.get("identification");
  const admin = cookie.get("access");
  let domain;
  if (process.env.REACT_APP_ENV === "production") {
    domain = process.env.REACT_APP_DOMAIN;
  } else {
    domain = "http://localhost:9982";
  }

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
    <div className="footer">
      <div className="container">
        <div className="parent">
          <div className="main">
            <div className="part">
              <h1>Quick Links</h1>
              {!token ? (
                <>
                  <Link to="/" className="link-footer">
                    Home
                  </Link>
                  <Link to="/login" className="link-footer">
                    Login
                  </Link>
                  <Link to="/register" className="link-footer">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  {admin ? (
                    <Link to="/dashboard/users" className="link-footer">
                      Dashboard
                    </Link>
                  ) : (
                    <></>
                  )}

                  <Link to="/" className="link-footer">
                    Home
                  </Link>
                  <Link to={`/profile/${token}`} className="link-footer">
                    Profile
                  </Link>
                  <div className="link-footer" onClick={handleLogOut}>
                    Log Out
                  </div>
                </>
              )}
            </div>
            <div className="part">
              <h1>Contact Us</h1>
              <Link
                className="link-footer"
                to="https://api.whatsapp.com/send/?phone=447426805741&text&type=phone_number&app_absent=0"
                target="_blank"
              >
                <i className="fa-brands fa-whatsapp"></i>
                <span style={{ marginLeft: "5px" }}>Whatsapp</span>
              </Link>
              <Link
                className="link-footer"
                to="mailto:Refund@supportbc-canada.com"
              >
                <i className="fa-regular fa-envelope"></i>
                <span style={{ marginLeft: "5px" }}>
                  Email : Refund@supportbc-canada.com
                </span>
              </Link>
              <Link className="link-footer" to="tel:+447426805741">
                <i className="fa-solid fa-phone"></i>
                <span style={{ marginLeft: "5px" }}>
                  Phone Number : +447426805741
                </span>
              </Link>
            </div>
          </div>
          <div>
            <h5>
              Copyright ©2024 CRC (Centralized Refund System). All rights
              reserved
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
