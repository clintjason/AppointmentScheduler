import { Typography  } from 'antd';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header';
import Search from '../Search';
import StatusStats from '../StatusStats';
import initState from '../../services/api.service';
import { useState, useEffect } from 'react';
import AppointmentsTable from '../AppointmentsTable';
import {notification} from 'antd';

const AppointmentsDashboard = ({pageTitle}) => {
  document.title = pageTitle;
  const { Title } = Typography;
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

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      try {
        let payload = await initState();
        console.log("The payload is: ",payload);
        if(payload) {
          dispatch({type: "INIT_STORE",payload: payload});
          openNotificationWithIcon('success');
        } else {
          throw new Error({error: 'network error'});
        }
      } catch (error) {
        console.error(error);
        openNotificationWithIcon('error');
      }
    })()
  },[])

  console.log(state)

  const countItems = (arr, item) => {
    return arr.filter((x) => x === item).length;
  };

  const status = state.map(stat => stat.appointment_status)
  console.log(status)

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
          <Search />
        </div>
        <div className='flex-wrapper center-all'>
          {displayStats}
        </div>
        <AppointmentsTable data={state} />
        <Link to="/create" className='gt-record' title="Create Appointment">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </main>
    </>
  )
}


export default AppointmentsDashboard;