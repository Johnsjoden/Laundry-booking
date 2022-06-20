import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../App'

export default function User () {
    const [result, setResult] = useState({})
    const {
        config
    } = useContext(myContext)
    const fetchData = () => {
        fetch("http://localhost:5000/user",config)
        .then(res => res.json())
        .then(data => setResult(data))
    }
    useEffect(() => {
        fetchData()
    }, [])
  return (
    <div>
        {console.log(result)}
    </div>
  )
}
