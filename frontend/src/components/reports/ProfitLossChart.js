import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProfitLossChart = ({ data }) => {
  // Format data for the chart
  const chartData = data
    .filter(trade => trade.isClosed) // Only show closed trades for P/L
    .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)) // Sort by date closed
    .map(trade => ({
      date: new Date(trade.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      "Target P/L %": trade.profitLossPercent,
      // In a real app with realized P/L, you'd calculate cumulative profit here
    }));

  if (chartData.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No closed trades to display P/L history.</p>
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis dataKey="date" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" unit="%" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#F9FAFB' }}
          />
          <Legend />
          <Line type="monotone" dataKey="Target P/L %" stroke="#4F46E5" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitLossChart;