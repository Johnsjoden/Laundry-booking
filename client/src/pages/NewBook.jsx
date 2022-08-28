import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { myContext } from '../App'

export default function NewBook() {
    const [week, setWeek] = useState("")
    const [result, setResult] = useState(null)
    const [results, setResults] = useState(null)
    const {
        config
    } = useContext(myContext)
    useEffect(() => { 
        fetch("http://localhost:5000/laundry/week", config)
        .then(res => res.json())
        .then(data => setResult(data))
        }
    , [])
    useEffect(() => {
        
    }, [])
    const handleOnClick = (weekNumber) => {
        setWeek(weekNumber)
        setResult(null)
        fetch(`http://localhost:5000/laundry/create?week=${week}`, config)
        .then(res => res.json())
        .then(data => setResults(data))
    }
    console.log(results)
  return (
    <div>{
        result? result.map((item, index) => {
            return <div key={index}>
                <Link to={`${item.weekNumber}`}>{item.weekNumber}</Link>
            </div>
        }) : <p></p> }
    </div>
  )
}
