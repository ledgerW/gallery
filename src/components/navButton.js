import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'


function NavButton(props) {
  return (
    <div className={props.class}>
      <Link to={props.to}>
        <button><i class="fas fa-snowman"></i></button>
      </Link>
    </div>
  )
}

export default NavButton;