import React from 'react'
import { useState } from 'react'
import { Button } from '@mui/material'
export default function MyButton({}) {
    const [button, setButton] = useState(true)
    const handleOnClick = () => {
        if(button == true){
            setButton(false)
        }else{
            setButton(true)
        }
    }
  return (
    <div>
        <Button onClick={handleOnClick}>{button ? "show password": "hide password"}</Button>
    </div>
  )
}
