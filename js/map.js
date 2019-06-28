'use strict';

(function () {
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
    window.mainPin.defineCoordinates(window.mainPin.pinMain, window.data.MAIN_PIN_WIDTH, window.data.MAIN_PIN_HEIGHT);

    window.backend.load(window.pins.addPins, window.pins.errorHandler);

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }

    for (var j = 0; j < selectsFilter.length; j++) {
      selectsFilter[j].removeAttribute('disabled');
    }

    window.mainPin.adForm.classList.remove('ad-form--disabled');

    document.removeEventListener('mouseup', activePage);

  };

  // неактивное состояние страницы

  inactivePage();
  window.mainPin.defineCoordinates(window.mainPin.pinMain, window.data.MAIN_PIN_WIDTH, window.data.MAIN_PIN_INACTIVE_HALF_HEIGHT);

  // обработчик активации страницы

  document.addEventListener('mouseup', activePage);

})();
