import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import api from '../api/axios';
import toast from 'react-hot-toast';
import { PlusIcon, ArrowDownOnSquareIcon } from '@heroicons/react/24/solid';
import Papa from 'papaparse';

// Import Components
import SummaryStats from '../components/dashboard/SummaryStats';
import TradeFilters from '../components/dashboard/TradeFilters';
import TradeTable from '../components/dashboard/TradeTable';
import TradeModal from '../components/dashboard/TradeModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StockChartModal from '../components/dashboard/StockChartModal';

const DashboardPage = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState(null);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false); 
  const [chartSymbol, setChartSymbol] = useState(null); 

  const [searchParams] = useSearchParams(); 
  const currentView = searchParams.get('view'); 

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    conviction: 'All',
    type: 'All',
  });
  
  // Fetch trades
  const fetchTrades = async () => {
    try {
      const { data } = await api.get('/trades');
      setTrades(data);
    } catch (error) {
      toast.error('Failed to fetch trades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  // Filtering Logic
  const filteredTrades = useMemo(() => {
    return trades
      .filter(trade => 
        trade.stockName.toLowerCase().includes(filters.search.toLowerCase())
      )
      .filter(trade => 
        filters.status === 'All' ? true : 
        filters.status === 'Open' ? !trade.isClosed : trade.isClosed
      )
      .filter(trade => 
        filters.conviction === 'All' ? true : trade.conviction === filters.conviction
      )
      .filter(trade => 
        filters.type === 'All' ? true : trade.tradeType === filters.type
      );
  }, [trades, filters]);

  // Modal Handlers
  const openAddModal = () => {
    setEditingTrade(null);
    setIsModalOpen(true);
  };

  const openEditModal = (trade) => {
    setEditingTrade(trade);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTrade(null);
  };
  
  const openChartModal = (symbol) => {
    setChartSymbol(symbol);
    setIsChartModalOpen(true);
  };

  const closeChartModal = () => {
    setIsChartModalOpen(false);
    setChartSymbol(null);
  };

  // CRUD Operations
  const handleSaveTrade = (savedTrade) => {
    if (editingTrade) {
      // Update
      setTrades(trades.map(t => (t._id === savedTrade._id ? savedTrade : t)));
    } else {
      // Create
      setTrades([savedTrade, ...trades]);
    }
    closeModal();
  };

  const handleDeleteTrade = (deletedId) => {
    setTrades(trades.filter(t => t._id !== deletedId));
    toast.success('Trade deleted');
  };

  // CSV Export
  const handleExport = () => {
    const dataToExport = filteredTrades.map(t => ({
      Stock: t.stockName,
      Symbol: t.stockSymbol,
      Type: t.tradeType,
      Status: t.isClosed ? 'Closed' : 'Open',
      Entry: t.entryPrice,
      Target: t.targetPrice,
      StopLoss: t.stopLoss,
      Quantity: t.quantity,
      Conviction: t.conviction,
      "Target P/L %": t.profitLossPercent,
      Created: new Date(t.createdAt).toLocaleDateString(),
    }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'trades.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* --- Title --- */}
      <h1 className="text-3xl font-bold mb-6">
        {currentView === 'trades' ? 'My Trades' : 'Dashboard Overview'}
      </h1>
      
      {/* --- Summary Stats (Show only on Dashboard Overview) --- */}
      {currentView !== 'trades' && (
        <SummaryStats refreshTrigger={trades} />
      )}

      {/* --- THIS IS THE MODIFIED SECTION ---
        The filters and buttons are now in their own div,
        and the duplicate SummaryStats is GONE.
      */}
      <div className="my-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <TradeFilters filters={filters} setFilters={setFilters} />
          <div className="flex space-x-3">
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <ArrowDownOnSquareIcon className="h-5 w-5 mr-2" />
              Export CSV
            </button>
            <button
              onClick={openAddModal}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Trade
            </button>
          </div>
        </div>
      </div>
      {/* --- END OF MODIFIED SECTION --- */}


      {/* Trades Table */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <LoadingSpinner size="h-12 w-12" />
        </div>
      ) : (
        <TradeTable 
          trades={filteredTrades} 
          onEdit={openEditModal}
          onDelete={handleDeleteTrade}
          onViewChart={openChartModal}
        />
      )}

      {/* Add/Edit Modal */}
      <TradeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        trade={editingTrade}
        onSave={handleSaveTrade}
      />

      {/* Stock Chart Modal */}
      <StockChartModal
        isOpen={isChartModalOpen}
        onClose={closeChartModal}
        symbol={chartSymbol}
      />
    </>
  );
};

export default DashboardPage;