import { Route, Routes } from "react-router-dom"
import Splash from "./splash";
import CreateStory from "./story/create";
import JoinStory from "./story/join";
import NavBar from "./navbar";

const App = () => (
  <div className="outerwrap">
    <NavBar />
  <div className="bodywrap">
    <Routes>
      <Route path='/' element={<Splash />} />
      <Route path='/create' element={<CreateStory />} />
      <Route path='/join' element={<JoinStory />} />
    </Routes>
  </div>
  </div>
)
export default App