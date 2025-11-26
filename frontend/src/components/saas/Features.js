import { CheckBadgeIcon, ChartBarIcon, BellAlertIcon, TableCellsIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Manual Trade Tracking',
    description: 'Log every detail of your trades, including entry, target, stop-loss, and your conviction level.',
    icon: TableCellsIcon,
  },
  {
    name: 'Insightful Analytics',
    description: 'Visualize your performance with clean charts. See your P/L over time, conviction success, and more.',
    icon: ChartBarIcon,
  },
  {
    name: 'Smart Reminders',
    description: 'Set a time period for your trade and receive an email reminder to review your position.',
    icon: BellAlertIcon,
  },
  {
    name: 'Export Your Data',
    description: 'Easily export your entire trade history to CSV for your personal records or advanced analysis.',
    icon: CheckBadgeIcon,
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to trade smarter
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Our platform is built to be simple, clean, and powerful.
          </p>
        </div>

        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;