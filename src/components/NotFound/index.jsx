import { Typography  } from 'antd';


const NotFound = () => {
  document.title = "Page Not Found";

  const {Title, Text} = Typography;
  return (
    <div className="notfound">
      <Title level={1} className=''>PAGE NOT FOUND</Title>
      <Text className="">Are you lost? Please visit our Home page</Text>
    </div>
  )
}

export default NotFound