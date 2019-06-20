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
var MAIN_PIN_HEIGHT = 81;
var MAIN_PIN_INACTIVE_HALF_HEIGHT = 65 * 0.5;
var PRICE_BUNGALO = 0;
var PRICE_FLAT = 1000;
var PRICE_HOUSE = 5000;
var PRICE_PALACE = 10000;

var map = document.querySelector('.map');
var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressValue = adForm.querySelector('#address');
var fieldsets = document.querySelectorAll('fieldset');
var filters = document.querySelector('.map__filters');
var selectsFilter = filters.querySelectorAll('select');

var typeOffer = adForm.querySelector('#type');
var price = adForm.querySelector('#price');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');

// функция определения координат метки

var defineCoordinates = function (element, elementWidth, elementHeight) {
  var mainPinX = element.offsetLeft;
  var mainPinY = element.offsetTop;
  addressValue.value = Math.floor(mainPinX + elementWidth * 0.5) + ', ' + Math.floor(mainPinY + elementHeight);
};

// перетаскивание метки

var limitsDrag = {
  top: START_Y - MAIN_PIN_HEIGHT,
  left: START_X - Math.floor(MAIN_PIN_WIDTH * 0.5),
  bottom: FINISH_Y - MAIN_PIN_HEIGHT,
  right: FINISH_X - Math.floor(MAIN_PIN_WIDTH * 0.5)
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

    if (pinMain.offsetTop < limitsDrag.top) {
      pinMain.style.top = limitsDrag.top + 'px';
    } else if (pinMain.offsetTop > limitsDrag.bottom) {
      pinMain.style.top = limitsDrag.bottom + 'px';
    } else {
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
    }

    if (pinMain.offsetLeft < limitsDrag.left) {
      pinMain.style.left = limitsDrag.left + 'px';
    } else if (pinMain.offsetLeft > limitsDrag.right) {
      pinMain.style.left = limitsDrag.right + 'px';
    } else {
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    defineCoordinates(pinMain, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

pinMain.addEventListener('mousedown', onDragPin);

// валидация формы добавления нового объявления

var typeOfferObj = {
  bungalo: PRICE_BUNGALO,
  flat: PRICE_FLAT,
  house: PRICE_HOUSE,
  palace: PRICE_PALACE
};

var changeMinPrice = function () {
  var typeValue = typeOffer.value;
  price.min = typeOfferObj[typeValue];
  price.placeholder = typeOfferObj[typeValue];
};

var changeTime = function (select1, select2) {
  select2.value = select1.value;
  return select2.value;
};

timeIn.addEventListener('change', function () {
  changeTime(timeIn, timeOut);
});

timeOut.addEventListener('change', function () {
  changeTime(timeOut, timeIn);
});

typeOffer.addEventListener('change', function () {
  changeMinPrice();
});

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
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

// функция дезактивации страницы

var inactivePage = function () {
  for (var j = 0; j < selectsFilter.length; j++) {
    selectsFilter[j].setAttribute('disabled', 'true');
  }

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'true');
  }

  changeMinPrice();
};

// функция активации страницы

var activePage = function () {
  map.classList.remove('map--faded');

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }

  for (var j = 0; j < selectsFilter.length; j++) {
    selectsFilter[j].removeAttribute('disabled');
  }

  adForm.classList.remove('ad-form--disabled');

  addPins();
  defineCoordinates(pinMain, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);

  pinMain.removeEventListener('mouseup', activePage);
};


// неактивное состояние страницы

inactivePage();
defineCoordinates(pinMain, MAIN_PIN_WIDTH, MAIN_PIN_INACTIVE_HALF_HEIGHT);


// обработчик активации страницы

pinMain.addEventListener('mouseup', activePage);


// отрисовка похожих объявлений

var generatePins = function (imgNumber, typesOffer, startX, finishX, startY, finishY, pinsAmount) {
  var pins = [];
  imgNumber = shuffle(IMG_NUMBER);
  for (var i = 0; i < pinsAmount; i++) {
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
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
  }
  mapPins.appendChild(fragment);
};
