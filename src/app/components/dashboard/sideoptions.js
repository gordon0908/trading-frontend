import React from 'react';

const SideOptions = ({ platformView, tdClass, onStart, optView, optsComponent }) => {
  let viewSelect = type => optView(type);

  let html = (
              <div id="sideOptions" className={onStart? 'hide-elm' : ''}>
                  <div onClick={()=>viewSelect('charts')} className={(platformView == 'live graphs' && !tdClass && optsComponent !== 'spreads')? 'opts-button opts-active-sec' : 'opts-button'}>
                      <i className="fa fa-line-chart fix-fa" aria-hidden="true">
                      </i>
                      <p>CHARTS</p>
                  </div>
                  <div onClick={()=>viewSelect('current-bids')} className={(platformView == 'live graphs' && tdClass && optsComponent !== 'spreads')? 'opts-button opts-active-sec' : 'opts-button'}>
                      <i className="material-icons">
                          event_available
                      </i>
                      <p>Positions</p> 
                  </div>
                  <div onClick={()=>viewSelect('spreads')} className={(platformView == 'spreads' || optsComponent == 'spreads')? 'opts-button opts-active-sec' : 'opts-button'}>
                      <i className="material-icons">
                          view_list
                      </i>
                      <p>Currency</p> 
                  </div>
              </div>
  );

  return html;
};

export { SideOptions };
