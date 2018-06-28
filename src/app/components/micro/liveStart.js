import React, { Component } from 'react';
import { NyseOptions, NasdaqOptions } from '../utils/symbOptions';

class LiveStart extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      exchange: 'NASDAQ'
    };
    this.onChange = this.onChange.bind(this);
    this.onStart = this.onStart.bind(this);
  }
  onChange(e) {
    this.setState({ exchange: e.target.value });
  }
  onStart() {
    this.props.startChart(this.refs.symb.value);
  }
  render() {
    return (
      <div className="container">
        <div className="chart-controller chart-live-cntrl live-set">
            <div className="select-holders spred-m">
                <select className="symbol-pick live-sym" ref="symb">
                    {this.state.exchange=='NASDAQ'? NasdaqOptions() : NyseOptions()}
                </select>
            </div>

            <div className="select-holders spread-m">
              <strong>Exchange:</strong>  
              <select className="symbol-pick live-sym" onChange={this.onChange}>
                <option key='NASDAQ-2' value="NASDAQ">NASDAQ</option>
                <option key='NYSE-2' value="NYSE">NYSE</option>
              </select>
            </div>

        </div>  


        <div className="row text-center">
          <div className="big-butt cool-button" onClick={this.onStart}>Start Live Feed</div>
        </div>
      </div>
    );
  }
};

export { LiveStart };
