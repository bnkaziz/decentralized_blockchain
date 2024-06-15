import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function InfoUser() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [access, setAccess] = useState(false);
  const [prices, setPrices] = useState([]);
  let domain;
  if (process.env.REACT_APP_ENV === "production") {
    domain = process.env.REACT_APP_DOMAIN;
  } else {
    domain = "http://localhost:9982";
  }

  const id = window.location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          axios
            .get(`${domain}/Users/${id}`, {
              withCredentials: true,
            })
            .then((data) => {
              setFname(data.data.firstname);
              setLname(data.data.lastname);
              setEmail(data.data.email);
              setBalance(data.data.balance);
              setAccess(data.data.is_admin);
              setNumber(data.data.phone_number);
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
    <div key={index}>
      <img src={`${price.image}`} alt=""></img>
      <h6>{price.name}: </h6>
      <p>
        {price.name === "Bitcoin" ? balance : 0} {price.symbol.toUpperCase()}
      </p>
    </div>
  ));

  return (
    <div className="infoUser">
      <div className="parent">
        <h1>Information</h1>
        <div className="main">
          <div className="part card">
            <div>
              <h6>First Name : </h6>
              <p>{fname}</p>
            </div>
            <div>
              <h6>Last Name : </h6>
              <p>{lname}</p>
            </div>
            <div>
              <h6>Email : </h6>
              <p>{email}</p>
            </div>
            <div>
              <h6>Phone : </h6>
              <p>{number}</p>
            </div>
            <div>
              <h6>Access : </h6>
              <p>{access ? "Admin" : "User"}</p>
            </div>
          </div>
          <div className="part card">{showPrices}</div>
          <div className="part card">
            <div className="edit">
              <Link to={`/dashboard/users/update/${id}`}>
                <i className="fa-solid fa-pen"></i>
                <p>Edit The Balance</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
