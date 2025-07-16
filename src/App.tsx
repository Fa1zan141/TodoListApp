import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import MyTask from "./components/MyTask";

function App () {
  return (
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/myTask" element={<MyTask/>}></Route>
      </Routes>
  )
};

export default App;
