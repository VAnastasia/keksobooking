'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressValue = adForm.querySelector('#address');

  // функция определения координат метки

  var defineCoordinates = function (element, elementWidth, elementHeight) {
    var mainPinX = element.offsetLeft;
    var mainPinY = element.offsetTop;
    addressValue.value = Math.floor(mainPinX + elementWidth * 0.5) + ', ' + Math.floor(mainPinY + elementHeight);
  };

  // перетаскивание метки

  var limitsDrag = {
    top: window.data.START_Y - window.data.MAIN_PIN_HEIGHT,
    left: window.data.START_X - Math.floor(window.data.MAIN_PIN_WIDTH * 0.5),
    bottom: window.data.FINISH_Y - window.data.MAIN_PIN_HEIGHT,
    right: window.data.FINISH_X - Math.floor(window.data.MAIN_PIN_WIDTH * 0.5)
  };

  var onDragPin = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      if (pinMain.offsetTop < limitsDrag.top) {
        pinMain.style.top = limitsDrag.top + 'px';
      }

      if (pinMain.offsetTop > limitsDrag.bottom) {
        pinMain.style.top = limitsDrag.bottom + 'px';
      }

      if (pinMain.offsetLeft < limitsDrag.left) {
        pinMain.style.left = limitsDrag.left + 'px';
      }

      if (pinMain.offsetLeft > limitsDrag.right) {
        pinMain.style.left = limitsDrag.right + 'px';
      }

      defineCoordinates(pinMain, window.data.MAIN_PIN_WIDTH, window.data.MAIN_PIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinMain.addEventListener('mousedown', onDragPin);

  window.mainPin = {
    pinMain: pinMain,
    adForm: adForm,
    addressValue: addressValue,
    defineCoordinates: defineCoordinates
  };
})();
