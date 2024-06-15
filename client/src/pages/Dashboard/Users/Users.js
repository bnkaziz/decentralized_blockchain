import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [runUseEffect, setRunUseEffect] = useState(0);
  let domain;
  if (process.env.REACT_APP_ENV === "production") {
    domain = process.env.REACT_APP_DOMAIN;
  } else {
    domain = "http://localhost:9982";
  }

  useEffect(() => {
    axios
      .get(`${domain}/users`, {
        withCredentials: true,
      })
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [runUseEffect]);

  async function deleteUser(id) {
    try {
      const res = await axios.delete(`${domain}/users/delete/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setRunUseEffect((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>{user.email}</td>
      <td>{user.phone_number}</td>
      <td>{user.is_admin ? "Admin" : "User"}</td>
      <td>
        <Link to={`info/${user.user_id}`}>
          <i
            className="fa-solid fa-circle-info"
            style={{
              color: "var(--primary)",
              fontSize: "20px",
              paddingRight: "4px",
              cursor: "pointer",
            }}
          ></i>
        </Link>
        <i
          className="fa-solid fa-trash"
          style={{ color: "#f84949", fontSize: "20px", cursor: "pointer" }}
          onClick={() => deleteUser(user.user_id)}
        ></i>
      </td>
    </tr>
  ));
  return (
    <div className="users" style={{ padding: "20px" }}>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>ِAccess</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{showUsers}</tbody>
        </table>
      </div>
    </div>
  );
}
