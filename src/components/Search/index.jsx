import { Input  } from 'antd';

const search = ({input}) => {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  return (
    <Search
      placeholder="search"
      onSearch={onSearch}
      className='search-field'
    />
  )
}

export default search;