import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import MyInput from '../components/MyInput'

export default function Register() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(null)
    const [usernameError, setUsernameError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const registerUser = (e) => {
        e.preventDefault()
        const payload = {
            username,
            password
        }
        fetch("http://localhost:5000/user/register", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            if(data.register === "failed"){
                setPasswordError(data.username)
                setUsernameError(data.password)
            }else {
                navigate("/login")
            }
        })
    }
  return (
      <div>
        <h1>Register account</h1>
        <form onSubmit={registerUser}>
            <MyInput value={username} setValue={setUsername} placeholder={"username"} />
            <ErrorMessage message={usernameError}/>
            <MyInput value={password} setValue={setPassword} placeholder={"password"} />
            <ErrorMessage message={passwordError} />
            <Button type="submit">Submit</Button>
        </form>
        <Button component={Link} to="/login" color="primary">Already have a account? Login</Button>
      </div>
      
  )
}
