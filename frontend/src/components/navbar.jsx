import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  return(
    <div>
      <Link to="/"><button>Home</button></Link>
    </div>
  )
}

export default NavBar