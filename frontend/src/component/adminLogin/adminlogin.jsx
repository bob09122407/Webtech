import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded admin logins
    const adminLogins = [
      { username: 'admin1', password: 'password1' },
      { username: 'admin2', password: 'password2' },
    ];

    // Check if the entered credentials match any admin login
    const isValidLogin = adminLogins.some(
      (admin) => admin.username === username && admin.password === password
    );

    if (isValidLogin) {
      // Set authenticated status in localStorage
      localStorage.setItem('authenticated', 'true');
      
      // Update state
      setAuthenticated(true);

      // Redirect to "/adminpage"
      navigate('/adminpage');
    } else {
      // Authentication failed, display an error message or handle it as needed
      console.log('Authentication failed. Invalid username or password.');
    }
  };

  return (
    <div className="wrappersss">
      <div className="containeradmin">
        <div className="col-left">
          <div className="login-text">
            <h2>Welcome Back</h2>
            <p>Create your account.<br />It's totally free.</p>
          </div>
        </div>
        <div className="col-right">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <p>
                <label>Username or email address<span>*</span></label>
                <input
                  type="text"
                  placeholder="Username or Email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </p>
              <p>
                <label>Password<span>*</span></label>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
              <p>
                <input type="submit" value="Sign In" />
              </p>
              <p>
                {/* <a href="">Forget Password?</a> */}
              </p>

              <div className="dummy">
                <h1>Adimn Username: admin1</h1>
                <h2>Admin Password: password1</h2>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
