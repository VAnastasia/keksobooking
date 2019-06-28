'use strict';

(function () {
  var typeOffer = {
    bungalo: 'бунгало',
    flat: 'квартира',
    house: 'дом',
    palace: 'дворец'
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
    cardElement.querySelector('.popup__type').textContent = typeOffer[pin.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = pin.offer.description;
    cardElement.querySelector('.popup__photo').src = pin.offer.photos[0];

    var main = document.querySelector('main');
    var fragment = document.createDocumentFragment();

    fragment.appendChild(cardElement);
    main.appendChild(fragment);
  };


  var renderCard = function () {

    var pins = document.querySelectorAll('.map__pin');

    pins.forEach(function (pin) {
      pin.addEventListener('click', function () {

        var response = window.backend.response;
        var pinClicked = response.filter(function (elem) {
          return (elem.location.x === parseInt(pin.dataset.x, 10) && elem.location.y === parseInt(pin.dataset.y, 10));
        });

        var card = document.querySelector('.map__card');

        if (card) {
          card.remove();
        }

        createCard(pinClicked[0]);

        card = document.querySelector('.map__card');
        var cardClose = card.querySelector('.popup__close');

        cardClose.addEventListener('click', function () {
          card.remove();
        });

      });
    });

  };

  renderCard();

  window.card = {
    renderCard: renderCard
  };

})();
