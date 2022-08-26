import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { myContext } from '../App'

export default function NewBook() {
    const [week, setWeek] = useState("")
    const [result, setResult] = useState([])
    const {
        config
    } = useContext(myContext)
    useEffect(() => { 
        fetch("http://localhost:5000/laundry/week", config)
        .then(res => res.json())
        .then(data => setResult(data))
        }
    , [])
    const handleOnClick = (weekNumber) => {
        setWeek(weekNumber)
        fetch(`http://localhost:5000/laundry/create?week=${week}`, config)
        .then(res => res.json())
        .then(data => setResult(result))
    }
    console.log(result)
  return (
    <div>{
        result.map((item, index) => {
            return <div key={index}>
                <p onClick={e => handleOnClick(item.weekNumber)}>{item.weekNumber}</p>
            </div>
        })
        }</div>
  )
}
