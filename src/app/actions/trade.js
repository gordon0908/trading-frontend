import { 
  FETCH_TRADES,
  FETCH_TRADES_REJECTED,
  FETCH_TRADES_FULFILLED,
  DEPOSIT_CHANGE,
  ADD_TRADE,
  TRADE_COMPLETE,
  ADD_MONEY,
  GOT_MESSAGE,
  FETCH_TRADE_DATA
} from '../constants/types';

export const addTrade = (currentPos =  {}, weeklyTradeCount = 0, todayTradeCount = 0, deposit = 0) => dispatch => {
  return dispatch({
    type: ADD_TRADE, payload: { currentPos, weeklyTradeCount, todayTradeCount, deposit }
  });
}
