import React from 'react';

const TimeIntervals = props => {
  const today = new Date();
  let i = 1;
  let timeLi = [];
  while(i < 11) {
    let tm = d.getHours() + ':' + ('0' + (d.getMinutes() + i)).slice(-2);
    let cl = i === this.props.ind ? "active-t" : "";
    timeLi.push(<li key={'tm_' + i} onClick={this.timeClicked.bind(this, i)} className={cl}><span>{tm}</span><span className="ft-rt">{`${i} min`}</span></li>);
    i++;
  }
  return (
    <ul className="time-pick">
       {timeLi}
    </ul>
  )
};

export default TimeIntervals;
