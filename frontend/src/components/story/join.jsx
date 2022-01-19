import React from "react";
import { Link } from "react-router-dom";

const JoinStory = props => {
  return(
    <div className="wrapper" id="joinwrapper">
      <form action="">
        <label>Enter a Story Code:
          <input type="text" />
        </label>
      </form>
    
      <Link to="/"><button>Home</button></Link>
    </div>
    
  )
}

export default JoinStory