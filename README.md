# StockTrack: MERN Stack Trading Journal

StockTrack is a comprehensive SaaS-style trading journal that helps retail traders log trades, visualize market trends, and analyze their performance. Built with the MERN stack, it provides real-time charts, advanced filters, analytics, and a responsive interface with Dark Mode.

---

## Features

### Authentication

* Secure sign up and login
* JWT-based authentication using HttpOnly cookies
* Password hashing with bcryptjs

### Trade Management

* Full CRUD operations for trades
* Manual logging of trades for NSE, BSE, and US markets

### Real-time Stock Charts

* Intraday and 5-day charts using the Yahoo Finance API
* Supports symbols such as

  * RELIANCE.NS, TCS.NS (NSE)
  * AAPL, TSLA (NASDAQ)

### Analytics Dashboard

* Total investment
* Realized and unrealized profit and loss
* Win and loss ratio
* Open and closed position metrics

### Advanced Filtering

Filter trades by

* Status: Open or Closed
* Trade type: Buy or Sell
* Conviction: High, Medium, Low

### Data Export

* One-click CSV export of trade history

### Responsive UI (with Dark Mode)

* Built using Tailwind CSS and Headless UI
* Mobile friendly
* Theme toggle

### System Logging

* Winston and Morgan for request and error logging
* Useful for debugging and monitoring

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB Atlas with Mongoose
* JWT and bcryptjs
* yahoo-finance2
* Node Cron, Nodemailer
* Winston, Morgan

### Frontend

* React.js
* Tailwind CSS
* Headless UI
* React Context API
* Recharts
* Axios
* React Hot Toast

---

## Prerequisites

You need the following installed

* Node.js version 14 or higher
* Git
* MongoDB Atlas account and connection string

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/stock-trading-tracker.git
cd stock-trading-tracker
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Environment Configuration

Create a `.env` file inside the backend directory with the following content

```
NODE_ENV=development
PORT=5001

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_random_string

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
```

Note
For Gmail SMTP, generate an App Password in Google Account settings under Security.

---

## Running the Application

Open two terminals

### Terminal 1: Backend

```bash
cd backend
npm run server
```

Backend will run on [http://localhost:5001](http://localhost:5001)

### Terminal 2: Frontend

```bash
cd frontend
npm start
```

Frontend will run on [http://localhost:3000](http://localhost:3000)

---

## Usage Guide

### 1. Register or Login

Navigate to the `/auth` page and create an account.

### 2. Dashboard

View overall metrics such as total invested amount, profit or loss, and active positions.

### 3. Add Trade

Use stock symbols such as

* RELIANCE.NS
* INFY.NS
* AAPL
* TSLA

### 4. View Charts

Click the chart icon on a trade row to view recent stock movement.

### 5. Edit or Close Trade

Update entry or exit prices or mark a trade as closed.

### 6. Export Data

Click "Export CSV" to download all trade logs.

---

## Project Structure

```
/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── frontend/
    ├── public/
    └── src/
        ├── api/
        ├── components/
        ├── context/
        ├── pages/
        └── App.js
```

---

## Troubleshooting

### White screen on frontend

Check the browser console for missing imports or build errors.

### MongoDB connection issues

Verify that your current IP address is added to the MongoDB Atlas Network Access list.

### Chart not loading

Ensure the backend is running and that the correct symbol format is used.
For Indian stocks, append .NS or .BO to the symbol.

---

## License

This project is open-source and available under the MIT License.
