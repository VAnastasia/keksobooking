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
    return pinElement;
  };

  var deleteArray = function (array) {
    array.forEach(function (elem) {
      elem.remove();
    });
  };

  window.pins = {
    remove: function () {
      var pinsRendered = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      deleteArray(pinsRendered);
    },

    render: function (pins) {
      window.pins.remove();
      var mapPins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();
      var pinsAmount = (pins.length > window.data.PINS_AMOUNT) ? window.data.PINS_AMOUNT : pins.length;

      for (var i = 0; i < pinsAmount; i++) {
        fragment.appendChild(createPin(pins[i]));
      }
      mapPins.appendChild(fragment);

      window.card.render();
      window.filters.filteredArray();
    },

    add: function (pins) {
      window.pins.responseArray = pins.filter(function (elem) {
        return elem.offer;
      });

      window.pins.render(pins);
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      document.querySelectorAll('fieldset').forEach(function (elem) {
        elem.removeAttribute('disabled', true);
      });
      document.querySelectorAll('.map__filters select').forEach(function (elem) {
        elem.removeAttribute('disabled', true);
      });
    }
  };

})();
