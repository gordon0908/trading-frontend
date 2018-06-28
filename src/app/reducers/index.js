import { combineReducers } from 'redux';

import { realtimeReducer } from './realtime';
import { tradeReducer } from './trade';

export default combineReducers({
  realtime: realtimeReducer,
  trade: tradeReducer
});
