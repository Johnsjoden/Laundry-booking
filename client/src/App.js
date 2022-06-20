import { AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import { createContext } from "react";
import { Route, Routes , Link} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"
import User from "./pages/User";
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
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <Button component={Link} to="/home" variant="contained" color="primary">
          Home
          </Button>
          <Button component={Link} to="/register" variant="contained" color="primary">
          Register
          </Button>
          <Button component={Link} to="/login" variant="contained" color="primary">
          Login
          </Button>
          <Button component={Link} to="/user" variant="contained" color="primary">
            Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
      <myContext.Provider value={{config, token}}>
      <Routes>
        <Route path="/register" element = { <Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
      </myContext.Provider>
    </div>
  );
}
export {myContext}
export default App;
