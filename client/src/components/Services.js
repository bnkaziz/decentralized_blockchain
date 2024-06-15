import React from 'react'

export default function Services() {
  return (
    <div className='services'>
      <div className='part'>
        <i className="fa-solid fa-user-lock" style={{margin: "0"}} />
        <h2>Secured</h2>
        <h3>Your private keys are encrypted and never leave your device. You fully control your funds</h3>
      </div>
      <div className='part'>
        <i className="fa-regular fa-share-from-square" />
        <h2>Cashback</h2>
        <h3>We can help you recover lost funds and crypto assets and withdraw directly to your bank account</h3>
      </div>
      <div className='part'>
        <i className="fa-solid fa-comment-dots" style={{margin: "0"}} />
        <h2>24/7 Live Support</h2>
        <h3>Our support is always ready to help you. Get quick and efficient response via live chat or email</h3>
      </div>
    </div>
  )
}
