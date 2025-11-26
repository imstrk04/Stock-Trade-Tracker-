import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TradeTypeChart = ({ data }) => {
  const buyTrades = data.filter(t => t.tradeType === 'Buy').length;
  const sellTrades = data.filter(t => t.tradeType === 'Sell').length;

  const chartData = [
    { name: 'Buy Trades', value: buyTrades },
    { name: 'Sell Trades', value: sellTrades },
  ];

  const COLORS = ['#34D399', '#F87171']; // Green for Buy, Red for Sell

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
            itemStyle={{ color: '#F9FAFB' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TradeTypeChart;