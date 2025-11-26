import cron from 'node-cron';
import Trade from '../models/Trade.js';
import User from '../models/User.js';
import sendEmail from './email.js';

const checkTradeReminders = async () => {
  console.log('Running daily reminder check...');
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of the day

  try {
    const tradesToRemind = await Trade.find({
      isClosed: false,
      reminderSent: false,
      reminderDate: { $lte: new Date() } 
    }).populate('userId', 'email name');

    if (tradesToRemind.length === 0) {
      console.log('No reminders to send today.');
      return;
    }

    for (const trade of tradesToRemind) {
      if (trade.userId) {
        const user = trade.userId;
        const subject = `Trade Reminder: ${trade.stockName}`;
        const message = `
          <p>Hi ${user.name},</p>
          <p>This is a reminder for your <b>${trade.tradeType}</b> trade on <b>${trade.stockName}</b>.</p>
          <p>Your holding period of ${trade.timePeriod} days has ended.</p>
          <p><b>Entry:</b> ${trade.entryPrice}</p>
          <p><b>Target:</b> ${trade.targetPrice}</p>
          <p>Please review your position in the dashboard.</p>
          <br>
          <p>Best, <br>The Stock Tracker Team</p>
        `;

        await sendEmail(user.email, subject, message);

        trade.reminderSent = true;
        await trade.save();
      }
    }
  } catch (error) {
    console.error('Error in cron job:', error);
  }
};

// Schedule to run once every day at 8:00 AM
const startCronJobs = () => {
  cron.schedule('0 8 * * *', () => {
    checkTradeReminders();
  }, {
    timezone: "Asia/Kolkata" 
  });
};

export { startCronJobs };