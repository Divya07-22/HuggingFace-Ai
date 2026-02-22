// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error connecting to the server');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0b0c10]">
      <div className="bg-[#1e1f25] p-10 rounded-2xl shadow-xl w-[400px] flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-2">Kodbank Login</h1>
        <p className="text-gray-400 mb-8">Secure access to your wealth</p>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Username" 
              className="w-full bg-[#2a2b32] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500"
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-[#2a2b32] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500"
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 rounded-lg mt-4 shadow-lg shadow-orange-500/20">
            Login →
          </button>
        </form>
        
        <p className="text-gray-400 mt-6 text-sm">
          Don't have an account? <Link to="/register" className="text-orange-500 font-semibold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}