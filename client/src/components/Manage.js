import React from 'react'

export default function Manage() {
  return (
    <div className='manage'>
      <div className='part'>
        <h1>Manage and secure your assets</h1>
        <h2>Manage, recover and secure your favorite assets. Withdraw directly to your bank account with ease</h2>
        <img className='img1' src={require(`../photo/laptop.png`)} alt='' />
      </div>
      <div className='part'>
        <img className='img2' src={require(`../photo/apps.png`)} alt='' />
        <h3>OUR ADVANTAGE</h3>
        <h2>We provide instant withdrawal option of all your assets to any bank account all over the world and we’re supported by kraken.com, coinbase.com, blockchain.com, ndax.com and more than hundreds of  public exchange wallet across the globe</h2>
      </div>
    </div>
  )
}
