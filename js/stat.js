'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = 'rgb(250, 250, 250)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);

  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeigth = 150; // px;
  var step = histogramHeigth / (max - 0);

  ctx.fillText('Список результатов:', 120, 60);

  var barWidth = 40; // px;
  var indent = 90; // px;
  var initialX = 150; // px;
  var initialY = 240; // px;

  for (i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(26, 42, 162, ' + (Math.random() * 0.25 + 0.5) + ')';
    }

    ctx.fillRect(initialX + indent * i, initialY, barWidth, (-times[i] * step));

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(times[i].toFixed(0), initialX + indent * i, initialY - times[i] * step - 10);
    ctx.fillText(names[i], initialX + indent * i, initialY + 20);
  }
};
