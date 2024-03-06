import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <h1>This is the Header Component</h1>
      <Link to="/" >Home</Link>
      <Link to="/about" >About</Link>
    </div>
  )
}

export default Header
