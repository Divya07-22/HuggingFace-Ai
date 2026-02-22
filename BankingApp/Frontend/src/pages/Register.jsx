import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, Phone, ShieldCheck, ChevronDown } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    uid: '', username: '', email: '', phone: '', password: '', role: 'Customer'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/auth/register`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  }
);
        
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error connecting to the server. Check if Backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b0c10]">
        <div className="bg-[#1e1f25] p-10 rounded-2xl shadow-xl w-[400px] flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Join Kodbank</h1>
          <p className="text-gray-400 mb-8">Start your premium journey today</p>
          <ShieldCheck className="w-16 h-16 text-emerald-500 mb-4" />
          <p className="text-white font-medium">Registration Successful! Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0b0c10] py-10">
      <div className="bg-[#1e1f25] p-10 rounded-2xl shadow-xl w-[450px] flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Join Kodbank</h1>
        <p className="text-gray-400 mb-8 text-center">Start your premium journey today</p>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input type="text" name="uid" placeholder="User ID (UID)" onChange={handleChange} required className="w-full bg-[#2a2b32] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500" />
          </div>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full bg-[#2a2b32] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500" />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="w-full bg-[#2a2b32] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500" />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full bg-[#2a2b32] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input type="password" name="password" placeholder="Create Password" onChange={handleChange} required className="w-full bg-[#2a2b32] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500" />
          </div>
          
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-3 text-gray-500 w-5 h-5 pointer-events-none" />
            <select 
              name="role" 
              onChange={handleChange} 
              value={formData.role} 
              className="w-full bg-[#2a2b32] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:border-orange-500 appearance-none cursor-pointer"
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-500 w-5 h-5 pointer-events-none" />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 rounded-lg mt-4 shadow-lg shadow-orange-500/20 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>
        </form>
        
        <p className="text-gray-400 mt-6 text-sm">
          Already member? <Link to="/login" className="text-orange-500 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}