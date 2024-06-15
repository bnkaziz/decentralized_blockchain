import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/Website/Auth/SignUp';
import Login from './pages/Website/Auth/Login';
import RequireAuth from './pages/Website/Auth/RequireAuth';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Dashboard/Users/Users';
import CreateUser from './pages/Dashboard/Users/CreateUser';
import Home from './pages/Website/Home';
import InfoUser from './pages/Dashboard/Users/InfoUser';
import Profile from './pages/Website/Profile';
import CreateAdmin from './pages/Dashboard/Users/CreateAdmin';
import UpdateUser from './pages/Dashboard/Users/UpdateUser';

export default function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      {/* protected Routes */}
        <Route path='/profile/:id' element={<Profile/>} />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} >
            <Route path="users" element={<Users />} />
            <Route path="user/createuser" element={<CreateUser />} />
            <Route path="user/createadmin" element={<CreateAdmin />} />
            <Route path="users/info/:id" element={<InfoUser />} />
            <Route path="users/update/:id" element={<UpdateUser />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
} 




