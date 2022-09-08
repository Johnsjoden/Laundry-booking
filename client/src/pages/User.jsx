import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../App'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
export default function User () {
    const [result, setResult] = useState(null)
    const [open, setOpen] = useState(false)
    const [laundryData, setLaundryData] = useState({})
    const {
        config,
        token
    } = useContext(myContext)
    const fetchData = () => {
        const token = localStorage.getItem("key")
        fetch("http://localhost:5000/user",{
            headers: {
              "Authorization": "Bearer " + token
            }
          })
        .then(res => res.json())
        .then(data => setResult(data))
    }

    useEffect(() => {
        fetchData()
    }, [])
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
      const unBookLaundry = (id) => {
        fetch(`http://localhost:5000/laundry/${id}`, {
            method: "DELETE",
            headers: {"Authorization": "Bearer " + token}
        })
        .then(res => {
            fetchData()
            handleClose()
        })
      }
  return (
    <div>
        <p>Profile information</p>
        {result ? <p>username: {result.username}</p> : <p>loading</p>}
        <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {result ? result.laundries.map((item, index) => {
      return <Grid item xs={1.5} sm={2} md={2} key={index}>
        <p>{item.date}</p>
      <span>{item.day}</span>
      <Button disabled={item.notActive} onClick={e => handleOpen(item)} >unbook</Button>
    </Grid>
    
    }) : <p>loading</p> }
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
          <Button onClick={e => unBookLaundry(laundryData._id)}>unbook</Button>
        </Typography>
      </Box>
    </Modal>
    </Grid>
    </Box>
        {result ? result.laundries.map((item, index) => {
            return <div key={index}>
                </div>
        }) : <p>fetching..</p>}
    </div>
  )
}
