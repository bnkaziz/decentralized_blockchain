import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

export default function RequireAuth() {
  const [acc, setAcc] = useState(true);
  let domain;
  if (process.env.REACT_APP_ENV === "production") {
    domain = process.env.REACT_APP_DOMAIN;
  } else {
    domain = "http://localhost:9982";
  }

  useEffect(() => {
    const Data = async () => {
      try {
        await axios
          .get(`${domain}/Users/current`, {
            withCredentials: true,
          })
          .then((data) => {
            setAcc(data.data.is_admin);
          });
      } catch (err) {
        console.log(err);
      }
    };
    Data();
  }, [acc]);
  const location = useLocation();
  return (
    <>
      {acc ? (
        <Outlet />
      ) : (
        <Navigate state={{ from: location }} replace to="/login" />
      )}
    </>
  );
}
