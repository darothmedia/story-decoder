import { Route, Routes } from "react-router-dom"
import Splash from "./splash";
import CreateStory from "./story/create";
import JoinStory from "./story/join";

const App = () => (
  <div className="bodywrap">
    <Routes>
      <Route path='/' element={<Splash />} />
      <Route path='/create' element={<CreateStory />} />
    </Routes>
  </div>
)
export default App