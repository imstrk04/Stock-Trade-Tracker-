import Hero from '../components/saas/Hero';
import Features from '../components/saas/Features';
import Pricing from '../components/saas/Pricing';

const LandingPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
};

export default LandingPage;