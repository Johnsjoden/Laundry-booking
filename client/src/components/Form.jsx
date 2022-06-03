import React from 'react'

export default function Form(props) {
    console.log(props)
    const handleOnSubmit = () => {
        const payload = {
            props
        }
        fetch("localhost:5000/user/login", {
            method: "POST",
        }, 
        {
            body: JSON.stringify(payload)
        })
    }
  return (
    <div>
        <form onSubmit={handleOnSubmit()}>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}
