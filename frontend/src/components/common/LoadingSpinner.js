import { ArrowPathIcon } from '@heroicons/react/24/outline';

const LoadingSpinner = ({ size = 'h-8 w-8' }) => {
  return (
    <ArrowPathIcon className={`${size} animate-spin text-indigo-600 dark:text-indigo-400`} />
  );
};

export default LoadingSpinner;