import Canvas2DContext from './canvas2dContext';

const checktime = num => (num>9)? num : `0${num}`;

const Clock = () => {
  let inView = true;
  const timer = ctxId => {
    
    const ctxDom = document.getElementById(ctxId);

    let ctx = Canvas2DContext(ctxDom);
    const startTime = () => {
      if (inView) {
        let today = new Date();
        let hour = checktime(today.getHours());
        let minu = checktime(today.getMinutes());
        let secd = checktime(today.getSeconds());
        let timeString = `${hour}:${minu}:${secd}`;
        ctx.clearRect(0, 0, 66, 20)
           .font('16px bold sans-serif')
           .textAlign('center')
           .fillStyle('white')
           .fillText(timeString, 34, 16);
      }
      setTimeout(startTime, 500);
    };

    return startTime;
  }

  return {
    setClock: timer,
    inView: () => inView = true,
    getView: () => inView,
    outView: () => inView = false
  }
};

export default Clock();
