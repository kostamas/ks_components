import {CanvasContext} from "./canvasContext";

export class Checker {
  private checker;
  private type;
  private x;
  private y;

  constructor(x, y, type) {
    this.checker = new Image();
    this.type = type;
    this.x = x;
    this.y = y;

    this.init();
  }

  private init() {
    const svgData = `<svg class="${this.type}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34px" height="34px" viewBox="0 0 124 124">
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

    const _window: any = window;
    const DOMURL = _window.URL || _window.webkitURL || _window;

    const svgBlob = new Blob([svgData], {type: 'image/svg+xml'});
    const url = DOMURL.createObjectURL(svgBlob);

    this.checker.onload = () => {
      CanvasContext.context.drawImage(this.checker, this.x, this.y);
      DOMURL.revokeObjectURL(url);
    };

    this.checker.src = url;
  }
}
