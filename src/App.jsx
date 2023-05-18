import { Routes, Route } from 'react-router-dom'
import AppointmentsDashboard from './components/AppointmentsDashboard';
import CreateRecord from './components/CreateRecord';
import EditRecord from './components/EditRecord';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route index element={<AppointmentsDashboard pageTitle="DrNG - Home" />} />
      <Route path='/' element={<AppointmentsDashboard pageTitle="DrNG - Home" />} />
      <Route path='/create' element={<CreateRecord pageTitle="DrNG - Create Appointment" />} />
      <Route path='/:id/edit' element={<EditRecord pageTitle="DrNG - Edit Appointment" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
