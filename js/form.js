'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');
  var typeOffer = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  var capacityOptions = capacity.querySelectorAll('option');

  var fieldsets = document.querySelectorAll('fieldset');
  var filters = document.querySelector('.map__filters');
  var selectsFilter = filters.querySelectorAll('select');

  // валидация формы добавления нового объявления

  var capacityRoomMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var changeCapacity = function () {
    capacityOptions.forEach(function (option) {
      option.disabled = true;
      option.selected = false;

      if (capacityRoomMap[roomNumber.value].indexOf(option.value) > -1) {
        option.disabled = false;
        option.selected = true;
      }
    });
  };

  changeCapacity();
  roomNumber.addEventListener('change', function () {
    changeCapacity();
  });

  var typeOfferMap = {
    bungalo: window.data.PRICE_BUNGALO,
    flat: window.data.PRICE_FLAT,
    house: window.data.PRICE_HOUSE,
    palace: window.data.PRICE_PALACE
  };

  var changeMinPrice = function () {
    var typeValue = typeOffer.value;
    price.min = typeOfferMap[typeValue];
    price.placeholder = typeOfferMap[typeValue];
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

  // функция дезактивации страницы

  var inactivePage = function () {
    selectsFilter.forEach(function (elem) {
      elem.setAttribute('disabled', 'true');
    });

    fieldsets.forEach(function (elem) {
      elem.setAttribute('disabled', 'true');
    });

    changeMinPrice();
  };

  // функция активации страницы

  var activePage = function () {
    window.mainPin.defineCoordinates(pinMain, window.data.MAIN_PIN_WIDTH, window.data.MAIN_PIN_HEIGHT);

    window.backend.load(window.pins.add, onError, 'GET', window.data.URL_GET_DATA);

    changeCapacity();
    pinMain.removeEventListener('mousedown', activePage);
  };

  var onEnterPin = function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      evt.preventDefault();
      activePage();
    }

    pinMain.removeEventListener('keydown', onEnterPin);
  };

  pinMain.addEventListener('keydown', onEnterPin);

  // неактивное состояние страницы

  inactivePage();
  window.mainPin.defineCoordinates(pinMain, window.data.MAIN_PIN_WIDTH, window.data.MAIN_PIN_INACTIVE_HALF_HEIGHT);

  // обработчик активации страницы

  pinMain.addEventListener('mousedown', activePage);

  // отправка формы

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.load(onLoad, onError, 'POST', window.data.URL_SET_DATA, new FormData(adForm));
  });

  // сброс формы

  var adFormReset = document.querySelector('.ad-form__reset');

  adFormReset.addEventListener('click', function () {
    resetForm();
    changeCapacity();
    window.mainPin.defineCoordinates(pinMain, window.data.MAIN_PIN_WIDTH, window.data.MAIN_PIN_INACTIVE_HALF_HEIGHT);
  });

  var resetForm = function () {
    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.pins.remove();

    var previewPhoto = document.querySelectorAll('.ad-form__photo');
    window.preview.remove(previewPhoto);
    var photoContainer = document.createElement('div');
    photoContainer.className = 'ad-form__photo';
    document.querySelector('.ad-form__photo-container').appendChild(photoContainer);
    var previewAvatar = document.querySelector('.ad-form-header__preview img');
    previewAvatar.src = window.preview.previewAvatarDefault;

    pinMain.style.left = window.data.MAIN_PIN_START_X;
    pinMain.style.top = window.data.MAIN_PIN_START_Y;

    pinMain.addEventListener('mousedown', activePage);
    window.card.remove();
    adForm.reset();
    filters.reset();
    window.mainPin.defineCoordinates(pinMain, window.data.MAIN_PIN_WIDTH, window.data.MAIN_PIN_INACTIVE_HALF_HEIGHT);
    changeCapacity();
    inactivePage();
  };

  // успешная загрузка

  var onLoad = function () {
    var successTemplate = document.querySelector('#success')
          .content
          .querySelector('.success');

    var success = successTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var main = document.querySelector('main');
    fragment.appendChild(success);
    main.appendChild(fragment);

    var successMessage = main.querySelector('.success');
    successMessage.addEventListener('click', function () {
      successMessage.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        successMessage.remove();
      }
    });

    resetForm();
  };

  // неуспешная загрузка

  var onError = function () {
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
    var errorMessage = document.querySelector('.error');

    var onClickError = function () {
      errorMessage.remove();
      resetForm();
    };

    errorButton.addEventListener('click', function () {
      onClickError();
    });

    errorMessage.addEventListener('click', function () {
      onClickError();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        onClickError();
        document.removeEventListener('keydown', onClickError);
      }
    });
  };
})();
