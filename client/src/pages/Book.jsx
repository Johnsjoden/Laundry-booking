import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { myContext } from '../App'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, CircularProgress, Grid, Paper } from '@mui/material'
import { Container } from '@mui/system'
export default function Home() {
  let [date, setDate] = useState(new Date())
  const [result, setResult] = useState([])
  const [open, setOpen] = React.useState(false);
  const [laundryData, setLaundryData] = useState({})
  const [week, setWeek] = useState(0)
  const {
    token,
    config
  } = useContext(myContext)
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
  const fetchData = () => {
    fetch(`http://localhost:5000/laundry/create?week=${week}`, config)
    .then(res => res.json())
    .then(data => setResult(data.result))
  }
  useEffect(() => {
    fetchData()
  }, [week])
  const bookLaundry = () => {
    fetch(`http://localhost:5000/laundry`, {
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
  const nextWeek = () => {
    setWeek(week + 7)
  }
  const previousWeek = () => {
    setWeek(week - 7)
  }
  console.log(result)
  return (
    <Container>
      <Box sx={{ display: "flex"}}>
      <Button onClick={e => previousWeek()}>previous week</Button>
        <Button onClick={e => nextWeek()}>next week</Button>
      </Box>
      <Grid sx={{ display: "flex"}} >
        {result.map((item, index) => {
        return <Grid item xs={1} sm={1.7} md={1.7} key={index} sx={{ borderColor: "primary.main", p: "20px", m: "10px", boxShadow: "3"}}>
          <p>{item.date}</p>
        <span>{item.day} </span>
        {item.bookingTimes.map((item, index) => {
         return <div key={index}>
            <Button disabled={item.booked || item.notActive} onClick={e => handleOpen(item)} >{item.timeStarted}</Button>
          </div>
        })}
        <p>{item.timeStarted}-{item.timeEnd}</p>
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
            {laundryData.date} {laundryData.day} {laundryData.timeStarted}-{laundryData.timeEnd}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={e => bookLaundry(laundryData.id)}>book</Button>
          </Typography>
        </Box>
      </Modal>
      </Grid>

    </Container>
    
  )
}
