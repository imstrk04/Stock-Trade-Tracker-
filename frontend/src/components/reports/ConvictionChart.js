import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ConvictionChart = ({ data }) => {
  const high = data.filter(t => t.conviction === 'High').length;
  const medium = data.filter(t => t.conviction === 'Medium').length;
  const low = data.filter(t => t.conviction === 'Low').length;

  const chartData = [
    { name: 'High', Trades: high, fill: '#10B981' },
    { name: 'Medium', Trades: medium, fill: '#F59E0B' },
    { name: 'Low', Trades: low, fill: '#EF4444' },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#F9FAFB' }}
            itemStyle={{ color: '#F9FAFB' }}
          />
          <Legend />
          <Bar dataKey="Trades" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConvictionChart;