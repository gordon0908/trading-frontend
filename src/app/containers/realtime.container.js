import React, { Component } from 'react';
import { connect } from 'react-redux';

import { connectSocket, addChart, feedStart, changeOptsView, closeChart } from '../actions/realtime';
import { addTrade } from '../actions/trade';

import OpenWebsocket from "../components/data/gowebsocket";
import CtxChart from '../components/canvas/ctxChart';
import { CanvasChart } from '../components/dashboard/livegraph/canvaschart';
import { SideOptions } from '../components/dashboard/sideoptions';

import { Spinner } from '../components/loaders/spinner';
import { LiveStart } from '../components/micro/liveStart';
import Clock from '../components/canvas/clock';
import ActiveSpreads from "../components/dashboard/partialview/activespreads";
import WatchedSpreads from "../components/dashboard/partialview/watchedspreads";

const PositionTiles = require('../components/canvas/positionTile');
const spreadCTX = require('../components/canvas/spreadCTX'); 
const CardCtx = require('../components/canvas/cardctx');
const statSVGs = require('../components/svg/statSVG.js');

const chartContainers = (charts) => {
  let chartsLen = charts.length;
  return charts.map((itm, i) => {
    let clName =  (chartsLen === 4) ? "chart-box-50 td-reduce col-sm-6 fade-in-fast" : "chart-box-100 col-sm-12 fade-in-fast";
    if (chartsLen === 2) {
      clName = "chart-box-50 col-sm-12 fade-in-fast"
    }
    if (chartsLen === 3) {
      clName  = i === 2 ?  "chart-box-50 col-sm-12 fade-in-fast" : "chart-box-50 td-reduce col-sm-6 fade-in-fast";
    }
    return <div key={itm.keyy} className={clName}>  {itm.component}  </div>; 
  });
};

class RealtimeContainer extends Component {
  constructor() {
    super(...arguments);

    this.tradePostions = {};
    this.dbSource = OpenWebsocket();
    this.mainChart = null;
    this.spreadRef = null;
    this.cardCtx = CardCtx();
    this.SvgCB = statSVGs();

    this.liveFeedStarted = this.liveFeedStarted.bind(this);

    this.addNewChart = this.addNewChart.bind(this);
    this.newPos = this.newPos.bind(this);
    this.tradeExpired = this.tradeExpired.bind(this);
    this.depositChanged = this.depositChanged.bind(this);
    this.closeCrt = this.closeCrt.bind(this);
    this.canvasPlaced = this.canvasPlaced.bind(this);
    this.setSpreadRef = this.setSpreadRef.bind(this);
    this.wbClosed = this.wbClosed.bind(this);
    

    this.dbSource.on.liveFeedStarted = (details) => this.liveFeedStarted(details);
    this.dbSource.onclose = (event) => this.wbClosed(event);
  }
  wbClosed (event) {
    this.props.connectSocket(false);
  }
  setSpreadRef (spreadCntrl) {
    this.spreadRef = spreadCntrl;
   }
  liveFeedStarted(symbFeed) {
    let seriesWatch = this.props.realtime.seriesWatch;
    seriesWatch.push(symbFeed);

    this.props.feedStart(seriesWatch, true);
  }
  componentDidMount() {
    this.dbSource.onopen = event => {
      this.props.connectSocket(true);
    };
  }
  componentWillMount() {
    if(this.dbSource.readyState === "OPEN"){
      this.props.connectSocket(false);
     }  
  }
  addNewChart(symb){
    let stateRT = Object.assign({}, this.props.realtime);
    let { chartlist } = stateRT;
    let keyy = symb + '_canvas';
    stateRT.chartPositions[symb] = { trades: [], position: [], total: 0.0, current: 0.0 };

    let newCTX = {
      symb, 
      keyy,
      component: <CanvasChart 
                    newPos={this.newPos}
                    depChg={this.depositChanged}
                    ctx={CtxChart.passCTXconstructor.bind(this)} 
                    clock={Clock}
                    positions={stateRT.chartPositions[symb]}
                    clCtx={this.closeCrt}
                    dataSource={this.dbSource}
                    mainSym={symb}
                    whenMounted={this.canvasPlaced} />
    };

    stateRT.chartList.push(newCTX);
    stateRT.totalCharts = this.props.realtime.totalCharts;
    stateRT['onStart'] = (stateRT.totalCharts > 0)? true : false;
    stateRT['addButton'] = true;
    stateRT['newSet'] = null;
    stateRT['chartAddOpen'] = false;

    this.props.addChart(stateRT);
  }

