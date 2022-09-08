import { Box, Button, CircularProgress } from '@mui/material'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { Container } from '@mui/system'
export default function TestingPage() {
    const [sucess, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const timer = useRef()
    const handleOnClick = () => {
        setSuccess(false);
        setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
    useEffect(() => {

    })
  return (
      <Container>
         <Box sx={{ display: 'flex' }} alignItems={{ }}>
        <Button onClick={e => handleOnClick()}>Click</Button>
        {sucess? <CheckIcon /> : <p>not Sucess</p>}
        {loading? <CircularProgress /> : <p></p>}
        </Box> 
        <Box sx={{ display: 'flex' }}><p>asodm</p></Box>
      </Container>
    
  )
}
