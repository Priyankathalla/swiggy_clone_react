
import React from 'react'
import TopBar from '../TopBar'
import ItemDisplay from '../ItemDisplay'
import Chain from '../Chain'
import FirmCollection from '../FirmCollection'
import ProductMenu from '../ProductMenu'
const LandingPage = () => {
  return (
    <div>
        <TopBar />
        <div className="landingSection">
          <ItemDisplay />
          <Chain />
          <FirmCollection />
         
        </div>
        
    </div>
  )
}

export default LandingPage