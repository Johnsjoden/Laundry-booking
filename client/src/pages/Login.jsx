import {React, useState} from 'react'
import MyButton from '../components/MyButton'
import MyInput from '../components/MyInput'
import { Button } from '@mui/material'

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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
            const token = data.user.token
            localStorage.setItem("key", token)
        })
    }
  return (
    <div>
        <form onSubmit={handleOnSubmit}>
            <MyInput value={username} setValue={setUsername} placeholder={"username"} type={"text"} />
            <MyInput value={password} setValue={setPassword} placeholder={"password"} type={"password"}/>
            <MyButton /> 
            <Button type="submit">Submit</Button>
        </form>
        
     </div>
  )
}
