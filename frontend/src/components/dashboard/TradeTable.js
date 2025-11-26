import { PencilIcon, TrashIcon, ChartBarIcon } from '@heroicons/react/24/outline'; // <-- CORRECTED: Single import line
import api from '../../api/axios';
import toast from 'react-hot-toast';

const TradeTable = ({ trades, onEdit, onDelete, onViewChart }) => { // <-- CORRECTED: Added onViewChart prop

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trade?')) {
      try {
        await api.delete(`/trades/${id}`); // <-- CORRECTED: Removed extra semicolon
        onDelete(id); // Notify parent to update state
      } catch (error) {
        toast.error('Failed to delete trade');
      }
    }
  };

  const getProfitLossColor = (pl) => {
    if (pl > 0) return 'text-green-500';
    if (pl < 0) return 'text-red-500';
    return 'text-gray-500 dark:text-gray-400';
  };

  const getConvictionClass = (conviction) => {
    switch (conviction) {
      case 'High': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (trades.length === 0) {
    return (
      <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No trades found.</h3>
        <p className="mt-2 text-sm text-gray-500">Click "Add Trade" to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type / Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Entry / Target</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Target P/L%</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Conviction</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th> 
            {/* <-- CORRECTED: Single "Actions" header */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {trades.map((trade) => (
            <tr key={trade._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{trade.stockName}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Qty: {trade.quantity}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  trade.tradeType === 'Buy' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {trade.tradeType}
                </span>
                <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  trade.isClosed ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                }`}>
                  {trade.isClosed ? 'Closed' : 'Open'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div>Entry: Rs {trade.entryPrice}</div>
                <div>Target: Rs {trade.targetPrice}</div>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getProfitLossColor(trade.profitLossPercent)}`}>
                {trade.profitLossPercent}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getConvictionClass(trade.conviction)}`}>
                  {trade.conviction}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(trade.createdAt).toLocaleDateString()}
              </td>
              
              {/* --- CORRECTED: All 3 buttons are now in the single, correct table cell at the end --- */}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                <button onClick={() => onViewChart(trade.stockName)} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600" title="View Chart">
                  <ChartBarIcon className="h-5 w-5" />
                </button>
                <button onClick={() => onEdit(trade)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900" title="Edit Trade">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button onClick={() => handleDelete(trade._id)} className="text-red-600 dark:text-red-400 hover:text-red-900" title="Delete Trade">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeTable;