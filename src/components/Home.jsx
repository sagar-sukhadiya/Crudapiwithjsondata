import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const [data, setAllData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/users").then((res) => {
            console.log(res)
        setAllData(res.data)
       }).catch((err) => console.log(err))
    },[])

    const handleDelete = (id) => {
        const confirm = window.confirm("whould you like to delete");
        if(confirm){
            axios.delete('http://localhost:3000/users/'+id)
            .then(res => {
                setAllData(data.filter(item => item.id !== id));
                navigate("/")
            }).catch(err => console.log(err))
        }
    }
  return (
    <div className="card">
    <div className="card-body">
        <h1>List of User</h1>
        <div>
            <div className='d-flex justify-content-end'>
                <Link to="/create" className='btn btn-success'>Add +</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((da, ind) => (
                        <tr key={ind}>
                            <td>{da.id}</td>
                            <td>{da.name}</td>
                            <td>{da.email}</td>
                            <td>{da.phone}</td>
                            <td>
                                <Link to={`/read/${da.id}`} className='btn btn-sm btn-info me-2'> Read</Link>
                                <Link to={`/update/${da.id}`} className='btn btn-sm btn-primary me-2'> Edit</Link>
                                <button onClick={(e) => handleDelete(da.id)} className='btn btn-sm btn-danger'> Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  </div>
  )
}

export default Home