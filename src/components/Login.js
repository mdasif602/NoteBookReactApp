import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

export const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const context = useContext(noteContext);
  const { setUserData } = context;

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "email": credentials.email, "password": credentials.password }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the authToken and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Logged in Successfully ", "success")
      setUserData(json.user.name, json.user.email)
    } else {
      props.showAlert("Invalid Details", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    // setPassword({ ...password, [e.target.name]: e.target.value })
  }

  return (
    <div className='mt-3'>
      <h2>Login to continue to NoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" autoComplete="username" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" >Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} autoComplete="current-password" />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}