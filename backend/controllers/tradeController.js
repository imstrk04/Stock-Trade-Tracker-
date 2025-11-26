import asyncHandler from 'express-async-handler';
import Trade from '../models/Trade.js';

// @desc    Get all trades for logged in user
// @route   GET /trades
const getTrades = asyncHandler(async (req, res) => {
  const trades = await Trade.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(trades);
});

// @desc    Create a new trade
// @route   POST /trades
const createTrade = asyncHandler(async (req, res) => {
  const { 
    stockName, 
    stockSymbol,
    entryPrice, 
    targetPrice, 
    stopLoss, 
    quantity, 
    conviction, 
    tradeType, 
    timePeriod, 
    notes 
  } = req.body;

  if (!stockName || !stockSymbol || !entryPrice || !targetPrice || !tradeType || !timePeriod) { 
    res.status(400);
    throw new Error('Please fill all required fields');
  }

  // Calculate reminderDate
  const reminderDate = new Date();
  reminderDate.setDate(reminderDate.getDate() + Number(timePeriod));

  const trade = new Trade({
    userId: req.user._id,
    stockName,
    stockSymbol,
    entryPrice,
    targetPrice,
    stopLoss,
    quantity,
    conviction,
    tradeType,
    timePeriod,
    notes,
    reminderDate,
  });

  const createdTrade = await trade.save();
  res.status(201).json(createdTrade);
});

// @desc    Update a trade
// @route   PUT /trades/:id
const updateTrade = asyncHandler(async (req, res) => {
  const trade = await Trade.findById(req.params.id);

  if (!trade) {
    res.status(404);
    throw new Error('Trade not found');
  }

  // Check if trade belongs to the user
  if (trade.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Update fields
  trade.stockName = req.body.stockName || trade.stockName;
  trade.stockSymbol = req.body.stockSymbol || trade.stockSymbol; // <--- ADDED
  trade.entryPrice = req.body.entryPrice || trade.entryPrice;
  trade.targetPrice = req.body.targetPrice || trade.targetPrice;
  trade.stopLoss = req.body.stopLoss;
  trade.quantity = req.body.quantity || trade.quantity;
  trade.conviction = req.body.conviction || trade.conviction;
  trade.tradeType = req.body.tradeType || trade.tradeType;
  trade.timePeriod = req.body.timePeriod || trade.timePeriod;
  trade.notes = req.body.notes;
  trade.isClosed = req.body.isClosed;

  // Recalculate reminderDate if timePeriod changes
  if (req.body.timePeriod) {
    const reminderDate = new Date(trade.createdAt); // Start from creation date
    reminderDate.setDate(reminderDate.getDate() + Number(req.body.timePeriod));
    trade.reminderDate = reminderDate;
    trade.reminderSent = false;
  }
  
  const updatedTrade = await trade.save();
  res.json(updatedTrade);
});

// @desc    Delete a trade
// @route   DELETE /trades/:id
const deleteTrade = asyncHandler(async (req, res) => {
  const trade = await Trade.findById(req.params.id);

  if (!trade) {
    res.status(404);
    throw new Error('Trade not found');
  }

  if (trade.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await trade.deleteOne();
  res.json({ message: 'Trade removed', id: req.params.id });
});

// @desc    Get trade summary statistics
// @route   GET /trades/summary
const getTradeSummary = asyncHandler(async (req, res) => {
  const totalTrades = await Trade.countDocuments({ userId: req.user._id });
  const activeTrades = await Trade.countDocuments({ userId: req.user._id, isClosed: false });
  const closedTrades = totalTrades - activeTrades;

  const trades = await Trade.find({ userId: req.user._id });

  const totalInvested = trades.reduce((acc, trade) => {
    if (!trade.isClosed) {
      return acc + (trade.entryPrice * (trade.quantity || 1));
    }
    return acc;
  }, 0);
  
  const totalProfitTargetSum = trades.reduce((acc, trade) => acc + trade.profitLossPercent, 0);
  const averageProfitTarget = totalTrades > 0 ? (totalProfitTargetSum / totalTrades) : 0;

  res.json({
    totalTrades,
    activeTrades,
    closedTrades,
    totalInvested: parseFloat(totalInvested.toFixed(2)),
    averageProfitTarget: parseFloat(averageProfitTarget.toFixed(2)),
  });
});

export {
  getTrades,
  createTrade,
  updateTrade,
  deleteTrade,
  getTradeSummary,
};
