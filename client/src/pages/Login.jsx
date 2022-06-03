import {React, useState} from 'react'
import Button from '../components/Button'
import Input from '../components/Input'

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
            <Input value={username} setValue={setUsername} placeholder={"username"} type={"text"} />
            <Input value={password} setValue={setPassword} placeholder={"password"} type={"password"}/>
            <Button /> 
            <button type="submit">submit</button>  
        </form>
        
     </div>
  )
}
