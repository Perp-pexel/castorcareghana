import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiLogin, getUserData } from '../services/auth';
import { useAuth } from '../components/dashboard/contexts/AuthContext';
import bg4 from '../assets/background/bg4.webp';
import bg9 from '../assets/background/bg9.jpg';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [showForgotForm, setShowForgotForm] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiLogin({ email, password }); // Only send email & password
      console.log('✅ Login Response:', response.data);

      const { accessToken, data: user } = response.data;

      if (!accessToken) throw new Error('Access token missing');
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      rememberMe
        ? localStorage.setItem('rememberedEmail', email)
        : localStorage.removeItem('rememberedEmail');

      setUser(user);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back, ${user.firstName || 'User'}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect based on role
      if (user.role === 'admin') navigate('/dashboard/admin');
      else if (user.role === 'farmer') navigate('/dashboard/farmer');
      else navigate('/dashboard/buyer');
    } catch (error) {
      console.error('❌ Login error:', error);

      let msg = 'Login failed. Please try again.';
      if (error.response?.status === 422) msg = 'Invalid email or password format.';
      else if (error.response?.status === 401) msg = 'Invalid credentials.';
      else if (error.response?.status === 404) msg = 'User not found.';
      else if (error.response?.data?.message) msg = error.response.data.message;

      Swal.fire({ icon: 'error', title: 'Login Failed', text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return Swal.fire('Error', 'Please enter an email.', 'error');

    setForgotLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const result = await res.json();
      console.log('📧 Forgot password response:', result);

      if (res.ok) {
        Swal.fire('Success', 'Reset link sent to your email.', 'success');
        setShowForgotForm(false);
      } else {
        Swal.fire('Error', result.message || 'Failed to send reset link.', 'error');
      }
    } catch (err) {
      console.error('❌ Forgot password error:', err);
      Swal.fire('Error', 'Network error. Try again.', 'error');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundImage: `url(${showForgotForm ? bg9 : bg4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
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
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => (showForgotForm ? setShowForgotForm(false) : navigate('/'))}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '20px',
            color: '#888',
            cursor: 'pointer',
            padding: '4px 10px',
            borderRadius: '5px',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e6f4ea';
            e.target.style.color = '#28a745';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#888';
          }}
          aria-label="Close"
        >
          &times;
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#28a745', fontSize: '24px', fontWeight: 'bold' }}>
          {showForgotForm ? 'Forgot Password' : 'Sign In'}
        </h2>

        {showForgotForm ? (
          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle} disabled={forgotLoading}>
              {forgotLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ marginRight: '6px' }}
                />
                Remember me
              </label>
              <span onClick={() => setShowForgotForm(true)} style={{ ...linkStyle, fontSize: '13px' }}>
                Forgot password?
              </span>
            </div>
            <button type="submit" style={buttonStyle} disabled={loading}>
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>
        )}

        {!showForgotForm && (
          <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px', color: '#555' }}>
            Don’t have an account?{' '}
            <Link to="/signup" style={{ color: '#28a745', fontWeight: 'bold' }}>
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#28a745',
  color: '#fff',
  fontWeight: 'bold',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

const linkStyle = {
  color: '#007bff',
  cursor: 'pointer',
  textAlign: 'center',
};

export default SignIn;
