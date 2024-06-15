import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className='about'>
      <div className='part'> 
        <h1>Centralised Crypto Wallet</h1>
        <h3>Connect with over 2 million users using our secure and decentralized network</h3>
        <div>
          <Link
            to="/register"
          >
            Register
          </Link>
          <Link
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
      <div className='part'>
        <img src={require('../photo/mobile1.png')} alt='' />
      </div>
    </div>
  )
}
