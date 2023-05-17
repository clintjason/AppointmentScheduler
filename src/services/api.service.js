import axios from 'axios';

const initState = () => axios.get('http://localhost:3000/api/appointments/')
  .then(response => {
    console.log("initial state setup")
    console.log(response.data);
    return response.data;
  })
  .catch(error => {
    console.log(error);
  })

export default initState;