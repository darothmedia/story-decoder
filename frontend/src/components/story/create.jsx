import React from "react";
import { Link } from "react-router-dom";

const CreateStory = props => {
  return(
    <div className="wrapper" id="createwrapper">
      <form action="">
        <label>Start with a title for your story!
          <input type="text" />
        </label>
      </form>

      <Link to="/"><button>Home</button></Link>
    </div>
  )
}

export default CreateStory