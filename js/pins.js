'use strict';

(function () {
  var createPin = function (pin) {
    var pinTemplate = document.querySelector('#pin')
          .content
          .querySelector('.map__pin');

    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.style.left = pin.location.x - window.data.PIN_WIDTH * 0.5 + 'px';
    pinElement.style.top = pin.location.y - window.data.PIN_HEIGHT + 'px';
    pinElement.setAttribute('data-x', pin.location.x);
    pinElement.setAttribute('data-y', pin.location.y);
    return pinElement;
  };

  var deleteArray = function (array) {
    array.forEach(function (elem) {
      elem.remove();
    });
  };

  var deletePins = function () {
    var pinsRendered = document.querySelectorAll('.map__pin');
    var pinsArray = Array.from(pinsRendered);
    pinsArray.shift();
    deleteArray(pinsArray);
  };

  var renderPins = function (pins) {
    deletePins();
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    var pinsAmount = (pins.length > window.data.PINS_AMOUNT) ? window.data.PINS_AMOUNT : pins.length;

    for (var i = 0; i < pinsAmount; i++) {
      fragment.appendChild(createPin(pins[i]));
    }
    mapPins.appendChild(fragment);

    window.card.renderCard();
    window.filters.filterPins();
  };

  var addPins = function (pins) {
    window.pins.pinsArray = pins;
    renderPins(pins);
    document.querySelector('.map').classList.remove('map--faded');
  };

  // var errorHandler = function () {
  //   var errorTemplate = document.querySelector('#error')
  //         .content
  //         .querySelector('.error');
  //
  //   var error = errorTemplate.cloneNode(true);
  //   var fragment = document.createDocumentFragment();
  //   var main = document.querySelector('main');
  //   fragment.appendChild(error);
  //   main.appendChild(fragment);
  //
  //   // нажатие на кнопку "Попробовать снова"
  //
  //   var errorButton = document.querySelector('.error__button');
  //   var errorMessage = document.querySelector('.error');
  //
  //   errorButton.addEventListener('click', function (evt) {
  //     console.log('click');
  //     evt.preventDefault();
  //     location.reload();
  //   });
  //
  //   errorMessage.addEventListener('click', function () {
  //     location.reload();
  //   });
  // };

  window.pins = {
    renderPins: renderPins,
    addPins: addPins,
    deletePins: deletePins
  };

})();
