import axios from 'axios';

const initState = () => axios.get('http://localhost:3000/api/appointments/')
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
  })

export const getAppointmentById = (id) => axios.get(`http://localhost:3000/api/appointments/${id}`)
.then(response => {
  return response.data;
})
.catch(error => {
  console.log(error);
  return error
})

export default initState;