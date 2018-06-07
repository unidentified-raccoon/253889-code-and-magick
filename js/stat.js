'use strict';

var CLOUD_WIDTH = 420; // px
var CLOUD_HEIGHT = 270; // px

var HISTOGRAM_HEIGHT = 150; // px;

var BAR_WIDTH = 40; // px;
var INDENT = 90; // px;
var INITIAL_X = 150; // px;
var INITIAL_Y = 240; // px;


// drawing cloud w/shadow
var renderCloud = function (ctx, x1, y1, x2, y2, color1, color2) {
  ctx.fillStyle = color1;
  ctx.fillRect(x1, y1, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = color2;
  ctx.strokeRect(x2, y2, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillRect(x2, y2, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// drawing game massage on cloud
var renderGameMessage = function (ctx, x, y, color, font, string) {
  ctx.fillStyle = color;
  ctx.font = font;

  ctx.fillText(string, x, y);
};

// finding longest time
var findLongestTime = function (arr) {
  var max = Math.max.apply(null, arr);
  return max;
};

// getting pillar's/text coordinates (X, Y)
var getPillarX = function (i) {
  return INITIAL_X + INDENT * i;
};
var getPillarTimeTextY = function (i, times, step) {
  return INITIAL_Y - times[i] * step - 10;
};

// drawing histogram pillar
var renderHistogramPillar = function (ctx, i, times, step) {
  ctx.fillRect(getPillarX(i), INITIAL_Y, BAR_WIDTH, (-times[i] * step));
};
// drawing histogram pillar's text
var renderHistogramPillarText = function (ctx, times, names, i, color, step) {
  ctx.fillStyle = color;
  ctx.fillText(times[i].toFixed(0), getPillarX(i), getPillarTimeTextY(i, times, step));
  ctx.fillText(names[i], getPillarX(i), INITIAL_Y + 20);
};

// getting random shade of color
var getRandomColorShade = function (r, g, b) {
  return 'rgba(' + r + ',' + g + ',' + b + ', ' + (Math.random() * 0.25 + 0.75) + ')';
};

// drawing statistics pop-up
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 100, 10, 'rgba(0, 0, 0, 0.7)', 'rgb(250, 250, 250)');

  renderGameMessage(ctx, 120, 40, 'rgb(0, 0, 0)', '16px PT Mono', 'Ура вы победили!');
  renderGameMessage(ctx, 120, 60, 'rgb(0, 0, 0)', '16px PT Mono', 'Список результатов:');

  var step = HISTOGRAM_HEIGHT / (findLongestTime(times) - 0);

  // drawing histograms
  for (var i = 0; i < times.length; i++) {
    var barColor = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomColorShade(26, 42, 162);

    ctx.fillStyle = barColor;

    renderHistogramPillar(ctx, i, times, step);
    renderHistogramPillarText(ctx, times, names, i, 'rgb(0, 0, 0)', step);
  }
};
