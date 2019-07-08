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
    var pinsFiltred = pinsArray;

    var filterType = function (pin) {
      if (housingType.value !== 'any' && pin.offer.type !== housingType.value) {
        return false;
      }
      return true;
    };

    var filterPrice = function (pin) {
      var isCorrect = true;

      if (housingPrice.value !== 'any') {
        switch (housingPrice.value) {

          case 'low':
            if (pin.offer.price >= LOW_PRICE) {
              isCorrect = false;
            }
            break;

          case 'high':
            if (pin.offer.price <= HIGH_PRICE) {
              isCorrect = false;
            }
            break;

          case 'middle':
            if (pin.offer.price < LOW_PRICE || pin.offer.price > HIGH_PRICE) {
              isCorrect = false;
            }
            break;
        }
      }
      return isCorrect;
    };

    var filterRooms = function (pin) {
      if (housingRooms.value !== 'any' && pin.offer.rooms !== parseInt(housingRooms.value, 10)) {
        return false;
      }
      return true;
    };


    var filterGuests = function (pin) {
      if (housingGuests.value !== 'any' && pin.offer.guests !== parseInt(housingGuests.value, 10)) {
        return false;
      }
      return true;
    };

    var filterFeatures = function (pin) {
      var features = filters.querySelectorAll('input[name="features"]:checked');
      var featuresValues = [];

      features.forEach(function (elem) {
        featuresValues.push(elem.value);
      });

      if (featuresValues.length > 0) {
        return featuresValues.every(function (item) {
          return pin.offer.features.includes(item);
        });
      }
      return true;
    };

    pinsFiltred = pinsArray.filter(function (elem) {
      return filterType(elem) && filterPrice(elem) && filterRooms(elem) && filterGuests(elem) && filterFeatures(elem);
    });

    window.card.removeCard();
    window.pins.renderPins(pinsFiltred);

  };

  var filterPins = function () {
    filters.addEventListener('change', window.debounce(onFilterPins));
  };

  window.filters = {
    filterPins: filterPins
  };

})();
