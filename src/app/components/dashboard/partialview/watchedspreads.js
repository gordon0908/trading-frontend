import React, { Component } from 'react';

import PositionTile from "./positionTiles";


const currentBlocks = (currentPos, posCTX) => {
  let list = currentPos.map((itm, i) => {
    let keyy = itm.ctxid + '_' + itm.type 
    return <PositionTile key={keyy} posTileCTX={posCTX}  pos={itm} />;
  });
  return (<ul className="pos-blocks">{list}</ul>)
}

export default class WatchedSpreads extends React.Component {
	render() { 
    const {activePosList, PositionTiles} = this.props;
    const posList = activePosList.length>0? currentBlocks(activePosList, PositionTiles) : <div className="no-positions">No Active Positions</div> ;

    return (   
      <div className="active-spreads watched-spreads">
    			{posList}
      </div>
    )
	}
};
