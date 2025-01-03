import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
   
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

     const handleUpdateUser = (e) =>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const obj = {
            name,
            email
        }

        fetch(`http://localhost:5000/users/update/${id}`,
            {
                method: 'PUT',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            } )
            .then(res=>res.json())
            .then(data=>{
                if(data.modifiedCount){
                    alert("User Updated")
                }
            })


     }
   
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
        <h1>User Update</h1>
        <form className='bg-slate-400 p-4 rounded-2xl' onSubmit={handleUpdateUser} >

<input className='border my-2   bg-gray-200 p-3 m-2 rounded-md hover:bg-green-200' type="text" name='name' defaultValue={user.name} />
<br />
<input className='border my-2   bg-gray-200 p-3 m-2 rounded-md hover:bg-green-200' type="email" name='email' defaultValue= {user.email} />
<br />

<input className='btn bg-gray-200 p-3 m-2 rounded-md hover:bg-green-200' type="submit" value="Add User" />


</form>
        
      </div>
    );
};

export default UpdateUser;