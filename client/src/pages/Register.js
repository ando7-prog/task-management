import { useState } from 'react';

import { registerUser } from '../services/authService';
import { Link } from 'react-router-dom';

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = await registerUser(formData);

            alert(data.message);

        } catch (error) {

            alert('Registration failed');

        }

    };

 return (

  <div className="auth-container">

    <form
      className="auth-form"
      onSubmit={handleSubmit}
    >

      <h2>Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button type="submit">
        Register
      </button>

      <p className="auth-link">

        Already have an account?

        <Link to="/">
          Login
        </Link>

      </p>

    </form>

  </div>

);

}

export default Register;