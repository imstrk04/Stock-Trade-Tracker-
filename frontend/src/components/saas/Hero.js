import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="text-center py-24 px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
        Track Your Trades, Master Your Strategy.
      </h1>
      <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Stop guessing. Start tracking. Our platform helps you manually log every trade,
        set reminders, and visualize your performance with powerful analytics.
      </p>
      <div className="mt-10">
        <Link
          to="/auth?mode=signup"
          className="px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Get Started For Free
        </Link>
      </div>
    </div>
  );
};

export default Hero;