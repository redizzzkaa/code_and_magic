'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 18;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect (x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
	var maxElement = arr[0];

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] > maxElement) {
			maxElement = arr[i];
		}
	}

	return maxElement;
};


window.renderStatistics = function (ctx, names, times) {
	renderCloud (ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
	renderCloud (ctx, CLOUD_X, CLOUD_Y, '#fff');

	ctx.fillStyle = '#000';
	ctx.font = '16px PT Mono';
	//ctx.textBaseline = 'hanging';
	ctx.fillText ('Ура вы победили!', CLOUD_X + GAP + GAP, CLOUD_Y + GAP + FONT_GAP);
	ctx.fillText ('Список результатов:', CLOUD_X + GAP + GAP, CLOUD_Y + GAP + FONT_GAP * 2);

	var maxTime = getMaxElement(times);
	var timesFloor;

	for (var i = 0; i < names.length; i++) {

		ctx.fillText (names[i], CLOUD_X + GAP * 3 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2);

		
		if (names[i] == 'Вы') {
			ctx.fillStyle = 'rgba(255, 0, 0, 1)'
		} else {
			ctx.fillStyle = 'hsl(235, ' + Math.floor(Math.random() * 100) + '%, 50%)';
		}

		ctx.fillRect (CLOUD_X + GAP * 3 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - FONT_GAP, BAR_WIDTH, - ((times[i] * BAR_HEIGHT) / maxTime));
		ctx.fillStyle = '#000';

		timesFloor = Math.floor(times[i])
		ctx.fillText (timesFloor, CLOUD_X + GAP * 3 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 3 - FONT_GAP - ((times[i] * BAR_HEIGHT) / maxTime));
	};


};