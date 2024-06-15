import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import About from '../../components/About'
import Services from '../../components/Services'
import Manage from '../../components/Manage'
import Prices from '../../components/Prices'

export default function Home() {
  return (
    <>
      <Header />
      <div className='home'>
        <div className='container'>
          <About />
          <Services />
          <Manage />
          <Prices />
        </div>
      </div>
      <Footer />
    </>
  )
}

