// src/components/SummaryCard.jsx
export default function SummaryCard({ title, amount, trend, icon: Icon, color, trendDown }) {
  return (
    <div className="bg-[#1e1f25] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between h-40">
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-lg border border-gray-700 ${color} bg-gray-800/50`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-md bg-opacity-10 ${trendDown ? 'text-red-400 bg-red-400/10' : 'text-emerald-400 bg-emerald-400/10'}`}>
          {trendDown ? '↘' : '↗'} {trend.replace(/[+-]\s/, '')}
        </span>
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{amount}</h3>
      </div>
    </div>
  );
}