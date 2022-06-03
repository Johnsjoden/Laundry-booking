import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { myContext } from '../App'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, Grid, Paper } from '@mui/material'
import { Container } from '@mui/system'
export default function Home() {
  let [date, setDate] = useState(new Date())
  const [result, setResult] = useState([])
  const [open, setOpen] = React.useState(false);
  const [laundryData, setLaundryData] = useState({})
  const {
    token
  } = useContext(myContext)
  date.setDate(date.getDate())
  date = date.toLocaleString('en-GB');
  date = date.split(",")[0]
  const handleOpen = (value) => {
    setOpen(true);
    setLaundryData(value)
    
  }
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const {
    config
  } = useContext(myContext)
  const fetchData = () => {
    fetch(`http://localhost:5000/laundry?date=${date}`, config)
    .then(res => res.json())
    .then(data => setResult(data.result))
  }
  useEffect(() => {
    fetchData()
  }, [])
  const bookLaundry = () => {
    fetch(`http://localhost:5000/laundry/${laundryData._id}`, {
            method: "POST",
            headers:{"Content-type": "Application/json", "Authorization": "Bearer " + token},
            body: JSON.stringify(laundryData)
        })
        .then(res => res.json())
        .then(data => {
          fetchData()
          handleClose()
        })
        // do a allert <Alert severity="success">This is a success alert — check it out!</Alert>
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {result.map((item, index) => {
        return <Grid item xs={1} sm={1.7} md={1.7} key={index}>
          <p>{item.date}</p>
        <span>{item.day}</span>
        <Button disabled={item.booked} onClick={e => handleOpen(item)} >book</Button>
      </Grid>
      
      })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {laundryData.date} {laundryData.day} {laundryData.timeEnd}-{laundryData.timeStarted}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={e => bookLaundry(laundryData.id)}>book</Button>
          </Typography>
        </Box>
      </Modal>
      </Grid>
      </Box>

  )
}
