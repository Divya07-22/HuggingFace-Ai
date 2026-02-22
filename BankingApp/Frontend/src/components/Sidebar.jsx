// src/components/Sidebar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { Home, BarChart2, CreditCard, PieChart, User, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="w-64 bg-[#15161c] h-full p-6 flex flex-col border-r border-gray-800">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
        <span className="text-xl font-bold tracking-wide">Kodbank</span>
      </div>
      
      <nav className="flex-1 space-y-2">
        <div className="flex items-center gap-3 bg-[#2a2b32] text-orange-500 px-4 py-3 rounded-xl cursor-pointer border border-gray-700">
          <Home className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#2a2b32] transition">
          <BarChart2 className="w-5 h-5" />
          <span>Analytics</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#2a2b32] transition">
          <CreditCard className="w-5 h-5" />
          <span>Cards</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#2a2b32] transition">
          <PieChart className="w-5 h-5" />
          <span>Assets</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#2a2b32] transition">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </div>
      </nav>

      <div className="space-y-2 mt-auto">
        <div className="flex items-center gap-3 text-gray-400 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#2a2b32] transition">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </div>
        <div onClick={() => navigate('/login')} className="flex items-center gap-3 text-gray-400 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#2a2b32] transition">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}