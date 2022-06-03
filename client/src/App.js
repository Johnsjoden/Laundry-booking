import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
const myContext = createContext()
function App() {
  const token = localStorage.getItem("key")
  const config = {
    headers: {
      "Authorization": "Bearer " + token
    }
  }
  return (
    <div>
      <myContext.Provider value={{config, token}}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </myContext.Provider>
    </div>
  );
}
export {myContext}
export default App;
