import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    // const [data, setData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate()
    const [values, setValues] = useState({
        name: '',
        email:'',
        phone:'',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({...values, [name]: value})
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put("http://localhost:3000/users/" + id,  values).then((res) => {
            console.log(res)
            navigate('/')
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/users/` + id)
            .then((res) => {
                setValues(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]); // Add id as a dependency to re-fetch data when id changes
  return (
    <div className='d-flex w-100 vh-50 justify-content-center align-item-center bt-light'>
        <div className='w-100 border bg-white shadow px-5 pt-3 pb-5 rounded'>
            <h1>Add User</h1>
            <form onSubmit={handleUpdate}>
                <div className='mb-2'>
                    <label>Name:</label>
                    <input type='text' name='name' className='form-control' value={values.name} placeholder='Enter Name' onChange={handleChange}/>
                </div>
                <div className='mb-2'>
                    <label>Email:</label>
                    <input type='email' name='email' className='form-control' value={values.email} placeholder='Enter Email' onChange={handleChange}/>
                </div>
                <div className='mb-2'>
                    <label>Phone:</label>
                    <input type='text' name='phone' className='form-control' value={values.phone} placeholder='Enter phone' onChange={handleChange}/>
                </div>
                <button className='btn btn-success'>Submit</button>
                <Link to="/" className='btn btn-primary ms-3'>Back</Link>
            </form>

        </div>

    </div>
  )
}

export default Update