'use strict';

(function () {

    var setup = document.querySelector('.setup');
    var setupOpen = document.querySelector('.setup-open');
    var setupClose = setup.querySelector('.setup-close');
    var dialogHandle = setup.querySelector('.upload');

    var onPopupEscPress = function (evt) {
        window.util.isEscEvent(evt, closePopup);
    };

    var onStateCoordsPopup = function () {
        setup.style.left = '';
        setup.style.top = '';
    }

    var openPopup = function() {
        setup.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
        onStateCoordsPopup();
    };
    
    var closePopup = function() {
        setup.classList.add('hidden');
        document.removeEventListener('keydown', onPopupEscPress);
    };

    setupOpen.addEventListener('click', function() {
        openPopup();
    });
    
    setupOpen.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, openPopup);
    });
    
    setupClose.addEventListener('click', function() {
        closePopup();
    });
    
    setupClose.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, closePopup);
    });
    
    openPopup();

    dialogHandle.addEventListener('mousedown', function(evt) {
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX,
            y: evt.clientY
        }

        var dragged = false;
       
        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();
            dragged = true;

            var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            }

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            }

            setup.style.top = (setup.offsetTop - shift.y) + 'px';
            setup.style.left = (setup.offsetLeft - shift.x) + 'px';
        }

        var onMouseUp = function (upEvt) {
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if (dragged) {
                var onClickPreventDefault = function (evt) {
                    evt.preventDefault();
                    dialogHandle.removeEventListener('click', onClickPreventDefault);
                }
                dialogHandle.addEventListener('click', onClickPreventDefault)
            }

        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    });
}());