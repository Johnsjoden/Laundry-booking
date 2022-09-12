const token = localStorage.getItem("key")
const config = {
    headers: {
      "Authorization": "Bearer " + token
    }
  }
const postData = async (url, payload) => {
        const response = await fetch(url, {
            method: "POST",
            headers:{"Content-type": "Application/json"},
            body: JSON.stringify(payload)
        }, )
        const result = await response.json()
        console.log(result)
        return result
}
const fetchBookingDates = async (url) => {
    const response = await fetch(url, config)
    const result = await response.json()
    return result
}
const bookLaundry = async (url, laundryData) => {
    const response = await fetch(`http://localhost:5000/laundry`, {
        method: "POST",
        headers:{"Content-type": "Application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify(laundryData)
    })
    const result = response.json()
    return result
}
export  {postData, fetchBookingDates, bookLaundry} 