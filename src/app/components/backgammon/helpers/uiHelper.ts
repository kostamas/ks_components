import {Canvas} from '../canvas';
import {distance} from './backgammonUtils';
import {Observable} from 'rxjs/Observable';


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

const getRollDiceSvg = () => {
  return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 511.653 511.653" style="enable-background:new 0 0 511.653 511.653;" xml:space="preserve" width="42px" height="42px">
<g transform="translate(1 1)">
	<g>
		<g>
			<path d="M505.88,305.173c-15.36-20.48-30.72-20.48-68.267-0.853l-73.387,45.227c-10.24,5.973-33.28,7.68-54.613,7.68     c4.267-7.68,2.56-17.067-5.12-28.16c-5.596-8.045-12.772-14.796-20.993-19.967l56.833-56.833c3.413-3.413,3.413-8.533,0-11.947     l-96.427-96.427c-3.413-3.413-8.533-3.413-11.947,0l-96.427,96.427c-3.413,3.413-3.413,8.533,0,11.947l35.161,35.161     c-3.333-1.832-6.535-3.878-9.561-6.147c-30.791-23.093-78.94,2.035-102.4,17.023v-17.876H-1v221.867h59.733v-25.6h110.933     c17.067,0,34.987-1.707,52.053-2.56l110.933-17.067c4.267,0,8.533-0.853,11.947-1.707c10.24-1.707,19.627-6.827,28.16-14.507     l128.853-101.547C511.853,330.773,513.56,315.413,505.88,305.173z M153.453,246.293l84.48-84.48l84.48,84.48l-55.138,55.138     c-7.681-2.568-15.853-3.938-24.222-3.938h-33.28c-1.781,0-3.55-0.075-5.312-0.192L153.453,246.293z M41.667,485.226h-25.6     V297.493h25.6v12.8v166.4V485.226z M491.373,326.506L361.667,427.2l-0.853,0.853c-5.12,5.973-11.947,9.387-19.627,10.24     c-3.413,0.853-5.973,0.853-9.387,0.853l-112.64,17.067c-16.213,2.56-33.28,3.413-49.493,3.413H58.733v-140.8     c20.48-14.507,68.267-41.813,92.16-23.893c14.525,11.467,33.162,18.123,52.224,19.388c2.219,0.234,4.437,0.239,6.656,0.239h33.28     c19.627,0,37.547,9.387,48.64,24.747c3.413,5.12,4.267,10.24,3.413,11.947c-2.56,4.267-12.8,5.973-23.893,6.827     c-3.049,0-6.093,0-8.533,0c-0.292,0-0.58,0-0.853,0h-81.92c-26.453,0-42.667,12.8-42.667,34.133c0,5.12,3.413,8.533,8.533,8.533     c5.12,0,8.533-3.413,8.533-8.533c0-4.267,0-17.067,25.6-17.067h81.067c0.527,0,1.1,0,1.707,0c2.341,0,5.32,0,9.387,0     c0.853,0,2.56,0,4.267,0c40.107,0.853,77.653,0,97.28-10.24L447,319.68c35.84-17.92,39.253-13.653,46.08-3.413     C494.787,318.826,494.787,323.947,491.373,326.506z" fill="#FFDA44"/>
			<path d="M184.173,240.32c-3.413,3.413-3.413,8.533,0,11.947s8.533,3.413,11.947,0c2.56-3.413,2.56-8.533,0-11.947     C192.707,236.906,187.587,236.906,184.173,240.32z" fill="#FFDA44"/>
			<path d="M243.907,252.266c3.413-3.413,3.413-8.533,0-11.947s-8.533-3.413-11.947,0s-3.413,8.533,0,11.947     S240.493,255.68,243.907,252.266z" fill="#FFDA44"/>
			<path d="M292.547,252.266c3.413-3.413,3.413-8.533,0-11.947s-8.533-3.413-11.947,0s-3.413,8.533,0,11.947     S289.133,255.68,292.547,252.266z" fill="#FFDA44"/>
			<path d="M323.267,160.96H459.8c5.12,0,8.533-3.413,8.533-8.533V15.893c0-5.12-3.413-8.533-8.533-8.533H323.267     c-5.12,0-8.533,3.413-8.533,8.533v136.533C314.733,157.546,318.147,160.96,323.267,160.96z M331.8,24.426h119.467v119.467H331.8     V24.426z" fill="#FFDA44"/>
			<path d="M357.4,41.493c-5.12,0-8.533,3.413-8.533,8.533s3.413,8.533,8.533,8.533s8.533-3.413,8.533-8.533     S362.52,41.493,357.4,41.493z" fill="#FFDA44"/>
			<path d="M425.667,41.493c-5.12,0-8.533,3.413-8.533,8.533s3.413,8.533,8.533,8.533s8.533-3.413,8.533-8.533     S430.787,41.493,425.667,41.493z" fill="#FFDA44"/>
			<path d="M357.4,109.76c-5.12,0-8.533,3.413-8.533,8.533s3.413,8.533,8.533,8.533s8.533-3.413,8.533-8.533     S362.52,109.76,357.4,109.76z" fill="#FFDA44"/>
			<path d="M391.533,75.626c-5.12,0-8.533,3.413-8.533,8.533s3.413,8.533,8.533,8.533c5.12,0,8.533-3.413,8.533-8.533     S396.653,75.626,391.533,75.626z" fill="#FFDA44"/>
			<path d="M425.667,109.76c-5.12,0-8.533,3.413-8.533,8.533s3.413,8.533,8.533,8.533s8.533-3.413,8.533-8.533     S430.787,109.76,425.667,109.76z" fill="#FFDA44"/>
		</g>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
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
export {getRollDiceSvg, drawArrow, getCheckerSvg, getDiceSvg, drawBackground};
