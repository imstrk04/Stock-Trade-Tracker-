import { CheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <div className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Get started for free. No credit card required.
          </p>
        </div>

        <div className="mt-16 max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
          <div className="flex-1 bg-white dark:bg-gray-800 px-6 py-8 lg:p-12">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">Free Plan</h3>
            <p className="mt-6 text-base text-gray-500 dark:text-gray-300">
              Perfect for hobbyists and new traders who want to get serious about tracking their performance.
            </p>
            <div className="mt-8">
              <div className="flex items-center">
                <h4 className="flex-shrink-0 pr-4 bg-white dark:bg-gray-800 text-sm tracking-wider font-semibold uppercase text-indigo-600 dark:text-indigo-400">
                  What's included
                </h4>
                <div className="flex-1 border-t border-gray-200 dark:border-gray-600" />
              </div>
              <ul role="list" className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                {[
                  'Unlimited Trade Tracking',
                  'Performance Analytics',
                  'Email Reminders',
                  'CSV Data Export',
                  'Dark Mode',
                ].map((feature) => (
                  <li key={feature} className="flex items-start lg:col-span-1">
                    <div className="flex-shrink-0">
                      <CheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700 dark:text-gray-200">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="py-8 px-6 text-center bg-gray-50 dark:bg-gray-700 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
            <p className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Get started today</p>
            <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900 dark:text-white">
  <span>Rs 0</span>
  <span className="ml-3 text-xl font-medium text-gray-500 dark:text-gray-300">/ mo</span>
</div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">It's free forever.</p>
            <div className="mt-6">
              <Link
                to="/auth?mode=signup"
                className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;