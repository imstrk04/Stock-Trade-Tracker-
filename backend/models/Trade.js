import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  stockName: { type: String, required: true, trim: true }, // e.g., "Reliance Industries"
  stockSymbol: { type: String, required: true, trim: true }, // e.g., "RELIANCE.NS"
  entryPrice: { type: Number, required: true },
  targetPrice: { type: Number, required: true },
  stopLoss: Number,
  quantity: { type: Number, default: 1 },
  conviction: { 
    type: String, 
    enum: ['High', 'Medium', 'Low'], 
    default: 'Medium' 
  },
  tradeType: { 
    type: String, 
    enum: ['Buy', 'Sell'], 
    required: true 
  },
  timePeriod: { type: Number, required: true }, // in days
  reminderDate: Date,
  notes: String,
  isClosed: { type: Boolean, default: false },
  reminderSent: { type: Boolean, default: false }, 
}, { 
  timestamps: true,
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true } 
});

// Virtual property for Profit/Loss Percentage (no change here)
tradeSchema.virtual('profitLossPercent').get(function() {
  if (this.entryPrice === 0) return 0;
  
  let profit;
  if (this.tradeType === 'Buy') {
    profit = ((this.targetPrice - this.entryPrice) / this.entryPrice) * 100;
  } else { // 'Sell' or short
    profit = ((this.entryPrice - this.targetPrice) / this.entryPrice) * 100;
  }
  return parseFloat(profit.toFixed(2));
});

const Trade = mongoose.model('Trade', tradeSchema);
export default Trade;
