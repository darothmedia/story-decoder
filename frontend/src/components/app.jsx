import { Route, Routes } from "react-router-dom"
import Splash from "./splash";

const App = () => (
  <div className="bodywrap">
    <Routes>
      <Route path='/' element={<Splash />} />
    </Routes>
  </div>
)
export default App