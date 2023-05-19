import axios from 'axios';

export const initState = () => axios.get(import.meta.env.VITE_DEV_BASE_URL)
  .then(response => {
    const data = response.data.map(elmt => {
      return {...elmt, key: elmt.id}
    })
    return data;
  })
  .catch(error => {
    return error;
  })

export const getAppointmentById = (id) => axios.get(import.meta.env.VITE_DEV_BASE_URL + id)
.then(response => {
  return {...response.data, key: response.data.id};
})
.catch(error => {
  return error;
})

export const deleteAppointmentById = (id) => axios.delete(import.meta.env.VITE_DEV_BASE_URL + `delete/` + id)
.then(response => {
  return response.data;
})
.catch(error => {
  return error;
})


export const searchData = (query) => 
  axios.get(import.meta.env.VITE_DEV_BASE_URL + `search/`,{
    params: {
      name: query,
      address: query,
      phone: query,
      age: query,
      sex: query,
    }
  })
  .then((response) => {
    const data = response.data.map(elmt => {
      return {...elmt, key: elmt.id}
    })
    return data;
  })
  .catch((error) => {
    return error;
  })

export default initState;