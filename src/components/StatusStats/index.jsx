import { Typography  } from 'antd';

const StatusStats = ({type, status}) => {
  const { Title, Text } = Typography;

  return (
    <div className={"status-stats " + type.toLowerCase()}>
      <Title level={3} className=''>{type}</Title>
      <Text className={"stats " + type.toLowerCase()}>{status}</Text>
    </div>
  )
}

export default StatusStats;