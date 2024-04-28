import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cemail: '',
        password: '',
        cpassword: ''
    });
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.email !== formData.cemail){
            setError('Email and coinfirm password must match')
            return
        }
        if(formData.password !== formData.cpassword){
            setError('password and cpassword must match')
            return
        }
        setError('')
        console.log(formData)
        setFormData({
            name: '',
            email: '',
            cemail: '',
            password: '',
            cpassword: ''
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' name="name" placeholder='name' value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <input type="email" name='email' placeholder='email' value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <input type='email' name='cemail' placeholder='confirm email' value={formData.cemail} onChange={handleChange} />
                </div>
                <div>
                    <input type='password' name='password' placeholder='password' value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <input type='password' name='cpassword' placeholder='confirm password' value={formData.cpassword} onChange={handleChange} />
                </div>
                <button type='submit'>Submit</button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    )
}

export default Register;
