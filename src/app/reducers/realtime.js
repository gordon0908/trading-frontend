import { 
  REAL_TIME_CONNECT,
  ADD_CHART,
  OPTS_VIEW,
  FEED_START,
  CLOSE_CHART
} from '../constants/types';

const initialState = {
  onStart: true,
  chartPositions: {},
  chartAddOpen: false,
  selectUl: "forex",
  totalCharts: 0,
  addButton: false,
  optsComponent: null,
  newSet: null,
  chartList: [],
  platformView: "live graphs",
  tradViewClass: "full-view",
  connected: false,
  seriesWatch: [] 
}

export const realtimeReducer = (state = initialState, action) => {
  switch(action.type) {
    case REAL_TIME_CONNECT:
      return {...state, connected: action.payload};

    case ADD_CHART:
      return action.payload;

    case OPTS_VIEW:
      let { tradViewClass, optsComponent, platformView } = action.payload;
      return {
        ...state, 
        tradViewClass,
        optsComponent,
        platformView
      }

    case FEED_START: 
        return {...state, seriesWatch: action.payload.seriesWatch, addButton: action.payload.addButton}


    case CLOSE_CHART: 
        return action.payload;
        
    default:
      return state;
  };  
};
