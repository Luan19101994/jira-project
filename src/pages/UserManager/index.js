import { useContext } from 'react';
import '../../assets/css/UserManager.css';
import { Input } from 'antd';
import { UserManagerContext } from '../../context/UserManagerContext';
import Draw from '../../components/userManager/Draw';
import Table from '../../components/userManager/Table'
import { getAllUser } from '../../service/UserService'
function UserManager() {
  const { setUsers } = useContext(UserManagerContext);
  const onSearch = (value) => {
    async function fetchData() {
      const { content } = await getAllUser({keyword: value })
      setUsers(content)
    }
    fetchData()
  };

  return (
    <div className="userManager">
      <h5 className='mb-5 font-semibold'>USER MANAGER</h5>
      <Input.Search
      placeholder="Search User"
      allowClear
      onSearch={onSearch}
      style={{
        width: '50%',
      }}
    />
      <div className="mt-4">
        <Table />
      </div>
      <Draw />
    </div>
  );
}

export default UserManager;
