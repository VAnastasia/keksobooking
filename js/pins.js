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

  var addPins = function (pins) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.PINS_AMOUNT; i++) {
      fragment.appendChild(createPin(pins[i]));
    }
    mapPins.appendChild(fragment);

    document.querySelector('.map').classList.remove('map--faded');
    window.card.renderCard();
  };

  var errorHandler = function () {
    var errorTemplate = document.querySelector('#error')
          .content
          .querySelector('.error');

    var error = errorTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var main = document.querySelector('main');
    fragment.appendChild(error);
    main.appendChild(fragment);

    // нажатие на кнопку "Попробовать снова"

    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      location.reload();
    });
  };

  window.pins = {
    addPins: addPins,
    errorHandler: errorHandler
  };

})();
