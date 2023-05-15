import { Typography  } from 'antd';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header';
import Search from '../Search';
import StatusStats from '../StatusStats';

const AppointmentsDashboard = ({pageTitle}) => {
  document.title = pageTitle;
  const { Title } = Typography;
  const stats = [
    {
      id: 1,
      type: 'Missed',
      status: '15',
    },
    {
      id: 2,
      type: 'Rescheduled',
      status: '21',
    },
    {
      id: 3,
      type: 'Passed',
      status: '05',
    }
  ]

  const displayStats = stats.map((stat) => <StatusStats status={stat.status} type={stat.type} key={stat.id} />)

  return (
    <>
      <Header />
      <main>
        <div className='flex-wrapper space-ard'>
          <Title level={2} className='appointment__title'>Appointments</Title>
          <Search />
        </div>
        <div className='flex-wrapper center-all'>
          {displayStats}
        </div>
        
        <Link to="/create" className='gt-record' title="Create Appointment">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </main>
    </>
  )
}


export default AppointmentsDashboard;