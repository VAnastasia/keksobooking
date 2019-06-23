'use strict';

(function () {
  var map = document.querySelector('.map');
  var fieldsets = document.querySelectorAll('fieldset');
  var filters = document.querySelector('.map__filters');
  var selectsFilter = filters.querySelectorAll('select');

  // функция дезактивации страницы

  var inactivePage = function () {
    for (var j = 0; j < selectsFilter.length; j++) {
      selectsFilter[j].setAttribute('disabled', 'true');
    }

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'true');
    }

    window.form.changeMinPrice();
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

    window.card.adForm.classList.remove('ad-form--disabled');

    window.pins.addPins();
    window.card.defineCoordinates(window.card.pinMain, window.data.MAIN_PIN_WIDTH, window.data.MAIN_PIN_HEIGHT);

    document.removeEventListener('mouseup', activePage);
  };


  // неактивное состояние страницы

  inactivePage();
  window.card.defineCoordinates(window.card.pinMain, window.data.MAIN_PIN_WIDTH, window.data.MAIN_PIN_INACTIVE_HALF_HEIGHT);


  // обработчик активации страницы

  document.addEventListener('mouseup', activePage);

})();
