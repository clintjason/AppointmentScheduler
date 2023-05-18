import { Typography, notification, Input  } from 'antd';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header';
import StatusStats from '../StatusStats';
import initState from '../../services/api.service';
import { useState, useEffect } from 'react';
import AppointmentsTable from '../AppointmentsTable';
import { searchData } from '../../services/api.service';


const AppointmentsDashboard = ({pageTitle}) => {
  document.title = pageTitle;
  const { Title } = Typography;
  const { Search } = Input;
  const [searchedData,setSearchedData] = useState('')
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    const suc = "The Appointments list was successfully loaded. Visit the list to view, edit, and delete it if need be.";
    const fail = "The Appointments list was not loaded successfully. Please try again later.";
    const desc = type.toLowerCase() == 'error' ? fail : suc;
    api[type]({
      message: `Appointments Data Loading  ${type}`,
      description: desc,
    });
  }

  const openNotifWithIcon = (type) => {
    const suc = "The Search Data was successfully fetched. Inspect the form to view your data.";
    const fail = "The Search Data was not successfully fetched. Please try again later.";
    const desc = type.toLowerCase() == 'error' ? fail : suc;
    api[type]({
      message: `${type.toUpperCase()} Fetching Appointment`,
      description: desc,
    });
  }

  const onSearch = (value) => {
    searchData(value).then(data => {
      setSearchedData(data);
    })
    .catch(error => {
      console.error(error);
      openNotifWithIcon('error');
    })
  };

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      try {
        let payload = await initState();
        if(payload) {
          dispatch({type: "INIT_STORE",payload: payload});
          openNotificationWithIcon('success');
        } else {
          throw new Error({error: 'network error'});
        }
      } catch (error) {
        openNotificationWithIcon('error');
      }
    })()
  },[])

  const countItems = (arr, item) => {
    return arr.filter((x) => x === item).length;
  };

  const status = state.map(stat => stat.appointment_status)

  const stats = [
    {
      id: 1,
      type: 'Missed',
      status: countItems(status,'missed'),
    },
    {
      id: 2,
      type: 'Rescheduled',
      status: countItems(status,'pending'),
    },
    {
      id: 3,
      type: 'Passed',
      status: countItems(status,'passed'),
    }
  ]

  const displayStats = stats.map((stat) => <StatusStats status={stat.status} type={stat.type} key={stat.id} />)

  return (
    <>
      <Header />
      <main>
      {contextHolder}
        <div className='flex-wrapper space-ard'>
          <Title level={2} className='appointment__title'>Appointments</Title>
          <Search
            placeholder="search"
            onSearch={onSearch}
            className='search-field'
          />
        </div>
        <div className='flex-wrapper center-all'>
          {displayStats}
        </div>
        <AppointmentsTable data={searchedData? searchedData: state} />
        <Link to="/create" className='gt-record' title="Create Appointment">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </main>
    </>
  )
}


export default AppointmentsDashboard;