import React from 'react'
import { useState } from 'react'
export default function Button({}) {
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
        <button onClick={handleOnClick}>{button ? "show password": "hide password"}</button>
    </div>
  )
}
