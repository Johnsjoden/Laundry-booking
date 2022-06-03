import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { myContext } from '../App'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
export default function Home() {
  let [date, setDate] = useState(new Date())
  const [result, setResult] = useState([])
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({})
  const {
    token
  } = useContext(myContext)
  date.setDate(date.getDate())
  date = date.toLocaleString('en-GB');
  date = date.split(",")[0]
  const handleOpen = (value) => {
    setOpen(true);
    setData(value)
    
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
    console.log(data)
    fetch(`http://localhost:5000/laundry/${data._id}`, {
            method: "POST",
            headers:{"Content-type": "Application/json", "Authorization": "Bearer " + token},
            body: JSON.stringify(data)
        },)
        .then(res => res.json)
        .then(data => console.log(data))
  }
  return (
    <div>
      {result.map((item, index) => {
        return <div key={index}>
          <p>{item.date}</p>
          <span>{item.day}</span>
          <Button onClick={e => handleOpen(item)} >book</Button>
        </div>
      })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {data.date} {data.day} {data.timeEnd}-{data.timeStarted}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={e => bookLaundry(data.id)}>book</Button>
          </Typography>
        </Box>
      </Modal>
    </div>

  )
}
