import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { loginUser } from '../services/authService';
import { Link } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

            const data = await loginUser(formData);

            localStorage.setItem('token', data.token);      // stores authentication token in browser memory

            alert('Login successful');

            navigate('/dashboard');

        } catch (error) {

            alert('Login failed');

        }

    };

return (

  <div className="auth-container">

    <form
      className="auth-form"
      onSubmit={handleSubmit}
    >

      <h2>Login</h2>

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
        Login
      </button>

      <p className="auth-link">

        Don't have an account?

        <Link to="/register">
          Register
        </Link>

      </p>

    </form>

  </div>

);

}

export default Login;