'use strict';

(function () {
  var typeOfferMap = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  var createCard = function (pin) {

    var cardTemplate = document.querySelector('#card')
          .content
          .querySelector('.map__card');

    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = pin.author.avatar;
    cardElement.querySelector('.popup__title').textContent = pin.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = pin.offer.price + '&#x20bd;<span>/ночь</span>';
    cardElement.querySelector('.popup__type').textContent = typeOfferMap[pin.offer.type];
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
      photos.style.display = 'none';
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

  var removeCard = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
    }
  };


  var renderCard = function () {

    var pins = document.querySelectorAll('.map__pin');
    var pinsArray = Array.from(pins);
    pinsArray.shift();

    pinsArray.forEach(function (pin) {
      pin.addEventListener('click', function () {

        var data = window.pins.pinsArray;
        var pinClicked = data.filter(function (elem) {
          return (elem.location.x - window.data.PIN_WIDTH * 0.5 + 'px') === pin.style.left && (elem.location.y - window.data.PIN_HEIGHT + 'px') === pin.style.top;
        });

        removeCard();
        createCard(pinClicked[0]);

        var card = document.querySelector('.map__card');
        var cardClose = card.querySelector('.popup__close');

        cardClose.addEventListener('click', function () {
          card.remove();
        });

      });
    });
  };

  window.card = {
    removeCard: removeCard,
    renderCard: renderCard
  };

})();
