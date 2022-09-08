import {React, useState} from 'react'
import MyInput from '../components/MyInput'
import { Alert, Button } from '@mui/material'
import {Link, useNavigate}  from "react-router-dom"
export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [button, setButton] = useState(true)
    const [type, setType] = useState("password")
    const [error, setError] = useState(null)
    const handleOnClick = () => {
        if(button == true){
            setButton(false)
            setType("text")
        }else{
            setButton(true)
            setType("password")
        }
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        const payload = {
            username,
            password
        }
        fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers:{"Content-type": "Application/json"},
            body: JSON.stringify(payload)
        }, )
        .then(res => res.json())
        .then(data => {
            if(data.user.token === "no user found"){
                setError(data.user.token)
            }else {
                const token = data.user.token
                localStorage.setItem("key", token)
                navigate("/book")
                window.location.reload()
            }
            
        })
    }
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleOnSubmit}>
            <MyInput value={username} setValue={setUsername} placeholder={"username"} type={"text"} />
            <MyInput value={password} setValue={setPassword} placeholder={"password"} type={type}/>
            <Button onClick={handleOnClick}>{button ? "show password": "hide password"}</Button>
            <Button type="submit">Login</Button>
        </form>
        {error? <Alert severity='error'>{error}</Alert>: "" }
        <Button component={Link} to="/register" color="primary">Register Account</Button>
     </div>
  )
}
