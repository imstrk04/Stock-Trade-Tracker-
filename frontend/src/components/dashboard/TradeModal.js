import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../common/LoadingSpinner';

const TradeModal = ({ isOpen, onClose, trade, onSave }) => {
  const [formData, setFormData] = useState({
    stockName: '',
    stockSymbol: '', // <--- ADDED
    entryPrice: '',
    targetPrice: '',
    stopLoss: '',
    quantity: 1,
    conviction: 'Medium',
    tradeType: 'Buy',
    timePeriod: 30,
    notes: '',
    isClosed: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (trade) {
      setFormData({
        stockName: trade.stockName,
        stockSymbol: trade.stockSymbol, // <--- ADDED
        entryPrice: trade.entryPrice,
        targetPrice: trade.targetPrice,
        stopLoss: trade.stopLoss || '',
        quantity: trade.quantity,
        conviction: trade.conviction,
        tradeType: trade.tradeType,
        timePeriod: trade.timePeriod,
        notes: trade.notes || '',
        isClosed: trade.isClosed,
      });
    } else {
      // Reset for new trade
      setFormData({
        stockName: '',
        stockSymbol: '', // <--- ADDED
        entryPrice: '',
        targetPrice: '',
        stopLoss: '',
        quantity: 1,
        conviction: 'Medium',
        tradeType: 'Buy',
        timePeriod: 30,
        notes: '',
        isClosed: false,
      });
    }
  }, [trade, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // <--- ADDED stockSymbol to validation
    if (!formData.stockName || !formData.stockSymbol || !formData.entryPrice || !formData.targetPrice || !formData.timePeriod) { 
      toast.error('Please fill all required fields.');
      setLoading(false);
      return;
    }

    try {
      let response;
      if (trade) {
        // Update existing trade
        response = await api.put(`/trades/${trade._id}`, formData);
        toast.success('Trade updated!');
      } else {
        // Create new trade
        response = await api.post('/trades', formData);
        toast.success('Trade added!');
      }
      onSave(response.data); // Pass new/updated trade back to parent
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save trade');
    } finally {
      setLoading(false);
    }
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  {trade ? 'Edit Trade' : 'Add New Trade'}
                </Dialog.Title>
                
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  {/* --- MODIFIED GRID --- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="stockName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock Name*</label>
                      <input type="text" name="stockName" id="stockName" value={formData.stockName} onChange={handleChange} required
                        placeholder="e.g. Reliance Industries"
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    {/* --- NEW FIELD --- */}
                    <div>
                      <label htmlFor="stockSymbol" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock Symbol*</label>
                      <input type="text" name="stockSymbol" id="stockSymbol" value={formData.stockSymbol} onChange={handleChange} required
                        placeholder="e.g. RELIANCE.NS or AAPL"
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    {/* --- END NEW FIELD --- */}
                     <div>
                      <label htmlFor="entryPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Entry Price*</label>
                      <input type="number" name="entryPrice" id="entryPrice" value={formData.entryPrice} onChange={handleChange} required step="0.01"
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                      <label htmlFor="targetPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Target Price*</label>
                      <input type="number" name="targetPrice" id="targetPrice" value={formData.targetPrice} onChange={handleChange} required step="0.01"
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                     <div>
                      <label htmlFor="stopLoss" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stop Loss (Optional)</label>
                      <input type="number" name="stopLoss" id="stopLoss" value={formData.stopLoss} onChange={handleChange} step="0.01"
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
                      <input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} min="1"
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                      <label htmlFor="tradeType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Trade Type*</label>
                      <select name="tradeType" id="tradeType" value={formData.tradeType} onChange={handleChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>Buy</option>
                        <option>Sell</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="conviction" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Conviction</label>
                      <select name="conviction" id="conviction" value={formData.conviction} onChange={handleChange}
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="timePeriod" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time Period (Days)*</label>
                      <input type="number" name="timePeriod" id="timePeriod" value={formData.timePeriod} onChange={handleChange} required min="1"
                        className="mt-1 block w-full rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
                    <textarea name="notes" id="notes" rows="3" value={formData.notes} onChange={handleChange}
                      className="mt-1 block w-full rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                  </div>
                  {trade && (
                     <div className="flex items-center">
                      <input type="checkbox" name="isClosed" id="isClosed" checked={formData.isClosed} onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                      <label htmlFor="isClosed" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Mark as Closed</label>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      {loading ? <LoadingSpinner size="h-5 w-5" /> : (trade ? 'Update Trade' : 'Add Trade')}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TradeModal;
