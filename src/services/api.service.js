import axios from 'axios';

const initState = () => axios.get(import.meta.env.VITE_DEV_BASE_URL)
  .then(response => {
    const data = response.data.map(elmt => {
      return {...elmt, key: elmt.id}
    })
    return data;
  })
  .catch(error => {
    console.log(error);
  })

export const getAppointmentById = (id) => axios.get(import.meta.env.VITE_DEV_BASE_URL + id)
.then(response => {
  return {...response.data, key: response.data.id};
})
.catch(error => {
  console.log(error);
  return error
})

export default initState;