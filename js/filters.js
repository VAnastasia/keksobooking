'use strict';

(function () {
  var filters = document.querySelector('.map__filters');

  var housingType = filters.querySelector('#housing-type');

  var onFilterPins = function () {
    var data = window.backend.response;
    var pinsArray = data.slice();

    if (housingType.value !== 'any') {
      var pinsFiltred = pinsArray.filter(function (pin) {
        return pin.offer.type === housingType.value;
      });
    } else {
      pinsFiltred = data;
    }

    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
    }

    window.pins.renderPins(pinsFiltred);
  };

  var filterPins = function () {
    housingType.addEventListener('change', onFilterPins);
  };

  window.filters = {
    filterPins: filterPins
  };

})();
