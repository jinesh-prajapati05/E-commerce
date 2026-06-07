import { useContext, useState } from 'react';
import './style.scss'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../authContext';
import useAuthUser from '../hooks/authUser';
export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {handleLogin} = useAuthUser()
    const navigate = useNavigate()
    const {loading} = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleLogin({email, password})
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
        <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">
            Login to access your account dashboard
          </p>

          <form onSubmit={handleSubmit} className="login-form">
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

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>

              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <p className="signup-text">
              Don&apos;t have an account?
              <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    );
}
