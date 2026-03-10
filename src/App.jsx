import React from 'react'
import LandingPage from './suby/components/pages/LandingPage'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import ProductMenu from './suby/components/ProductMenu'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element= {<LandingPage/>}/>
        <Route path='/products/:firmId/:firmName' element = {< ProductMenu/>}/>
      </Routes>
     
    </div>
  )
}

export default App