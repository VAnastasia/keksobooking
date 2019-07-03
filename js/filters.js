'use strict';

(function () {
  var filters = document.querySelector('.map__filters');

  var housingType = filters.querySelector('#housing-type');

  var onFilterPins = function () {
    var data = window.pins.pinsArray;
    var pinsArray = data.slice();

    pinsFiltred = data;

    if (housingType.value !== 'any') {
      var pinsFiltred = pinsArray.filter(function (pin) {
        return pin.offer.type === housingType.value;
      });
    }

    window.card.deleteCard();

    window.pins.renderPins(pinsFiltred);
  };

  var filterPins = function () {
    housingType.addEventListener('change', onFilterPins);
  };

  window.filters = {
    filterPins: filterPins
  };

})();
