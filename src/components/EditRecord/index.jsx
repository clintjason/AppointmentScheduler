import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Header from '../Header';
import { Typography, Divider, TimePicker, DatePicker, Button, Form, Input, Select, notification, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import { getAppointmentById } from '../../services/api.service';

const { Option } = Select;

const format = 'HH:mm';

const EditRecord = ({pageTitle}) => {
  document.title = pageTitle;
  const location = useLocation();
  const { id: idParams } = useParams();
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [id, setId] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const state = useSelector((state) => state);
  const [appointment, setAppointment] = useState({});

  console.log("The state is: ", state);

  const openNotificationWithIcon = (type) => {
    const suc = "The Appointment was successfully Updated. Visit the Dashboard for more updates.";
    const fail = "The appointment was not updated successfully. Please try again later.";
    const desc = type.toLowerCase() == 'error' ? fail : suc;
    api[type]({
      message: `${type.toUpperCase()} Editing Appointment`,
      description: desc,
    });
  }
  const openNotifWithIcon = (type) => {
    const suc = "The Appointment Data was successfully fetched. Inspect the form and update the data where needed.";
    const fail = "The Appointment Data was not successfully fetched. Please try again later.";
    const desc = type.toLowerCase() == 'error' ? fail : suc;
    api[type]({
      message: `${type.toUpperCase()} Fetching Appointment`,
      description: desc,
    });
  }
  
  useEffect(() => {
    (async() => {
      try {
        const result = await getAppointmentById(idParams);
        setAppointment(result)
        if(result) {
          openNotifWithIcon('success');
        } else {
          throw new Error({error: 'network error'});
        }
      } catch (error) {
        console.error(error);
        openNotifWithIcon('error');
      }
    })()
  }, [location]);


  console.log(appointment);
  
  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.current?.setFieldsValue({
          name: 'Hi, man!',
        });
        break;
      case 'female':
        form.current?.setFieldsValue({
          name: 'Hi, lady!',
        });
        break;
      default:
        break;
    }
  };
  /* const handlePhoneChange = value => {
   
  }; */

  const onFirstTimeChange = (value) => {}
  const onAppointmentStatusChange = (value) => {}

  const onFinish = (values) => {
    console.log(values);
    axios.put(`http://localhost:3000/api/appointments//edit/${idParams}`, values)
    .then(response => {
      console.log(response);
      openNotificationWithIcon('success');
    })
    .catch(error => {
      console.log(error);
      openNotificationWithIcon('error');
    })
  };

  const onRequestDateChange = (value) => {
    form.current?.setFieldsValue({ request_date:value})
  }

  const preLoadingValues = [
    
    {
      "name": ["unique_code"],
      "value": appointment.unique_code
    },
    {
      "name": ["name"],
      "value": appointment.name
    },
    {
      "name": ["sex"],
      "value": appointment.sex
    },
    {
      "name": ["age"],
      "value": appointment.age
    },
    {
      "name": ["phone"],
      "value": appointment.phone
    },
    {
      "name": ["email"],
      "value": appointment.email
    },
    {
      "name": ["appointment_date"],
      "value": moment(appointment.appointment_date, "YYYY-MM-DD")
    },
    {
      "name": ["first_time"],
      "value": appointment.first_time
    },
    {
      "name": ["request_date"],
      "value": moment(appointment.request_date, "YYYY-MM-DD")
    },
    {
      "name": ["appointment_status"],
      "value": appointment.appointment_status
    },
    {
      "name": ["appointment_time"],
      "value": moment(appointment.appointment_time)
    },
    {
      "name": ["address"],
      "value": appointment.address
    },
    {
      "name": ["city"],
      "value": appointment.city
    },
    {
      "name": ["before_appointment"],
      "value": appointment.before_appointment
    },
    {
      "name": ["after_appointment"],
      "value": appointment.after_appointment
    },
    
    
  ]

  return (
    <>
      <Header borderRadius="12px 0px" maxWidth="80%" width="auto" />
      {contextHolder}
      <main>
        <div className='flex-wrapper center-all'>
          <Link className="gtl" to="/"><FontAwesomeIcon icon={faArrowLeft} /></Link>
          <Title level={3} className='appointment__title'>NEW RECORD</Title>
        </div>
        <Form
          form={form}
          fields={preLoadingValues}
          name="control-ref"
          onFinish={onFinish}
          className="flex-wrapper"
        >
          <Title level={4} className='form__heading'>General Information</Title>
          <Form.Item
            name="unique_code"
            label="Unique Code"
            className="column-wrapper"
          >
            <Input disabled={true}  />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            className="column-wrapper"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter Name"/>
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            className="column-wrapper"
            rules={[
              {
                required: true,
                type:"number",
              },
            ]}
          >
            <InputNumber min={6} placeholder="Enter Age"/>
          </Form.Item>
          <Form.Item
            name="sex"
            label="Sex"
            className="column-wrapper"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a Gender"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            className="column-wrapper"
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const reg = /^-?\d*(\.\d*)?$/;
                  if (reg.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Please enter a valid phone number'));
                },
              }),
            ]}
          >
            <Input placeholder="Enter Phone N°"/>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            className="column-wrapper"
            rules={[
              {
                required: true,
                type: 'email',
              },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>
          <Divider className="form__divider" />
          <Title level={4} className='form__heading'>Appointment Information</Title>
          <Form.Item 
            label="Appointment date"
            name="appointment_date"
            className="column-wrapper"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="first_time"
            label="First time"
            className="column-wrapper"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="First time"
              onChange={onFirstTimeChange}
              allowClear
            >
              <Option value="no">No</Option>
              <Option value="yes">Yes</Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Request date"
            name="request_date"
            className="column-wrapper"
          >
            <DatePicker onChange={onRequestDateChange}/>
          </Form.Item>
          <Form.Item
            name="appointment_status"
            label="Appointment Status"
            className="column-wrapper"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Appointment Status"
              onChange={onAppointmentStatusChange}
              allowClear
            >
              <Option value="pending">Pending</Option>
              <Option value="missed">Missed</Option>
              <Option value="passed">Passed</Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Appointment time"
            className="column-wrapper"
            name="appointment_time"
          >
            <TimePicker format={format} />
          </Form.Item>
          <Title level={4} className='form__heading'>Address Information</Title>
          <Form.Item
            name="address"
            label="Address 1"
            className="column-wrapper"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter Valid Address"/>
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            className="column-wrapper"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter City"/>
          </Form.Item>
          <Title level={4} className='form__heading'>Notes</Title>
          <Form.Item
            label="Before appointment"
            name="before_appointment"
            className="column-wrapper_txt"
          >
            <Input.TextArea
              placeholder="Message ..."
              autoSize={{ minRows: 4, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            label="After appointment"
            name="after_appointment"
            className="column-wrapper_txt"
          >
            <Input.TextArea
              placeholder="Message ..."
              autoSize={{ minRows: 4, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item className="submit-wrapper">
            <Button className="submit-color" htmlType="submit">
              Edit
            </Button>
          </Form.Item>
        </Form>
      </main>
    </>
  )
}

export default EditRecord;