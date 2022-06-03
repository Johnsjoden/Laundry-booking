import React from 'react'
import { useEffect } from 'react'

export default function FetchData({URL}) {
    const fetchData = (URL) => {
        console.log(URL)
        fetch(URL)
    }
    useEffect(() => {
        fetchData(URL)
    }, [])
  return (
    <div>FetchData</div>
  )
}
