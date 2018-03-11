"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("../canvas");
var backgammonUtils_1 = require("./backgammonUtils");
var Observable_1 = require("rxjs/Observable");
var calcPointsCircle = function (cx, cy, rad, dashLength) {
    var n = rad / dashLength, alpha = Math.PI * 2 / n, pointArray = [], i = -1;
    while (i < n) {
        var theta = alpha * i, theta2 = alpha * (i + 1);
        pointArray.push({
            x: (Math.cos(theta) * rad) + cx,
            y: (Math.sin(theta) * rad) + cy,
            ex: (Math.cos(theta2) * rad) + cx,
            ey: (Math.sin(theta2) * rad) + cy
        });
        i += 2;
    }
    canvas_1.Canvas.context.strokeStyle = 'rgb(255,255,255)';
    canvas_1.Canvas.context.beginPath();
    for (var p = 0; p < pointArray.length; p++) {
        canvas_1.Canvas.context.moveTo(pointArray[p].x, pointArray[p].y);
        canvas_1.Canvas.context.lineWidth = 2;
        canvas_1.Canvas.context.lineTo(pointArray[p].ex, pointArray[p].ey);
        canvas_1.Canvas.context.stroke();
    }
    canvas_1.Canvas.context.closePath();
};
exports.calcPointsCircle = calcPointsCircle;
var drawArrow = function (p1, p2) {
    canvas_1.Canvas.context.save();
    var dist = backgammonUtils_1.distance(p1[0], p2[0], p1[1], p2[1]);
    canvas_1.Canvas.context.beginPath();
    canvas_1.Canvas.context.lineWidth = 6;
    canvas_1.Canvas.context.strokeStyle = '#0000ff';
    canvas_1.Canvas.context.moveTo(p1[0], p1[1]);
    canvas_1.Canvas.context.lineTo(p2[0], p2[1]);
    canvas_1.Canvas.context.stroke();
    var angle = Math.acos((p2[1] - p1[1]) / dist);
    if (p2[0] < p1[0]) {
        angle = 2 * Math.PI - angle;
    }
    var size = 13;
    canvas_1.Canvas.context.beginPath();
    canvas_1.Canvas.context.translate(p2[0], p2[1]);
    canvas_1.Canvas.context.rotate(-angle);
    canvas_1.Canvas.context.fillStyle = '#0000ff';
    canvas_1.Canvas.context.lineWidth = 2;
    canvas_1.Canvas.context.moveTo(0, -size);
    canvas_1.Canvas.context.lineTo(-size, -size);
    canvas_1.Canvas.context.lineTo(0, 0);
    canvas_1.Canvas.context.lineTo(size, -size);
    canvas_1.Canvas.context.lineTo(0, -size);
    canvas_1.Canvas.context.closePath();
    canvas_1.Canvas.context.fill();
    canvas_1.Canvas.context.stroke();
    canvas_1.Canvas.context.restore();
};
exports.drawArrow = drawArrow;
var getCheckerSvg = function (playerType) {
    return "<svg class=\"" + playerType + "\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"34px\" height=\"34px\" viewBox=\"0 0 124 124\">\n      <style>\n       .Black .inner-circle{\n            fill: #000;\n\t\t    }\n\n\t\t   .White .inner-circle {\n    \t\t\t    fill: #fff;\n\t      }\n\t      \n\t     .Black .outer-circle {\n\t        fill: #00c228;\n\t      }\n\t      .White .outer-circle {\n\t        fill: #2c10ff;\n\t      }\n      </style>\n      <g>\n  \t    <circle class=\"outer-circle\" cx=\"62\" cy=\"62\" r=\"62\"/>\n        <circle class=\"inner-circle\" cx=\"62\" cy=\"62\" r=\"54\"/>\n      </g>\n    </svg>";
};
exports.getCheckerSvg = getCheckerSvg;
var getDiceSvg = function (diceNum) {
    return "<svg class=\"dice-wrapper-" + diceNum + "\" xmlns=\"http://www.w3.org/2000/svg\" width=\"35\" height=\"35\" viewBox=\"0 0 512 512\">\n  <style>\n    .dice{\n    display: none;\n    }\n     .dice-wrapper-1 .dice-1, .dice-wrapper-2 .dice-2, .dice-wrapper-3 .dice-3,.dice-wrapper-4 .dice-4,.dice-wrapper-5 .dice-5,.dice-wrapper-6 .dice-6{\n      display: block;\n    }\n  </style>\n  <path d=\"M0 0h512v512H0z\" fill=\"#000\" fill-opacity=\"1\"></path>\n  <g class=\"dice dice-1\" transform=\"translate(0,0)\" style=\"touch-action: none;\">\n    <path\n      d=\"M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zM256 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100z\"\n      fill=\"#fff\" fill-opacity=\"1\"></path>\n  </g>\n  \n  <g class=\"dice dice-2\" transform=\"translate(0,0)\" style=\"touch-action: none;\">\n   <path\n      d=\"M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm316.97 36.03A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm-268 268A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z\"\n      fill=\"#fff\" fill-opacity=\"1\"></path>\n  </g>\n  \n  <g class=\"dice dice-3\" transform=\"translate(0,0)\" style=\"touch-action: none;\">\n    <path\n      d=\"M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm316.97 36.03A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zM256 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100zM123.47 340.03A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z\"\n      fill=\"#fff\" fill-opacity=\"1\"></path>\n  </g>\n  \n  <g class=\"dice dice-4\" transform=\"translate(0,0)\" style=\"touch-action: none;\">\n    <path\n      d=\"M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm48.97 36.03A50 50 0 0 1 172 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm-268 268A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z\"\n      fill=\"#fff\" fill-opacity=\"1\"></path>\n  </g>\n  \n  <g class=\"dice dice-5\" transform=\"translate(0,0)\" style=\"touch-action: none;\">\n     <path\n      d=\"M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm48.97 36.03A50 50 0 0 1 172 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zM256 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100zM123.47 340.03A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z\"\n      fill=\"#fff\" fill-opacity=\"1\"></path>\n  </g>\n  \n  <g class=\"dice dice-6\" transform=\"translate(0,0)\" style=\"touch-action: none;\">\n    <path\n      d=\"M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm48.97 36.03A50 50 0 0 1 172 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zM122 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100zm268 0a50 50 0 0 1 0 100 50 50 0 0 1 0-100zM123.47 340.03A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z\"\n      fill=\"#fff\" fill-opacity=\"1\"></path>\n  </g>\n</svg>\n";
};
exports.getDiceSvg = getDiceSvg;
var drawBackground = function (backgroundImgUrl) {
    return Observable_1.Observable.create(function (observer) {
        var background = new Image();
        background.src = backgroundImgUrl;
        background.onload = function () {
            canvas_1.Canvas.context.drawImage(background, 0, 0);
            observer.next();
            observer.complete();
        };
    });
};
exports.drawBackground = drawBackground;
