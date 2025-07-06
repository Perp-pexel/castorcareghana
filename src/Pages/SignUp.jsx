import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Swal from 'sweetalert2';
import { apiSignup } from '../services/auth';
import bg8 from '../assets/background/bg8.webp'; 

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

  const formatPhoneForBackend = (phoneNumber) => {
    if (phoneNumber.startsWith('233')) {
      return '0' + phoneNumber.substring(3);
    }
    return phoneNumber;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitted(false);

    if (!role) return setErrorMsg('Please select a role.');
    if (password !== confirmPassword) return setErrorMsg("Passwords don't match!");
    if (!contact) return setErrorMsg('Please enter your contact number.');

    setLoading(true);
    try {
      const payload = {
        firstName,
        lastName,
        contact: formatPhoneForBackend(contact),
        email,
        password,
        role,
      };

      const response = await apiSignup(payload);
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Your account has been created successfully!',
        });
        resetForm();
        navigate('/signin');
      }
    } catch (err) {
      let errorMessage = 'Signup failed, please try again.';
      const resErr = err.response?.data;
      if (err.response?.status === 422 && resErr) {
        if (typeof resErr.errors === 'object') {
          errorMessage = Object.values(resErr.errors).flat().join(', ');
        } else {
          errorMessage = resErr.message || errorMessage;
        }
      }
      Swal.fire({ icon: 'error', title: 'Registration Failed', text: errorMessage });
      setErrorMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '9px',
    marginBottom: '9px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  };

  const passwordFieldStyle = {
    ...inputStyle,
    paddingRight: '35px',
  };

  return (
    <div style={{
      backgroundImage: `url(${bg8})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '400px',
      marginBottom: '-95px',
    }}>
      <div style={{
        position: 'relative',
        marginTop: '60px',
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
      }}>
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            top: '12px',
            right: '15px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#999',
            cursor: 'pointer',
            borderRadius: '10%',
            width: '30px',
            height: '30px',
            textAlign: 'center',
            lineHeight: '26px',
            transition: 'all 0.3s ease',
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

        <h2 style={{ textAlign: 'center', marginBottom: '12px', color: '#28a745', fontSize: '24px', fontWeight: 'bold' }}>Sign Up</h2>

        {!isSubmitted && (
          <form onSubmit={handleSignUp}>
            <select value={role} onChange={(e) => setRole(e.target.value)} required style={inputStyle}>
              <option value="">-- Select Role --</option>
              <option value="buyer">Buyer</option>
              <option value="farmer">Farmer</option>
            </select>

            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={inputStyle} />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={inputStyle} />

            <PhoneInput
              country={'gh'}
              value={contact}
              onChange={setContact}
              inputStyle={{ ...inputStyle, paddingLeft: '50px' }}
              containerStyle={{ marginBottom: '10px' }}
              inputProps={{ required: true }}
            />

            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />

            <div style={{ position: 'relative' }}>
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={passwordFieldStyle} />
              <span onClick={togglePassword} style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer', color: '#555' }}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={passwordFieldStyle} />
              <span onClick={toggleConfirm} style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer', color: '#555' }}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errorMsg && <p style={{ color: 'red', fontSize: '13px', textAlign: 'center' }}>{errorMsg}</p>}

            <label style={{ fontSize: '12px', display: 'block', marginBottom: '10px' }}>
              <input type="checkbox" required style={{ marginRight: '6px' }} />
              I agree to the terms and conditions
            </label>

            <button type="submit" disabled={loading} style={{
              width: '100%',
              padding: '10px',
              backgroundColor: loading ? '#6c757d' : '#28a745',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '4px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '15px'
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
