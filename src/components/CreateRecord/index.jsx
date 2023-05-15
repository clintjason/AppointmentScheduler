import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header';
import { Typography, Divider, TimePicker, DatePicker, Button, Form, Input, Select } from 'antd';
import React from 'react';

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

  const [form] = Form.useForm();
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

  return (
    <>
      <Header borderRadius="12px 0px" maxWidth="80%" width="auto" />
      <main>
        <div className='flex-wrapper center-all'>
          <Link className="gtl" to="/"><FontAwesomeIcon icon={faArrowLeft} /></Link>
          <Title level={3} className='appointment__title'>NEW RECORD</Title>
        </div>
        <Form
          ref={form}
          name="control-ref"
          onFinish={onFinish}
          className="flex-wrapper"
          
        >
          <Title level={4} className='form__heading'>General Information</Title>
          <Form.Item
            name="UniqueCode"
            label="Unique Code"
            className="column-wrapper"
          >
            <Input disabled={true} />
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
            className="column-wrapper"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="first-time"
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
            className="column-wrapper"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="appointment-status"
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
          >
            <TimePicker defaultValue={dayjs('12:08', format)} format={format} />
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
          <div className="column-wrapper">
            <label htmlFor="">Before appointment</label>
            <textarea className="txt-area" rows={4} name="before-appointment" placeholder="Notes Before appointment"></textarea>
          </div>
          <div className="column-wrapper">
            <label htmlFor="">After appointment</label>
            <textarea className="txt-area" rows={4} name="after-appointment" placeholder="Notes After appointment"></textarea>
          </div>
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

export default CreateRecord