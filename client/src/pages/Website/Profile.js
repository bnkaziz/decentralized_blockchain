import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import Cookie from "cookie-universal";

export default function Profile() {
  const textToCopy = "1NuMSKzfcK6CgPP5CjUNYFimt1P83PX4HF";
  const [copied, setCopied] = useState(false);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [prices, setPrices] = useState([]);
  const [balance, setBalance] = useState(0);
  let domain;
  if (process.env.REACT_APP_ENV === "production") {
    domain = process.env.REACT_APP_DOMAIN;
  } else {
    domain = "http://localhost:9982";
  }

  const cookie = Cookie();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          axios
            .get(`${domain}/Users/current`, {
              withCredentials: true,
            })
            .then((data) => {
              setFname(data.data.firstname);
              setLname(data.data.lastname);
              setBalance(data.data.balance);
              let userId = data.data.user_id;
              if (window.location.pathname.split("/").slice(-1)[0] !== userId) {
                cookie.remove("identification");
                cookie.remove("access");
                window.location.pathname = "/login";
              }
            }),
          axios
            .get(
              "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
            )
            .then((data) => setPrices(data.data)),
        ]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const pricesnew = prices.slice(0, 10);
  const showPrices = pricesnew.map((price, index) => (
    <div className="item" key={index}>
      <div className="left">
        <img src={`${price.image}`} alt="" />
        <div className="title">
          <h6>{price.name}</h6>
          <p>
            $ {price.current_price.toLocaleString()}{" "}
            {price.price_change_percentage_24h >= 0 && (
              <span style={{ marginLeft: "15px", color: "green" }}>
                +{price.price_change_percentage_24h.toLocaleString()} %
              </span>
            )}
            {price.price_change_percentage_24h < 0 && (
              <span style={{ marginLeft: "15px", color: "red" }}>
                {price.price_change_percentage_24h.toLocaleString()} %
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="right">
        <h6>
          {price.name === "Bitcoin" ? balance : 0} {price.symbol.toUpperCase()}
        </h6>
        <p>
          ${" "}
          {(price.name === "Bitcoin"
            ? balance * price.current_price
            : 0
          ).toLocaleString()}
        </p>
      </div>
    </div>
  ));

  const clickdeposit = () => {
    document.getElementsByClassName("profile")[0].style.filter = "blur(5px)";
    document.getElementsByClassName("windowDeposit")[0].style.display = "block";
  };
  const deldeposit = () => {
    document.getElementsByClassName("profile")[0].style.filter = "blur(0px)";
    document.getElementsByClassName("windowDeposit")[0].style.display = "none";
    setCopied(false);
  };
  const handleCopyClick = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
  };
  const clickwith = () => {
    document.getElementsByClassName("profile")[0].style.filter = "blur(5px)";
    document.getElementsByClassName("windowWith")[0].style.display = "block";
  };
  const delwith = () => {
    document.getElementsByClassName("profile")[0].style.filter = "blur(0px)";
    document.getElementsByClassName("windowWith")[0].style.display = "none";
  };

  return (
    <>
      <div className="profile">
        <Header />
        <div className="container">
          <div className="father">
            <div className="information">
              <h1>
                {fname} {lname}
              </h1>
            </div>
            <div className="icon">
              <div onClick={clickdeposit}>
                <i
                  className="fa-solid fa-down-long shadow"
                  style={{ rotate: "180deg" }}
                ></i>
                <p>Deposit</p>
              </div>
              <div onClick={clickwith}>
                <i className="fa-solid fa-down-long shadow"></i>
                <p>Withdraw</p>
              </div>
            </div>
            <div className="wallet card">
              <h3>Coins:</h3>
              <div>{showPrices}</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <div className="windowDeposit card">
        <div className="part">
          <h4>Wallet Address : </h4>
          <i className="fa-solid fa-xmark" onClick={deldeposit}></i>
        </div>
        <div className="part">
          <input type="text" value={textToCopy} readOnly />
          <button onClick={handleCopyClick}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div className="windowWith card">
        <div className="part">
          <i className="fa-solid fa-xmark" onClick={delwith}></i>
        </div>
        <div className="part">
          <p>
            The withdrawal process is not available at the moment, please
            contact the customer support.
          </p>
        </div>
      </div>
    </>
  );
}
