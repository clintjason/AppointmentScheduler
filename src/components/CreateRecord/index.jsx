import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header';
import { Typography, Divider, TimePicker, DatePicker, Button, Form, Input, Select, notification, InputNumber } from 'antd';
import { useState, useEffect } from 'react';

import PhoneInput from "antd-phone-input";

const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/;

const { Option } = Select;
const layout = {
  labelCol: {
    span: 18,
  },
  wrapperCol: {
    span: 18,
  },
  layout: 'inline'
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 14,
  },
};

const format = 'HH:mm';

const CreateRecord = ({pageTitle}) => {
  document.title = pageTitle;
  const { Title } = Typography;

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    const suc = "The Appointment was successfully created. Visit the Dashboard to view and edit it if need be.";
    const fail = "The appointment was not created successfully. Please try again later.";
    const desc = type.toLowerCase() == 'error' ? fail : suc;
    api[type]({
      message: `Appointment Registration  ${type}`,
      description: desc,
    });
  }

  const [form] = Form.useForm();
  const [id, setId] = useState(0);
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
    const list = values.appointment_date;
    console.log(list);
    console.log(list.$D);
    console.log(list.$M);
    console.log(list.$y);
    //  create a counter to count the numbers of times the form is submitted successfully
    // assign it that id to the field uniquecode. create a function that will compute the new vlaue each time
    setId(id + 1);
    const unique_code = "A" + id + list.$D + list.$M + list.$y;
    const data = {
      ...values,
      unique_code: unique_code,
    }
    // send to backend server
    axios.post('http://localhost:3000/api/appointments/new', data)
    .then(response => {
      console.log(response);
      openNotificationWithIcon('success');
    })
    .catch(error => {
      console.log(error);
      openNotificationWithIcon('error');
    })
  };
  const onReset = () => {
    form.current?.resetFields();
  };
  const onFill = () => {
    form.current?.setFieldsValue({
      name: 'Hello world!',
      gender: 'male',
    });
  };

  const onRequestDateChange = (value) => {
    form.current?.setFieldsValue({ request_date:value})
  }

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
            direction="vertical"
          >
            <Input.TextArea
              placeholder="Message ..."
              autoSize={{ minRows: 4, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            label="After appointment"
            name="after_appointment"
          >
            <Input.TextArea
              placeholder="Message ..."
              autoSize={{ minRows: 4, maxRows: 6 }}
            />
          </Form.Item>
          {/* <div className="column-wrapper">
            <label htmlFor="">After appointment</label>
            <textarea className="txt-area" rows={4} name="after-appointment" placeholder="Notes After appointment"></textarea>
          </div> */}
          <Form.Item className="submit-wrapper">
            <Button className="submit-color" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </main>
    </>
  )
}

export default CreateRecord;