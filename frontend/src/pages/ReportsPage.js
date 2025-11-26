import { useState, useEffect } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProfitLossChart from '../components/reports/ProfitLossChart';
import TradeTypeChart from '../components/reports/TradeTypeChart';
import ConvictionChart from '../components/reports/ConvictionChart';

const ReportsPage = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const { data } = await api.get('/trades');
        setTrades(data);
      } catch (error) {
        console.error("Failed to fetch trades for reports", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrades();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner size="h-12 w-12" />
      </div>
    );
  }
  
  if (trades.length === 0) {
     return (
       <>
        <h1 className="text-3xl font-bold mb-6">Analytics & Reports</h1>
        <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No data to report.</h3>
          <p className="mt-2 text-sm text-gray-500">Add some trades to see your analytics!</p>
        </div>
       </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Analytics & Reports</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit/Loss Over Time */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Profit/Loss Target Over Time</h3>
          <ProfitLossChart data={trades} />
        </div>

        {/* Trade Type Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Trade Type Distribution</h3>
          <TradeTypeChart data={trades} />
        </div>

        {/* Conviction Heatmap (as Bar Chart) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Trade Conviction</h3>
          <ConvictionChart data={trades} />
        </div>
      </div>
    </>
  );
};

export default ReportsPage;