import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Swal from 'sweetalert2';
import { apiSignup } from '../services/auth';

const SignUp = () => {
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
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
    setRole('');
    setFirstName('');
    setLastName('');
    setContact('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsSubmitted(true);
  };

  // Function to format phone number for backend
  const formatPhoneForBackend = (phoneNumber) => {
    // Remove country code and format to local format
    if (phoneNumber.startsWith('233')) {
      return '0' + phoneNumber.substring(3);
    }
    return phoneNumber;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitted(false);

    if (!role) {
      setErrorMsg('Please select a role.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match!");
      return;
    }

    if (!contact) {
      setErrorMsg('Please enter your contact number.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        firstName,
        lastName,
        contact: formatPhoneForBackend(contact), // Format phone number
        email,
        password,
        role
      };

      console.log('Sending payload:', payload); // Debug log

      const response = await apiSignup(payload);
      console.log('Signup response:', response.data);

      if (response.status === 200 || response.status === 201) {
        // SweetAlert for successful signup
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Your account has been created successfully!',
        });

        resetForm();
        navigate('/signin');
      }
    } catch (err) {
      console.error("Signup error:", err);
      
      let errorMessage = 'Signup failed, please try again.';
      
      if (err.response?.status === 422) {
        // Handle validation errors
        const validationErrors = err.response?.data?.errors || err.response?.data?.message;
        if (typeof validationErrors === 'object') {
          errorMessage = Object.values(validationErrors).flat().join(', ');
        } else if (typeof validationErrors === 'string') {
          errorMessage = validationErrors;
        } else {
          errorMessage = 'Please check your input and try again.';
        }
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      // SweetAlert for signup failure
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errorMessage,
      });

      setErrorMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    fontSize: '14px',
  };

  const passwordFieldStyle = {
    ...inputStyle,
    paddingRight: '35px',
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '10px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '14px',
          color: '#333',
          fontSize: '20px'
        }}>Sign Up</h2>

        {!isSubmitted && (
          <form onSubmit={handleSignUp}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '14px' }}>Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                style={inputStyle}
              >
                <option value="">-- Select Role --</option>
                <option value="buyer">Buyer</option>
                <option value="farmer">Farmer</option>
                
              </select>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '14px' }}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '14px' }}>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '14px' }}>Contact</label>
              <PhoneInput
                country={'gh'}
                value={contact}
                onChange={setContact}
                inputStyle={{ ...inputStyle, paddingLeft: '48px' }}
                containerStyle={{ width: '100%' }}
                inputProps={{ required: true }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '14px' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '10px', position: 'relative' }}>
              <label style={{ fontSize: '14px' }}>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={passwordFieldStyle}
              />
              <span onClick={togglePassword} style={{
                position: 'absolute',
                top: '30px',
                right: '10px',
                cursor: 'pointer',
                color: '#555'
              }}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div style={{ marginBottom: '10px', position: 'relative' }}>
              <label style={{ fontSize: '14px' }}>Confirm Password</label>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={passwordFieldStyle}
              />
              <span onClick={toggleConfirm} style={{
                position: 'absolute',
                top: '30px',
                right: '10px',
                cursor: 'pointer',
                color: '#555'
              }}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errorMsg && <p style={{
              color: 'red',
              fontSize: '13px',
              textAlign: 'center'
            }}>{errorMsg}</p>}

            <p style={{
              fontSize: '12px',
              color: '#555',
              textAlign: 'left'
            }}>
              <input type="checkbox" required style={{ marginRight: '5px' }} /> I agree to the terms and conditions
            </p>

            <button type="submit" disabled={loading} style={{
              width: '100%',
              padding: '8px',
              backgroundColor: loading ? '#6c757d' : '#28a745',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '5px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '8px',
              fontSize: '15px',
              transition: 'background-color 0.2s ease',
            }}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        )}

        {!isSubmitted && (
          <p style={{ marginTop: '10px', fontSize: '13px', textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/signin" style={{ color: '#28a745', fontWeight: 'bold', textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;