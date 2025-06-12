import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const resetForm = () => {
    setRole('user');
    setName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsSubmitted(true);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitted(false);

    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('https://castorcareghanabackend.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, name: `${name} ${lastName}`, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || 'Failed to sign up');
      } else {
        resetForm();
        navigate('/welcome'); // 👈 Redirect path after successful signup
      }
    } catch (err) {
      setErrorMsg('Network error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  };

  const passwordFieldStyle = {
    ...inputStyle,
    paddingRight: '35px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '10px' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '16px', color: '#333', fontSize: '22px' }}>Sign Up</h2>
        
        {!isSubmitted && (
          <form onSubmit={handleSignUp}>
            <div style={{ marginBottom: '12px' }}>
              <label>Select Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
                <option value="user">Buyer</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label>First Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label>Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={inputStyle} />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
            </div>

            <div style={{ marginBottom: '12px', position: 'relative' }}>
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={passwordFieldStyle}
              />
              <span onClick={togglePassword} style={{ position: 'absolute', top: '35px', right: '10px', cursor: 'pointer', color: '#555' }}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div style={{ marginBottom: '12px', position: 'relative' }}>
              <label>Confirm Password</label>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={passwordFieldStyle}
              />
              <span onClick={toggleConfirm} style={{ position: 'absolute', top: '35px', right: '10px', cursor: 'pointer', color: '#555' }}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errorMsg && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{errorMsg}</p>}

            <p style={{ fontSize: '12px', color: '#555', textAlign: 'left' }}><input type="checkbox" required style={{ marginRight: '5px',  }} /> By signing up, you agree to our terms of service and privacy policy.</p>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#28a745',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '5px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '8px',
              }}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        )}

        {!isSubmitted && (
          <p style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/signin" style={{ color: '#28a745', fontWeight: 'bold' }}>
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
