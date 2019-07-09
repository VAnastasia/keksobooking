'use strict';

(function () {
  var AccomodationType = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var createCard = function (pin) {

    var cardTemplate = document.querySelector('#card')
          .content
          .querySelector('.map__card');

    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = pin.author.avatar;
    cardElement.querySelector('.popup__title').textContent = pin.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = pin.offer.price;
    cardElement.querySelector('.popup__text--price').insertAdjacentHTML('beforeEnd', '&#x20bd;<span>/ночь</span>');
    cardElement.querySelector('.popup__type').textContent = AccomodationType[pin.offer.type.toUpperCase()];
    cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = pin.offer.description;

    var photos = cardElement.querySelector('.popup__photos');
    var popupPhoto = cardElement.querySelector('.popup__photo');

    var photosArray = pin.offer.photos;

    var fragmentPhoto = document.createDocumentFragment();

    if (photosArray.length) {
      popupPhoto.remove();

      photosArray.forEach(function (elem) {
        var photo = document.createElement('img');
        photo.src = elem;
        photo.className = 'popup__photo';
        photo.width = '40';
        photo.height = '40';
        photo.alt = 'Фотография жилья';
        fragmentPhoto.appendChild(photo);
      });
      photos.appendChild(fragmentPhoto);
    } else {
      photos.remove();
    }


    var features = pin.offer.features;
    var featuresClassNames = features.map(function (elem) {
      return 'popup__feature popup__feature--' + elem;
    });
    var popupFeatures = cardElement.querySelectorAll('.popup__feature');

    popupFeatures.forEach(function (elem) {
      var contain = featuresClassNames.some(function (item) {
        return item === elem.classList.value;
      });

      if (!contain) {
        elem.remove();
      }
    });

    var map = document.querySelector('.map');
    var fragment = document.createDocumentFragment();

    fragment.appendChild(cardElement);
    map.appendChild(fragment);
  };

  window.card = {
    remove: function () {
      var card = document.querySelector('.map__card');

      if (card) {
        card.remove();
      }
    },

    render: function () {
      var mapPins = document.querySelector('.map__pins');
      mapPins.addEventListener('click', function (evt) {
        var target = evt.target;
        if (evt.target.tagName === 'IMG') {
          target = evt.target.parentNode;
        }

        if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {

          var data = window.pins.responseArray;
          var pinClicked = data.filter(function (elem) {
            return ((elem.location.x - window.data.PIN_WIDTH * 0.5 + 'px') === target.style.left) && ((elem.location.y - window.data.PIN_HEIGHT + 'px') === target.style.top);
          });

          window.card.remove();
          createCard(pinClicked[0]);

          var card = document.querySelector('.map__card');

          var inactivePin = function () {
            var activePins = mapPins.querySelectorAll('.map__pin--active');
            activePins.forEach(function (elem) {
              elem.classList.remove('map__pin--active');
            });
          };

          inactivePin();
          target.classList.add('map__pin--active');

          var cardClose = card.querySelector('.popup__close');

          cardClose.addEventListener('click', function () {
            inactivePin();
            card.remove();
          });

          mapPins.addEventListener('keydown', function (evtKeydown) {
            if (evtKeydown.keyCode === window.data.ESC_KEYCODE) {
              evtKeydown.preventDefault();
              inactivePin();
              card.remove();
            }
          });
        }
      });
    }
  };

})();
