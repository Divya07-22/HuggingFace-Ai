// src/components/SpendingGraph.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', spending: 4000 },
  { name: 'Tue', spending: 3000 },
  { name: 'Wed', spending: 2000 },
  { name: 'Thu', spending: 2780 },
  { name: 'Fri', spending: 1890 },
  { name: 'Sat', spending: 2390 },
  { name: 'Sun', spending: 3490 },
];

export default function SpendingGraph() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <XAxis dataKey="name" stroke="#6b7280" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
          <YAxis stroke="#6b7280" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e1f25', border: '1px solid #374151', borderRadius: '8px' }}
            itemStyle={{ color: '#f97316' }}
          />
          <Line type="monotone" dataKey="spending" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#1e1f25' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}