  canvasPlaced(newSymb) {
    this.tradePostions = Object.assign({}, newSymb, newSymb);
  }
  tradeExpired(pos){
    // missing
  }
  depositChanged(amt){
    // missing
  }
  closeCrt(chrtSym){
    let {chartList, totalCharts} = this.props.realtime;
    let stateSwitch = Object.assign({},this.props.realtime);
    let newChartTotal = totalCharts - 1;

    stateSwitch.chartList = chartList.filter((itm, i) => itm.symb !== chrtSym);
    stateSwitch['totalCharts'] = newChartTotal;
 
    stateSwitch['newSet'] = newChartTotal > 0 ? null : <LiveStart startChart={this.addNewChart.bind(this)} />;
    stateSwitch['platformView'] = "live graphs";

    this.props.closeChart(stateSwitch);
  }
  newPos(pos) {
    let { deposit, currentPos, weeklyTradeCount, todayTradeCount } = this.props.trade;
    let newCurrentPos = [pos].concat(currentPos);

    let newAmount = deposit - Math.round(pos.unitPrice * pos.qty);

    this.tradePostions[pos.symb].open[pos.posId] = pos;
  
    let posCTXcntrl = this.tradePostions[pos.symb].ctxChart;
    posCTXcntrl.addNewPos(pos);

    this.props.addTrade(newCurrentPos, weeklyTradeCount + 1, todayTradeCount + 1, newAmount);

    (function(pos){
      let self = this;
    
      let timeOut = 60000 * pos.time;
    
      setTimeout(function(){
        self.tradeExpired(pos);
       }, timeOut);
    }).call(this, pos);
  }
  optView(type) {
    let currentClass =  "half-view";
    let dashview = this.props.realtime.platformView;
    let { optsComponent, tradViewClass } = this.props.realtime;
    switch (type) {
      case "spreads":
        this.spreadRef.setting(type);
        currentClass =  this.props.realtime.optsComponent === "current-bids" ? "half-view"  : (this.props.realtime.tradViewClass === "full-view" ? "half-view" : "full-view");
        currentClass === "half-view" ? this.spreadRef.inView() : this.spreadRef.outView();
        // PositionTiles.outView();

        break;

      case "current-bids": 
        currentClass =  this.props.realtime.optsComponent === "spreads" ? "half-view"  : (this.props.realtime.tradViewClass === "full-view" ? "half-view" : "full-view");
        currentClass === "half-view" ?  PositionTiles.inView() : PositionTiles.outView();
        this.spreadRef.outView();
        break;

      case "charts": 
        currentClass =  "full-view";
        this.spreadRef.outView(); 
        this.cardCtx.outView();
        Clock.inView();
        PositionTiles.outView();
        CtxChart.backInView();
        this.SvgCB.inViewBool = false;
        dashview = "live graphs";
        break;

    }

    this.props.changeOptsView(currentClass, type, dashview);
  }
  render() {
    let { connected, onStart, addButton, platformView, tradViewClass, chartList , optsComponent, newSet } = this.props.realtime;
    let onlineStatus= connected? 'Connected' : 'Not Connected';
    let tdClass = tradViewClass === "half-view";
    let blockStart = onStart? <LiveStart startChart={this.addNewChart.bind(this)}/> : null;
    let blocked = connected? blockStart : <Spinner />;
    let allCharts = chartList.length ? chartContainers(chartList) : null;

    return (
      <div >
        <div id="rtTopNavUI">
          <div className="fake-logo">
              <span>
                <i className="material-icons">language</i>
              </span>
              <span className="span-two">
                Trading Simulator
              </span>
            </div>

            <div id="chartAdOptions" className="hide-elm">
              <div className="hide-elm">
                <h3>You can only have 4 charts at a time</h3>
              </div>

              <div className="hide-elm">
                <div className="column-tow type-nav">
                  <strong>Market</strong>
                  <ul>
                    <li>Stocks</li>
                    <li>Forex</li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="connectedState">
              <div className={connected? 'online-state online' : 'online-state offlive'}></div>
              <span>{onlineStatus}</span>
            </div>

        </div>


        <div id="scorePoints" className={platformView==='full-view'? '':'hide-elm'}>
          <span className="count span-green total-earnings">
            <canvas id="totalCount" height={40} width={100}></canvas>
          </span>
          <span className="deposit-span">Deposit</span>           
        </div>


        <section id="realTimeTheme">
         {blocked}
        
          <SideOptions 
            platformView={platformView} 
            optsComponent={optsComponent} 
            tdClass={tdClass} 
            onStart={onStart} 
            optView={this.optView.bind(this)}
            />

          <section id="optionsView" className={onStart? "hide-elm":"ok"}>
            <div className={optsComponent === "spreads"? "in-view-opts":"hide-elm"}>
              <ActiveSpreads setSpreadRef={this.setSpreadRef.bind(this)}  callCT={spreadCTX} dataSource={this.dbSource} />
            </div>

            <div className={optsComponent === "current-bids" ? "in-view-opts" : "hide-elm"}>
              <WatchedSpreads PositionTiles={PositionTiles} activePosList={this.props.trade.currentPos} />
            </div>
          </section>    

          <section id="tradingplatform" className={onStart ? "hide-elm"  :  tradViewClass}>
            <div className={platformView === "live graphs" ? "wrap-block" : "hide-elm"}>
              {newSet}
              {allCharts}
            </div>
          </section>

        </section>



      </div>
    )
  }
}

const mapStateToProps = state => ({ realtime: state.realtime, trade: state.trade });

export default connect(mapStateToProps, { connectSocket, addTrade, addChart, feedStart, changeOptsView, closeChart })(RealtimeContainer);
