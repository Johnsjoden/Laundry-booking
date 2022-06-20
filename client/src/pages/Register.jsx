import { Button } from '@mui/material'
import React, { useState } from 'react'
import MyInput from '../components/MyInput'

export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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
        .then(data => console.log(data))
    }
  return (
      <div>
        <form onSubmit={registerUser}>
            <MyInput value={username} setValue={setUsername} placeholder={"username"} /> 
            <MyInput value={password} setValue={setPassword} placeholder={"password"} />
            <Button type="submit" variant='contained'>Submit</Button>
        </form>
      </div>
      
  )
}
