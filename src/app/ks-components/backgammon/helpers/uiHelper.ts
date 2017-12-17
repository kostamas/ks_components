import {Canvas} from "../canvas";
import {distance} from "./backgammonUtils";

const calcPointsCircle = (cx, cy, rad, dashLength) => {
  let n = rad / dashLength,
    alpha = Math.PI * 2 / n,
    pointArray = [],
    i = -1;
  while (i < n) {
    let theta = alpha * i,
      theta2 = alpha * (i + 1);

    pointArray.push({
      x: (Math.cos(theta) * rad) + cx,
      y: (Math.sin(theta) * rad) + cy,
      ex: (Math.cos(theta2) * rad) + cx,
      ey: (Math.sin(theta2) * rad) + cy
    });
    i += 2;
  }

  Canvas.context.strokeStyle = "rgb(255,255,255)";
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
  let dist = distance(p1[0], p2[0], p1[1], p2[1]);

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

  let size = 13;

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
  return `<svg class="${playerType}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34px" height="34px" viewBox="0 0 124 124">
      <style>
       .black-player .inner-circle{
            fill: #000;
		    }

		   .white-player .inner-circle {
    			    fill: #fff;
	      }
	      
	     .black-player  .outer-circle {
	        fill: #00c228;
	      }
	      
	      .white-player  .outer-circle {
	        fill: #2c10ff;
	      }
      </style>
      <g>
  	    <circle class="outer-circle" cx="62" cy="62" r="62"/>
        <circle class="inner-circle" cx="62" cy="62" r="54"/>
      </g>
    </svg>`;
};

export {calcPointsCircle, drawArrow, getCheckerSvg};
