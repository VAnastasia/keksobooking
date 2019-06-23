'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var typeOffer = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  // валидация формы добавления нового объявления

  var typeOfferObj = {
    bungalo: window.data.PRICE_BUNGALO,
    flat: window.data.PRICE_FLAT,
    house: window.data.PRICE_HOUSE,
    palace: window.data.PRICE_PALACE
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

  window.form = {
    changeMinPrice: changeMinPrice
  };
})();
