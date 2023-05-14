import { Typography,  } from 'antd';
import Header from '../Header';
import Search from '../Search';

const AppointmentsDashboard = () => {
  const { Title } = Typography;

  return (
    <>
      <Header />
      <main>
        <div className='flex-box'>
          <Title level={2} class='appointment__title'>Appointments</Title>
          <Search />
        </div>
      </main>
    </>
  )
}


export default AppointmentsDashboard;