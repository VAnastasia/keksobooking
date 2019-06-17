'use strict';

var IMG_NUMBER = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var PINS_AMOUNT = 8;
var START_X = 0;
var FINISH_X = 1200;
var START_Y = 130;
var FINISH_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 87;
var MAIN_PIN_INACTIVE_HALF_HEIGHT = 65 * 0.5;

var map = document.querySelector('.map');
var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressValue = adForm.querySelector('#address');
var fieldsets = document.querySelectorAll('fieldset');

// вспомогательные функции

var getRandomItem = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var getRandomNumber = function (start, finish) {
  return Math.round(Math.random() * (Math.abs(finish - start)) + start);
};

var shuffle = function (arr) {
  var j;
  var temp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

// функция активации страницы

var activePage = function () {
  map.classList.remove('map--faded');

  for (i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }

  adForm.classList.remove('ad-form--disabled');

  addPins();

  pinMain.removeEventListener('click', activePage);
};

// функция определения координат метки

var defineCoordinates = function (element, elementWidth, elementHeight) {
  var mainPinX = element.offsetLeft;
  var mainPinY = element.offsetTop;
  addressValue.value = Math.round(mainPinX + elementWidth * 0.5) + ', ' + Math.round(mainPinY + elementHeight);
};

// неактивное состояние страницы

for (var i = 0; i < fieldsets.length; i++) {
  fieldsets[i].setAttribute('disabled', 'true');
}

defineCoordinates(pinMain, MAIN_PIN_WIDTH, MAIN_PIN_INACTIVE_HALF_HEIGHT);

// обработчики на главной метке

pinMain.addEventListener('click', activePage);
pinMain.addEventListener('mouseup', function () {
  defineCoordinates(pinMain, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
});

// отрисовка похожих объявлений

var generatePins = function (imgNumber, typesOffer, startX, finishX, startY, finishY, pinsAmount) {
  var pins = [];
  imgNumber = shuffle(IMG_NUMBER);
  for (i = 0; i < pinsAmount; i++) {
    var pin = {
      'author': {
        'avatar': 'img/avatars/user' + imgNumber[i] + '.png'
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
  pinElement.style.left = pin.location.x - PIN_WIDTH * 0.5 + 'px';
  pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
  return pinElement;
};

var addPins = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var pins = generatePins(IMG_NUMBER, TYPE_OFFER, START_X, FINISH_X, START_Y, FINISH_Y, PINS_AMOUNT);
  for (i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
  }
  mapPins.appendChild(fragment);
};
