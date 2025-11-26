import { NavLink } from 'react-router-dom';
import { ChartPieIcon, TableCellsIcon, HomeIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Trades', href: '/dashboard?view=trades', icon: TableCellsIcon }, // Example of query param
  { name: 'Reports', href: '/reports', icon: ChartPieIcon },
];

const Sidebar = () => {
  return (
    <div className="w-64 h-screen-minus-nav sticky top-16 bg-white dark:bg-gray-800 shadow-md hidden lg:block">
      <div className="flex flex-col py-6">
        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/dashboard'} // 'end' for exact match on base dashboard
              className={({ isActive }) =>
                `group flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-gray-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`
              }
            >
              <item.icon
                className="mr-3 h-6 w-6 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;