'use strict';

window.colorize = (function () {
    var setupPlayer = document.querySelector('.setup-player');    

    var COLORS = {
        COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
        EYES: ['black', 'red', 'blue', 'yellow', 'green'],
        FIREBALL: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
    }

   return {
        defaults: function (PART) {
            return window.getRandomItem(COLORS[PART]);
        },
        changes: function (element, PART) {
            element.addEventListener('click', function() {
                var color = window.getRandomItem(COLORS[PART])
                if (element.tagName.toLowerCase() === 'div') {
                    element.style.background = color;
                } else {
                    element.style.fill = color;
                }
                setupPlayer.querySelector('input[name="'+ PART.toLowerCase() + '-color"]').value = color;
            })
        }
    }
})();