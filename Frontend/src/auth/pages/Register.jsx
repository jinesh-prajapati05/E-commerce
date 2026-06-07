import { useContext, useState } from 'react';
import useAuthUser from '../hooks/authUser';
import './style.scss'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../authContext';

export default function Register() {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {loading} = useContext(AuthContext)
    const {handleRegister} = useAuthUser()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleRegister({userName, email, password})
        navigate('/')
    }

    if (loading) {
        return (
            <div>
                <h1>Loading.....</h1>
            </div>
        )
    }

    return (
        <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <h1 className="register-title">Create Account</h1>

          <p className="register-subtitle">
            Sign up to get started with your account
          </p>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label className="form-label">Username</label>

              <input
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                type="text"
                placeholder="Enter your username"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>

              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter your email"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>

              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Enter your password"
                className="form-input"
              />
            </div>

            <button type="submit" className="register-btn">
              Create Account
            </button>

            <p className="login-text">
              Already have an account?
              <Link to="/login" className="login-link">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    );
}
