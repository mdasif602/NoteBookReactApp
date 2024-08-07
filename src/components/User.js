import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const User = () => {
    const context = useContext(noteContext);
    const { user } = context;
    return (
        <div>
            {/* <h2>Name: {user.name}</h2>
            <h2>Email: {user.email}</h2> */}
            <h2>Name: {localStorage.getItem('name')}</h2>
            <h2>Email: {localStorage.getItem('email')}</h2>
        </div>
    )
}

export default User