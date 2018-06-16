import {Canvas} from '../canvas';
import {distance} from './backgammonUtils';
import {Observable} from 'rxjs/Observable';

const calcPointsCircle = (cx, cy, rad, dashLength) => {
  let n = rad / dashLength,
    alpha = Math.PI * 2 / n,
    pointArray = [],
    i = -1;
  while (i < n) {
    const theta = alpha * i,
      theta2 = alpha * (i + 1);

    pointArray.push({
      x: (Math.cos(theta) * rad) + cx,
      y: (Math.sin(theta) * rad) + cy,
      ex: (Math.cos(theta2) * rad) + cx,
      ey: (Math.sin(theta2) * rad) + cy
    });
    i += 2;
  }

  Canvas.context.strokeStyle = 'rgb(255,255,255)';
  Canvas.context.beginPath();

  for (let p = 0; p < pointArray.length; p++) {
    Canvas.context.moveTo(pointArray[p].x, pointArray[p].y);
    Canvas.context.lineWidth = 2;
    Canvas.context.lineTo(pointArray[p].ex, pointArray[p].ey);
    Canvas.context.stroke();
  }

  Canvas.context.closePath();
};

const drawArrow = (p1, p2) => {
  Canvas.context.save();
  const dist = distance(p1[0], p2[0], p1[1], p2[1]);

  Canvas.context.beginPath();
  Canvas.context.lineWidth = 6;
  Canvas.context.strokeStyle = '#0000ff';
  Canvas.context.moveTo(p1[0], p1[1]);
  Canvas.context.lineTo(p2[0], p2[1]);
  Canvas.context.stroke();

  let angle = Math.acos((p2[1] - p1[1]) / dist);

  if (p2[0] < p1[0]) {
    angle = 2 * Math.PI - angle;
  }

  const size = 13;

  Canvas.context.beginPath();
  Canvas.context.translate(p2[0], p2[1]);
  Canvas.context.rotate(-angle);
  Canvas.context.fillStyle = '#0000ff';
  Canvas.context.lineWidth = 2;
  Canvas.context.moveTo(0, -size);
  Canvas.context.lineTo(-size, -size);
  Canvas.context.lineTo(0, 0);
  Canvas.context.lineTo(size, -size);
  Canvas.context.lineTo(0, -size);
  Canvas.context.closePath();
  Canvas.context.fill();
  Canvas.context.stroke();
  Canvas.context.restore();
};

const getCheckerSvg = (playerType) => {
  return playerType === 'Black' ? blackChecker : whiteChecker;
};

const blackChecker = `<svg width="34px" height="34px" version="1.1" viewBox="-106 -106 212 212" xmlns="http://www.w3.org/2000/svg" 
xmlns:xlink="http://www.w3.org/1999/xlink">
 <title>Green round button</title>
 <defs>
  <linearGradient id="lg" x1="1" y1="1">
   <stop offset="0" stop-color="#1eaa02"></stop>
   <stop offset="1" stop-color="#000000"></stop>
  </linearGradient>
  <linearGradient id="lgb" x1="1" y1="1">
   <stop offset="0" stop-color="#003e00"></stop>
   <stop offset="1" stop-color="#000000"></stop>
  </linearGradient>
 </defs>
  <circle r="100" fill="url(#lg)" transform="rotate(135)" stroke="url(#lgb)" stroke-width="6"></circle>
  <circle r="80" fill="url(#lg)" transform="rotate(315)" stroke="none"></circle>
</svg>`;

const whiteChecker = `<svg width="34px" height="34px" version="1.1" viewBox="-106 -106 212 212" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <title>Green round button</title>
 <defs>
  <linearGradient id="lg" x1="1" y1="1">
   <stop offset="0" stop-color="white"></stop>
   <stop offset="1" stop-color="#3333ff"></stop>
  </linearGradient>
  <linearGradient id="lgb" x1="1" y1="1">
   <stop offset="0" stop-color="white"></stop>
   <stop offset="1" stop-color="#3333ff"></stop>
  </linearGradient>
 </defs>
  <circle r="100" fill="url(#lg)" transform="rotate(135)" stroke="url(#lgb)" stroke-width="6"></circle>
  <circle r="80" fill="url(#lg)" transform="rotate(315)" stroke="none"></circle>
</svg>`;

const getDiceSvg = (diceNum) => {
  return `<svg class="dice-wrapper-${diceNum}" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512">
  <style>
    .dice{
    display: none;
    }
     .dice-wrapper-1 .dice-1, .dice-wrapper-2 .dice-2, .dice-wrapper-3 .dice-3,.dice-wrapper-4 .dice-4,.dice-wrapper-5 .dice-5,.dice-wrapper-6 .dice-6{
      display: block;
    }
  </style>
  <path d="M0 0h512v512H0z" fill="#000" fill-opacity="1"></path>
  <g class="dice dice-1" transform="translate(0,0)" style="touch-action: none;">
    <path
      d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zM256 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100z"
      fill="#fff" fill-opacity="1"></path>
  </g>

  <g class="dice dice-2" transform="translate(0,0)" style="touch-action: none;">
   <path
      d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm316.97 36.03A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm-268 268A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z"
      fill="#fff" fill-opacity="1"></path>
  </g>

  <g class="dice dice-3" transform="translate(0,0)" style="touch-action: none;">
    <path
      d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm316.97 36.03A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zM256 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100zM123.47 340.03A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z"
      fill="#fff" fill-opacity="1"></path>
  </g>

  <g class="dice dice-4" transform="translate(0,0)" style="touch-action: none;">
    <path
      d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm48.97 36.03A50 50 0 0 1 172 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm-268 268A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z"
      fill="#fff" fill-opacity="1"></path>
  </g>

  <g class="dice dice-5" transform="translate(0,0)" style="touch-action: none;">
     <path
      d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm48.97 36.03A50 50 0 0 1 172 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zM256 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100zM123.47 340.03A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z"
      fill="#fff" fill-opacity="1"></path>
  </g>

  <g class="dice dice-6" transform="translate(0,0)" style="touch-action: none;">
    <path
      d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm48.97 36.03A50 50 0 0 1 172 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zM122 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100zm268 0a50 50 0 0 1 0 100 50 50 0 0 1 0-100zM123.47 340.03A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z"
      fill="#fff" fill-opacity="1"></path>
  </g>
</svg>
`;
};


const drawBackground = (backgroundImgUrl) => {
  return Observable.create((observer) => {
    const background = new Image();
    background.src = backgroundImgUrl;
    background.onload = () => {
      Canvas.context.drawImage(background, 0, 0);
      observer.next();
      observer.complete();
    };
  });
};
export {calcPointsCircle, drawArrow, getCheckerSvg, getDiceSvg, drawBackground};
