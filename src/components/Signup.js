import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

export const Signup = (props) => {
  const context = useContext(noteContext);
  const {setUserData} = context;

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    setUserData(name, email)
    const response = await fetch("https://notebookreactapp.onrender.com/api/auth/createuser", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the authToken and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Successfully created your Account", "success")
    } else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    // setPassword({ ...password, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <h2>Signup to continue to NoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="cpassword" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}