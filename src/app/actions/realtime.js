import { 
  FETCH_TRADES,
  FETCH_TRADES_REJECTED,
  FETCH_TRADES_FULFILLED,
  DEPOSIT_CHANGE,
  ADD_TRADE,
  TRADE_COMPLETE,
  ADD_MONEY,
  ADD_CHART,
  OPTS_VIEW,
  FEED_START,
  REAL_TIME_CONNECT,
  CLOSE_CHART
} from '../constants/types';

export const connectSocket = (connected = false) => dispatch => dispatch({ type: REAL_TIME_CONNECT, payload: connected });

export const addChart = data => dispatch => dispatch({ type: ADD_CHART, payload: data });

export const changeOptsView = (tradViewClass, optsComponent, platformView) => dispatch => dispatch({ type: OPTS_VIEW, payload: {tradViewClass, optsComponent, platformView
}});

export const feedStart = (seriesWatch, addButton) => dispatch => {
  return dispatch({
    type: FEED_START,
    payload: {
      seriesWatch,
      addButton
    }
  })
}

export const closeChart = data => dispatch => dispatch({ type: CLOSE_CHART, payload: data });