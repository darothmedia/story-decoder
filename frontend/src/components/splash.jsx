import React from "react";
import { Link } from "react-router-dom";

const Splash = props => {
  return(
    <div className="wrapper" id='splashwrapper'>
      <h1>Story Decoder</h1>
      <Link to='/create'><button>Create A Story</button></Link>
      <button>Enter Story Code</button>
    </div>
  )
}

export default Splash