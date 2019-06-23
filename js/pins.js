'use strict';

(function () {
  var generatePins = function (imgNumber, typesOffer, startX, finishX, startY, finishY, pinsAmount) {
    var pins = [];
    imgNumber = window.util.shuffle(window.data.IMG_NUMBER);
    for (var i = 0; i < pinsAmount; i++) {
      var pin = {
        'author': {
          'avatar': 'img/avatars/user' + imgNumber[i] + '.png'
        },

        'offer': {
          'type': window.util.getRandomItem(typesOffer)
        },

        'location': {
          'x': window.util.getRandomNumber(startX, finishX),
          'y': window.util.getRandomNumber(startY, finishY)
        }
      };
      pins.push(pin);
    }
    return pins;
  };

  var createPin = function (pin) {
    var pinTemplate = document.querySelector('#pin')
          .content
          .querySelector('.map__pin');

    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = 'Метка объявления';
    pinElement.style.left = pin.location.x - window.data.PIN_WIDTH * 0.5 + 'px';
    pinElement.style.top = pin.location.y - window.data.PIN_HEIGHT + 'px';
    return pinElement;
  };

  var addPins = function () {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    var pins = generatePins(window.data.IMG_NUMBER, window.data.TYPE_OFFER, window.data.START_X, window.data.FINISH_X, window.data.START_Y, window.data.FINISH_Y, window.data.PINS_AMOUNT);
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(createPin(pins[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pins = {
    addPins: addPins
  };

})();
