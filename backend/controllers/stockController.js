import asyncHandler from 'express-async-handler';
import axios from 'axios';

const ALPHA_VANTAGE_API_KEY = 'YOUR_API_KEY_HERE';

// Mock data generator (from before)
const generateMockData = (symbol) => {
  const seed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const basePrice = 50 + (seed % 450);
  const now = Date.now();
  
  let currentPrice = basePrice;
  return Array.from({ length: 50 }, (_, i) => {
    const change = (Math.random() - 0.48) * currentPrice * 0.015;
    currentPrice = Math.max(1, currentPrice + change);
    return {
      date: new Date(now - (50 - i) * 15 * 60 * 1000),
      price: parseFloat(currentPrice.toFixed(2))
    };
  });
};

const getStockChartData = asyncHandler(async (req, res) => {
  let symbol = req.params.symbol.toUpperCase();

  try {
    let apiSymbol = symbol
      .replace(/\s+/g, '')
      .replace('.NS', '')
      .replace('.BO', '');
    
    const encodedSymbol = encodeURIComponent(apiSymbol);
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${encodedSymbol}&interval=5min&apikey=${ALPHA_VANTAGE_API_KEY}`;
    
    console.log(``);
    const response = await axios.get(url, { timeout: 15000 });
    const data = response.data;

    // If invalid symbol, use mock data
    if (data['Error Message']) {
      const mockData = generateMockData(symbol);
      return res.json(mockData);
    }

    // If rate limit, use mock data
    if (data['Note'] || data['Information']) {
      const mockData = generateMockData(symbol);
      return res.json(mockData);
    }

    const timeSeries = data['Time Series (5min)'];
    
    if (!timeSeries) {
      const mockData = generateMockData(symbol);
      return res.json(mockData);
    }

    // Real data found!
    const chartData = Object.entries(timeSeries)
      .slice(0, 50)
      .reverse()
      .map(([timestamp, values]) => ({
        date: new Date(timestamp),
        price: parseFloat(values['4. close'])
      }));
    res.json(chartData);

  } catch (error) {
    const mockData = generateMockData(symbol);
    res.json(mockData);
  }
});

export { getStockChartData };