'use strict';

(function () {
    var FI = {
        NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люлита', 'Вашингтон'],
        SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
    }

    window.identify = function (PART) {
        return window.getRandomItem(FI[PART]);
    }
})();