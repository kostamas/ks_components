import {Canvas} from "../canvas";

export const calcPointsCircle = (cx, cy, rad, dashLength, context)=> {
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
}

export const getCheckerSvg = (playerType) =>{
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
}
