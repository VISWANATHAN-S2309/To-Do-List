import Addtask from "./Addtask"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Addtask/>}></Route>
      </Routes>
     </Router>
    </>
  )
}

export default App;
