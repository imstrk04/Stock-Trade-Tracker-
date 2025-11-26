import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import api from '../../api/axios';
import LoadingSpinner from '../common/LoadingSpinner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const StockChartModal = ({ isOpen, onClose, symbol }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen && symbol) {
      const fetchChartData = async () => {
        setLoading(true);
        setError(null);
        setChartData([]);
        try {
          const { data } = await api.get(`/stocks/chart/${symbol}`);
          setChartData(data);
        } catch (err) {
          setError(err.response?.data?.message || 'Could not load chart.');
        } finally {
          setLoading(false);
        }
      };
      fetchChartData();
    }
  }, [isOpen, symbol]);

  const formatXAxis = (tickItem) => {
    // Show Day and Time (e.g., "Mon 10:30")
    return new Date(tickItem).toLocaleTimeString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
  };
  
  const formatYAxis = (tickItem) => {
    return `Rs ${tickItem.toFixed(1)}`;
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  Stock Trend: {symbol?.toUpperCase()}
                </Dialog.Title>
                
                {/* --- FIX: Corrected width style here --- */}
                <div className="mt-4" style={{ width: '100%', height: 400 }}>
                  {loading && (
                    <div className="flex justify-center items-center h-full">
                      <LoadingSpinner size="h-12 w-12" />
                    </div>
                  )}
                  {error && (
                    <div className="flex flex-col justify-center items-center h-full text-red-500">
                      <p>{error}</p>
                      <p className="text-sm text-gray-500 mt-2">Try adding .NS for Indian stocks (e.g. TATASTEEL.NS)</p>
                    </div>
                  )}
                  {!loading && !error && chartData.length > 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={formatXAxis} 
                          stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                          fontSize={11}
                          tick={{ dy: 10 }}
                        />
                        <YAxis 
                          domain={['auto', 'auto']} 
                          tickFormatter={formatYAxis}
                          stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                          fontSize={11}
                        />
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                          formatter={(value) => [`Rs ${value.toFixed(2)}`, 'Price']}
                          labelFormatter={(label) => new Date(label).toLocaleString()}
                        />
                        <Area type="monotone" dataKey="price" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                  {!loading && !error && chartData.length === 0 && (
                     <div className="flex justify-center items-center h-full">
                      <p className="text-gray-500">No data available for this timeline.</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default StockChartModal;