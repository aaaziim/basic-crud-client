import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SingleUser = () => {

    const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Replace with the actual URL of your server
        const response = await fetch(`http://localhost:5000/users/${id}`);
        
        if (!response.ok) {
          throw new Error('User not found');
        }

        const result = await response.json();
        setUser(result[0]); // Assuming the result is an array, take the first item
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]); // Dependency array ensures fetch happens when `id` changes

  // Display loading, error, or the user details
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

    
    return (
        <div>
        <h1>User Details</h1>
        <p className='bg-gray-200 p-3 m-2 rounded-md hover:bg-green-200' ><strong>Name:</strong> {user.name}</p>
        <p className='bg-gray-200 p-3 m-2 rounded-md hover:bg-green-200' ><strong>Email:</strong> {user.email}</p>
        <Link className='bg-gray-200 p-3 rounded-md hover:bg-green-200 m-2 block'  to={`/users/update/${user._id}`}><button>Update</button></Link>
      </div>
    );
};

export default SingleUser;