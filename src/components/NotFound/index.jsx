import { Typography  } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  document.title = "Page Not Found";

  const {Title, Text} = Typography;
  return (
    <div className="notfound">
      <Title level={1} className='notfound__title notfound__style'>PAGE NOT FOUND</Title>
      <Text className="notfound__desc">Are you lost? Please visit our </Text>
      <Link to="/" className='notfound__link notfound__style'>Home page</Link>
    </div>
  )
}

export default NotFound