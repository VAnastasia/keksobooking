'use strict';

(function () {
  var filters = document.querySelector('.map__filters');

  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');

  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var onFilterPins = function () {
    var data = window.pins.pinsArray;
    var pinsArray = data.slice();

    pinsFiltred = data;

    if (housingType.value !== 'any') {
      var pinsFiltred = pinsArray.filter(function (pin) {
        return pin.offer.type === housingType.value;
      });
    }

    if (housingPrice.value !== 'any') {
      switch (housingPrice.value) {

        case 'low':
          pinsFiltred = pinsFiltred.filter(function (pin) {
            return pin.offer.price < LOW_PRICE;
          });
          break;

        case 'high':
          pinsFiltred = pinsFiltred.filter(function (pin) {
            return pin.offer.price > HIGH_PRICE;
          });
          break;

        case 'middle':
          pinsFiltred = pinsFiltred.filter(function (pin) {
            return pin.offer.price >= LOW_PRICE && pin.offer.price <= HIGH_PRICE;
          });
          break;
      }
    }

    if (housingRooms.value !== 'any') {
      pinsFiltred = pinsFiltred.filter(function (pin) {
        return pin.offer.rooms === parseInt(housingRooms.value, 10);
      });
    }

    if (housingGuests.value !== 'any') {
      pinsFiltred = pinsFiltred.filter(function (pin) {
        return pin.offer.guests === parseInt(housingGuests.value, 10);
      });
    }


    var features = filters.querySelectorAll('input[name="features"]:checked');
    if (features.length > 0) {
      features.forEach(function (feature) {

        var equalElement = function (elem) {
          return elem === feature.value;
        };

        pinsFiltred = pinsFiltred.filter(function (pin) {
          return pin.offer.features.some(equalElement);
        });
      });
    }


    window.card.deleteCard();

    window.pins.renderPins(pinsFiltred);
  };

  var filterPins = function () {
    filters.addEventListener('change', onFilterPins);
  };

  window.filters = {
    filterPins: filterPins
  };

})();
