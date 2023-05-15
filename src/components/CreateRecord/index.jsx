import { Link } from "react-router-dom";
import { Typography  } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header';
import { Button, Form, Input, Select } from 'antd';
import React from 'react';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreateRecord = ({pageTitle}) => {
  document.title = pageTitle;
  const { Title } = Typography;

  const formRef = React.useRef(null);
  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        formRef.current?.setFieldsValue({
          note: 'Hi, man!',
        });
        break;
      case 'female':
        formRef.current?.setFieldsValue({
          note: 'Hi, lady!',
        });
        break;
      case 'other':
        formRef.current?.setFieldsValue({
          note: 'Hi there!',
        });
        break;
      default:
        break;
    }
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    formRef.current?.resetFields();
  };
  const onFill = () => {
    formRef.current?.setFieldsValue({
      note: 'Hello world!',
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
      {...layout}
      ref={formRef}
      name="control-ref"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="note"
        label="Note"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
      </main>
    </>
  )
}

export default CreateRecord