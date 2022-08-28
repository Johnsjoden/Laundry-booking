import { AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import { createContext } from "react";
import { Route, Routes , Link, Navigate, useNavigate} from "react-router-dom";
import Home from "./pages/Book";
import Login from "./pages/Login";
import NewBook from "./pages/NewBook";
import Register from "./pages/Register"
import WeekPage from "./pages/WeekPage"
import User from "./pages/User";
const myContext = createContext()
function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem("key")
  const config = {
    headers: {
      "Authorization": "Bearer " + token
    }
  }
  const handleLogOut = () => {
    localStorage.clear()
    navigate("/login")
    window.location.reload()
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          {token ? <Button component={Link} to="/book" variant="contained" color="primary">
          Book
          </Button> : ""}
          {token ? "" :<Button component={Link} to="/register" variant="contained" color="primary">
          Register
          </Button>}
          {token ? "" : <Button component={Link} to="/login" variant="contained" color="primary">
          Login
          </Button>}
          {token ? <Button component={Link} to="/user" variant="contained" color="primary">Profile</Button> : ""}

          {token ? <Button onClick={handleLogOut} variant="contained" color="primary">Log out</Button> : ""}
        </Toolbar>
      </AppBar>
    </Box>
      <myContext.Provider value={{config, token}}>
      <Routes>
        <Route path="/register" element = { <Register />} />
        <Route path="/book" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/week" element={<NewBook />} />
        <Route path="/week/:id" element={<WeekPage />} />
      </Routes>
      </myContext.Provider>
    </div>
  );
}
export {myContext}
export default App;
