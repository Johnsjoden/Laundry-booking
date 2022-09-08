import { Alert } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function ErrorMessage(props) {
    const [error, setError] = useState(null)
    useEffect(() => {
        setError(props.message)
    }, [props.message])
  return (
    <div>
        {error? <Alert severity='error'>{error}</Alert>: "" }
    </div>
  )
}
