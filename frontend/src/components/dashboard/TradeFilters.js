import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { ChartBarIcon, BeakerIcon, ArchiveBoxIcon, BanknotesIcon, ScaleIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '../common/LoadingSpinner';

// Skeleton loader component
const StatCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 animate-pulse">
    <div className="h-6 w-6 rounded-md bg-gray-200 dark:bg-gray-700"></div>
    <div className="mt-4 h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
    <div className="mt-2 h-7 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
  </div>
);

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
    <div className={`flex items-center justify-center h-12 w-12 rounded-md ${color} text-white`}>
      <Icon className="h-6 w-6" />
    </div>
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
      <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);


const SummaryStats = ({ refreshTrigger }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/trades/summary');
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch summary", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [refreshTrigger]); // Refreshes when `trades` state changes in parent

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }

  const { totalTrades, activeTrades, closedTrades, totalInvested, averageProfitTarget } = stats;

  const summaryData = [
    { title: 'Total Trades', value: totalTrades, icon: ChartBarIcon, color: 'bg-indigo-500' },
    { title: 'Active Trades', value: activeTrades, icon: BeakerIcon, color: 'bg-green-500' },
    { title: 'Closed Trades', value: closedTrades, icon: ArchiveBoxIcon, color: 'bg-gray-500' },
    { title: 'Total Invested', value: `₹ ${totalInvested.toLocaleString()}`, icon: BanknotesIcon, color: 'bg-blue-500' },
    { title: 'Avg. Profit Target', value: `${averageProfitTarget}%`, icon: ScaleIcon, color: 'bg-yellow-500' },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {summaryData.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </div>
  );
};

export default SummaryStats;