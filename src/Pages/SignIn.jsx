import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiLogin, getUserData } from '../services/auth';
import { useAuth } from '../components/dashboard/contexts/AuthContext';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {

      const loginRes = await apiLogin({ email, password });
      const { accessToken } = loginRes.data;

      if (!accessToken) {
        throw new Error("Access token missing");
      }


      localStorage.setItem("token", accessToken);


      const profileRes = await getUserData();
      const user = profileRes.data;

      if (!user || !user.role) {
        throw new Error("User profile missing role");
      }


      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);


      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back, ${user.firstName || 'User'}!`,
        timer: 2000,
        showConfirmButton: false
      });


      if (user.role === 'admin') {
        navigate('/dashboard/admin');
      } else if (user.role === 'farmer') {
        navigate('/dashboard/farmer');
      } else if (user.role === 'buyer' || user.role === 'user') {
        navigate('/dashboard/buyer');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error("Login failed:", error);

      let msg = "Login failed. Please try again.";
      if (error.response?.status === 401) msg = "Invalid credentials.";
      if (error.response?.status === 404) msg = "User not found.";
      if (error.response?.data?.message) msg = error.response.data.message;

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: msg,
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '6px', color: '#555' }}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '6px', color: '#555' }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#6c757d' : '#28a745',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '5px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            {loading ? 'Logging in...' : 'Sign in'}
          </button>
        </form>

        <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px', color: '#555' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#28a745', fontWeight: 'bold', textDecoration: 'none' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
