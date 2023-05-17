import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from "react-router-dom";


const AppointmentsTable = ({data}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };


  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  // name, age, unique code, gender, Status, phone, address, appointment date, date of record entry.
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Code',
      dataIndex: 'unique_code',
      key: 'unique_code',
      //width: '30%',
      sorter: (a, b) => a.unique_code.length - b.unique_code.length,
      sortOrder: sortedInfo.columnKey === 'unique_code' ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
      ...getColumnSearchProps('age'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
      sorter: (a, b) => a.phone - b.phone,
      sortOrder: sortedInfo.columnKey === 'phone' ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Gender',
      dataIndex: 'sex',
      key: 'sex',
      width: '10%',
      filters: [
        {
          text: 'Male',
          value: 'male',
        },
        {
          text: 'Female',
          value: 'female',
        },
      ],
      filteredValue: filteredInfo.sex || null,
      onFilter: (value, record) => record.sex == value,
      sorter: (a, b) => a.sex.length - b.sex.length,
      sortOrder: sortedInfo.columnKey === 'sex' ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      dataIndex: 'appointment_status',
      key: 'appointment_status',
      filters: [
        {
          text: 'Resheduled',
          value: 'pending',
        },
        {
          text: 'Passed',
          value: 'passed',
        },
        {
          text: 'Missed',
          value: 'missed',
        },
      ],
      filteredValue: filteredInfo.appointment_status || null,
      onFilter: (value, record) => record.appointment_status.includes(value),
      sorter: (a, b) => a.appointment_status.length - b.appointment_status.length,
      sortOrder: sortedInfo.columnKey === 'appointment_status' ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ['descend', 'ascend'],
      /* render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'rescheduled') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ), */
      render: (status) => {
        const result = 
        status === "missed"? 
        <a className='stats error'>{status}</a>
        : status === "passed" ? 
        <a className='stats success'>{status}</a>
        :
        <a className='stats alert'>rescheduled</a>
        return result;
      }
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointment_date',
      key: 'appointment_date',
      sorter: (a, b) => a.appointment_date - b.appointment_date,
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'appointment_date' ? sortedInfo.order : null,
      ellipsis: true,
      render: (date) => {
        const dates = new Date(date);
        const day = dates.getDate();
        const month = dates.getMonth();
        const year = dates.getFullYear();
        return <span>{day + '/' + month + '/' + year}</span>
      }
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => a.createdAt - b.createdAt,
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null,
      ellipsis: true,
      render: (date) => {
        const dates = new Date(date);
        const day = dates.getDate();
        const month = dates.getMonth();
        const year = dates.getFullYear();
        return <span>{day + '/' + month + '/' + year}</span>
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (id) => (
        <Space size="middle">
          <Link to={`/${id}/edit`} className='action-btn edit'>Edit</Link>
          <Link className='action-btn delete'>Delete</Link>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} onChange={handleChange} scroll={{ x: 'auto', y: 300 }} />;
};
export default AppointmentsTable;