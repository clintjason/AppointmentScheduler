import axios from 'axios';

const initState = () => axios.get(import.meta.env.VITE_DEV_BASE_URL)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
  })

export const getAppointmentById = (id) => axios.get(import.meta.env.VITE_DEV_BASE_URL + id)
.then(response => {
  return response.data;
})
.catch(error => {
  console.log(error);
  return error
})

export default initState;