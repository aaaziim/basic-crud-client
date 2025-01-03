import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulating a "loader" with useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) =>{
    console.log("delete", id)
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <p className='bg-gray-200 p-3 m-2 rounded-md hover:bg-green-200 relative' key={user._id}><Link to={`/users/${user._id}`} >{user.name}   |  {user.email}</Link>
          <span onClick={()=>handleDelete(user._id)} className='absolute top-1 text-white font-bold right-3 p-2 bg-red-500 rounded-sm cursor-pointer '>X</span>
          </p>
        ))}
      </ul>
    </div>
  );
};

export default Users;
