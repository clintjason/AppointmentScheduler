import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, notification } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from "react-router-dom";
import { deleteAppointmentById, initState } from '../../services/api.service';
import { useDispatch } from 'react-redux'


const AppointmentsTable = ({data}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const openNotifWithIcon = (type) => {
    const suc = "The Appointment was deleted successfully.";
    const fail = "The Appointment was not deleted. Please try again later.";
    const desc = type.toLowerCase() == 'error' ? fail : suc;
    api[type]({
      message: `${type.toUpperCase()} Deleting Appointment`,
      description: desc,
    });
  }

  const openNotificationWithIcon = (type) => {
    const suc = "The Appointments list was successfully loaded. Visit the list to view, edit, and delete it if need be.";
    const fail = "The Appointments list was not loaded successfully. Please try again later.";
    const desc = type.toLowerCase() == 'error' ? fail : suc;
    api[type]({
      message: `Appointments Data Loading  ${type}`,
      description: desc,
    });
  }

  const deleteRecord = (event) => {
    const id = event.currentTarget.getAttribute('data-id');
    console.log("delete :",id);
    deleteAppointmentById(id)
    .then(async () => {
      openNotifWithIcon('success');
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
    })
    .catch(error => {
      console.log(error);
      openNotifWithIcon('error');
    })
  }

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      filteredValue: filteredInfo.name || null,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Code',
      dataIndex: 'unique_code',
      key: 'unique_code',
      sorter: (a, b) => {
        if (a.unique_code.toLowerCase() < b.unique_code.toLowerCase()) {
          return -1;
        }
        if (a.unique_code.toLowerCase() > b.unique_code.toLowerCase()) {
          return 1;
        }
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'unique_code' ? sortedInfo.order : null,
      ellipsis: true,
      filteredValue: filteredInfo.unique_code || null,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '10%',
      sorter: (a, b) => a.age - b.age,
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
      filteredValue: filteredInfo.age || null,
      ...getColumnSearchProps('age'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      sorter: (a, b) => {
        if (a.address.toLowerCase() < b.address.toLowerCase()) {
          return -1;
        }
        if (a.address.toLowerCase() > b.address.toLowerCase()) {
          return 1;
        }
        return 0;
      },
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      filteredValue: filteredInfo.address || null,
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
      filteredValue: filteredInfo.phone || null,
      ellipsis: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Sex',
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
      render: (status) => {
        const result = 
        status === "missed"? 
        <a key="missed" className='stats error'>{status}</a>
        : status === "passed" ? 
        <a key="passed" className='stats success'>{status}</a>
        :
        <a key="rescheduled" className='stats alert'>rescheduled</a>
        return result;
      }
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointment_date',
      key: 'appointment_date',
      sorter: (a, b) => new Date(a.appointment_date) - new Date(b.appointment_date),
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'appointment_date' ? sortedInfo.order : null,
      ellipsis: true,
      filteredValue: filteredInfo.appointment_date || null,
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
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null,
      ellipsis: true,
      filteredValue: filteredInfo.createdAt || null,
      render: (date) => {
        const dates = new Date(date);
        const day = dates.getDate();
        const month = dates.getMonth();
        const year = dates.getFullYear();
        return <span>{day + '/' + month + '/' + year}</span>
      }
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'action',
      width: '12%',
      render: (_,record) => (
        <Space size="middle">
          <Link to={`/${record.id}/edit`} className='action-btn edit'>Edit</Link>
          <Link className='action-btn delete' data-id={record.id} onClick={deleteRecord}>Delete</Link>
        </Space>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Table columns={columns} dataSource={data} onChange={handleChange} scroll={{ x: 1500, y: 300 }} />
    </>
  );
};
export default AppointmentsTable;