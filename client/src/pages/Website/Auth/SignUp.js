import { useState } from "react";
import Header from "../../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import Footer from "../../../components/Footer";

export default function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [accept, setAccept] = useState(false);
  const [err, setErr] = useState(false);
  const [numberErr, setNumberErr] = useState(false);
  let domain;
  if (process.env.REACT_APP_ENV === "production") {
    domain = process.env.REACT_APP_DOMAIN;
  } else {
    domain = "http://localhost:9982";
  }

  const nav = useNavigate();
  // Cookie
  const cookie = Cookie();

  async function submit(e) {
    e.preventDefault();
    if (password === passwordConfirmation) {
      try {
        await axios.post(
          `${domain}/auth/sign-up`,
          {
            firstname: fname,
            lastname: lname,
            phone_number: number,
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        );
        axios
          .get(`${domain}/Users/current`, {
            withCredentials: true,
          })
          .then((data) => {
            cookie.set("identification", data.data.user_id);
            cookie.set("access", data.data.is_admin);
            nav(`/profile/${data.data.user_id}`);
          });
      } catch (err) {
        setAccept(true);
        setErr(err.response.data);
      }
    } else {
      setNumberErr(true);
    }
  }

  return (
    <div>
      <Header />
      <div className="register">
        <div className="container">
          <div className="parent">
            <form onSubmit={submit} className="card">
              <h1>Register Now</h1>
              <label htmlFor="fname">First Name: </label>
              <input
                id="fname"
                type="text"
                placeholder="First Name..."
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
              />
              {fname.length < 2 && accept && (
                <p className="error">Name must be more than 2 char</p>
              )}
              <label htmlFor="lname">Last Name: </label>
              <input
                id="lname"
                type="text"
                placeholder="Last Name..."
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                required
              />
              {lname.length < 2 && accept && (
                <p className="error">Name must be more than 2 char</p>
              )}
              <label htmlFor="email">Email: </label>
              <input
                id="email"
                type="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="number">Phone Number: </label>
              <input
                id="number"
                type="tel"
                placeholder="Phone Number..."
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length < 8 && accept && (
                <p className="error">Password must be more than 8 char</p>
              )}
              <label htmlFor="passwordCo">Password Confirmation: </label>
              <input
                id="passwordCo"
                type="password"
                placeholder="Password Confirmation..."
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              {numberErr && <p className="error">Password does not match</p>}
              {accept && <p className="error">{err}</p>}
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
