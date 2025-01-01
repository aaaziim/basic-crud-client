 
import './App.css'

function App() {
  
  

  const handleAddUser = (e) =>{
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = {
      name,
      email
    }

    fetch("http://localhost:5000/addusers", {
      method:"POST",
      headers:{'content-type':'application/json'},
      body: JSON.stringify(newUser)
    })
    .then(res=>res.json())
    .then(data => {
      if(data.acknowledged){
        alert("User Added")
      }
    })

  }

  return (
    <>
        <h1>Simple CRUD</h1>

        <form className='bg-slate-400 p-4 rounded-2xl' onSubmit={handleAddUser} >

            <input className='border my-2 rounded-lg' type="text" name='name' />
            <br />
            <input className='border my-2 rounded-lg' type="email" name='email' />
            <br />

            <input className='btn' type="submit" value="Add User" />


        </form>
    </>
  )
}

export default App
