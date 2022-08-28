import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { myContext } from '../App'

export default function WeekPage() {
    const [result, setResult] = useState(null)
    const [error, setError] = useState("")
    const param = useParams().id
    const {
        config
    } = useContext(myContext)
    useEffect(() => {
        fetchData()
    }, [param])
    const fetchData = () => {
        fetch(`http://localhost:5000/laundry/create?week=${param}`, config)
        .then(res => res.json())
        .then(data => setResult(data.result))
    }
  return (
    <div>
        {result? result.map((item, index) => {
            return <div key={index}>
                <p>{item.date}</p>
            </div>
        }) : <p>he</p> }
    </div>
  )
}
