import { 
  FETCH_TRADES,
  FETCH_TRADES_REJECTED,
  FETCH_TRADES_FULFILLED,
  DEPOSIT_CHANGE,
  ADD_TRADE,
  TRADE_COMPLETE,
  ADD_MONEY
} from '../constants/types';


const pastTrades = [{
  position: "GOOG",
  volume: 120,
  date: new Date().toDateString(),
  short: false,
  pricestart: 776.15,
  priceend: 776.95
}, {
  position: "YHOO",
  volume: 45,
  date: new Date().toDateString(),
  short: false,
  pricestart: 38.19,
  priceend: 38.80
}, {
  position: "APPL",
  volume: 10,
  date: new Date().toDateString(),
  short: false,
  pricestart: 121,
  priceend: 88
}, {
  position: "MSFT",
  volume: 95,
  date: new Date().toDateString(),
  short: false,
  pricestart: 61.79,
  priceend: 61.52
}, {
  position: "GBP/USD",
  volume: 80,
  date: new Date().toDateString(),
  short: false,
  pricestart: 1.327,
  priceend: 1.3272
},
{
  position: "AUD/JPY",
  volume: 20,
  date: new Date().toDateString(),
  short: false,
  pricestart: 82.21,
  priceend: 81.94
}, {
  position: "AMZN",
  volume: 200,
  date: new Date().toDateString(),
  short: false,
  pricestart: 751.77,
  priceend: 750.77
}

];

const initState = {
  pastTrades: pastTrades,
  currentPos: [],
  todayTradeCount: 0,
  weeklyTradeCount: 0,
  netPosTrades: 0,
  totalVolume: 0,
  netNegTrades: 0,
  totalRev: 0,
  todayTotalNet: 0.0,
  moneyAvaliable: 0.0,
  fetching: false,
  fetched: false,
  deposit: 2500,
  error: null,
};

const tradeReducer = (state = initState, action) => {
  switch(action.type) {
    case ADD_TRADE:
      let { deposit, weeklyTradeCount, todayTradeCount, currentPos } = action.payload;
      return {...state, deposit, weeklyTradeCount, todayTradeCount, currentPos };

    default:
      return state;
  }
}

export { tradeReducer };
