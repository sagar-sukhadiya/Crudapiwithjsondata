import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [lastId, setLastId] = useState(0); // Keep track of the last assigned ID
    const navigate = useNavigate();

    // Fetch the last ID when the component mounts
    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then(res => {
                const lastUser = res.data[res.data.length - 1];
                if (lastUser) {
                    setLastId(parseInt(lastUser.id)); // Parse ID to integer
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Increment the last ID to generate the new ID
        const newId = String(lastId + 1); // Convert the ID to string
        axios.post("http://localhost:3000/users", { id: newId, ...values })
            .then(res => {
                // Assuming res.data contains the newly added user
                // Update the state accordingly, if needed
                // For example, navigate to the home page after adding user
                navigate("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex w-100 vh-50 justify-content-center align-item-center bt-light'>
            <div className='w-100 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Add User</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label>Name:</label>
                        <input type='text' name='name' className='form-control' value={values.name} placeholder='Enter Name' onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label>Email:</label>
                        <input type='email' name='email' className='form-control' value={values.email} placeholder='Enter Email' onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label>Phone:</label>
                        <input type='text' name='phone' className='form-control' value={values.phone} placeholder='Enter phone' onChange={handleChange} />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    <Link to="/" className='btn btn-primary ms-3'>Back</Link>
                </form>
            </div>
        </div>
    );
}

export default Create;
