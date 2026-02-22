// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SummaryCard from '../components/SummaryCard';
import SpendingGraph from '../components/SpendingGraph';
import TransactionList from '../components/TransactionList';
import AiChat from '../components/AiChat';
import { DollarSign, TrendingUp, Activity, CreditCard } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Guest');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUsername(decoded.username || 'User');
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  const handleCheckBalance = () => alert("Your balance is: $100000.00");
  const handleSendMoney = () => alert("Send Money functionality: Initiating transaction sequence...");

  return (
    <div className="flex h-screen bg-[#0b0c10] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-white">Welcome back, {username}</h1>
            <p className="text-gray-400">Here's what's happening with your finance today.</p>
          </div>
          <div className="space-x-4">
            <button onClick={handleCheckBalance} className="px-6 py-2 border border-gray-700 rounded-full hover:bg-gray-800 transition">Check Balance</button>
            <button onClick={handleSendMoney} className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full font-medium shadow-lg shadow-orange-500/20">Send Money</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SummaryCard title="Total Balance" amount="$45,231.89" trend="+ 12.5%" icon={DollarSign} color="text-orange-500" />
          <SummaryCard title="Monthly Income" amount="$8,432.5" trend="+ 8.2%" icon={TrendingUp} color="text-pink-500" />
          <SummaryCard title="Monthly Expenses" amount="$3,120.45" trend="- 4.1%" icon={Activity} color="text-blue-500" trendDown />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SummaryCard title="Total Savings" amount="$12,450" trend="+ 15.3%" icon={CreditCard} color="text-orange-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1e1f25] p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-6">Spending Analytics</h2>
            <SpendingGraph />
          </div>
          <div className="bg-[#1e1f25] p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
            <TransactionList />
          </div>
        </div>
      </div>
      <AiChat />
    </div>
  );
}
