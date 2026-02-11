
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'
// import './Login.css';

// const Login = () => {
//   const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
        
    
//         const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://indiamart3-backend.onrender.com'}/login`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//           localStorage.setItem('user', JSON.stringify({ name: data.data.name,userId:data.data.userId, token: data.data.token }));
//           navigate('/');
//       } else {
//         window.alert('error!!!!!')
//           setError(data.message);
//       }
    
//       };
//       const fetchUserData = async () => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (!user) return;
    
//         const response = await fetch(`https://indiamart3-backend.onrender.com/user/${user.userId}`, {
//             headers: { Authorization: `Bearer ${user.token}` },
//         });
    
//         const data = await response.json();
//         if (response.ok) {
//             console.log("User data:", data.data);
//         } else {
//             console.error(data.message);
//         }
//     };
    

//     return (
//       <div className='Body'>
//         <div className="login-container">
//             <div className="login-card">
//                 <h1 className="login-header">Welcome to IndiaMart</h1>
//                 <p className="login-subtitle">Sign in to continue shopping</p>
//                 <form onSubmit={handleLogin}>
//                     <div className="input-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             placeholder="Enter your password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="login-button">Login</button>
//                 </form>
//                 <p>
//                     Don't have an account? <span onClick={() => navigate('/register')} className="link">Sign up here</span>
//                 </p>
//             </div>
//         </div>
//         </div>
//     );
// };

// export default Login;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.status === true) {
        const user = data.data;

        // ✅ Store everything needed in localStorage
        localStorage.setItem('user', JSON.stringify({ name: user.name, userId: user.userId, token: user.token,orders:user.orders }));
        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', user.userId);
        localStorage.setItem('orders',user.orders)
        navigate('/');
      } else {
        setError(data.message || "Login failed.");
        alert(data.message || "Login failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='Body'>
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-header">Welcome to IndiaMart</h1>
          <p className="login-subtitle">Sign in to continue shopping</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">Login</button>
          </form>

          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate('/register')} className="link">Sign up here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



  

