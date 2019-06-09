'use strict';

document.querySelector('.map').classList.remove('map--faded');

var IMG_NUMBER = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var PINS_AMOUNT = 8;
var START_X = 0;
var FINISH_X = 1200;
var START_Y = 130;
var FINISH_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomItem = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var getRandomNumber = function (start, finish) {
  return Math.round(Math.random() * (Math.abs(finish - start)) + start);
};

var generatePins = function (imgNumber, typesOffer, startX, finishX, startY, finishY, pinsAmount) {
  var pins = [];
  for (var i = 0; i < pinsAmount; i++) {
    var pin = {
      'author': {
        'avatar': 'img/avatars/user' + getRandomItem(imgNumber) + '.png'
      },

      'offer': {
        'type': getRandomItem(typesOffer)
      },

      'location': {
        'x': getRandomNumber(startX, finishX),
        'y': getRandomNumber(startY, finishY)
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
  pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH * 0.5) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  return pinElement;
};

var addPins = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var pins = generatePins(IMG_NUMBER, TYPE_OFFER, START_X, FINISH_X, START_Y, FINISH_Y, PINS_AMOUNT);
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
  }
  mapPins.appendChild(fragment);
};

addPins();
