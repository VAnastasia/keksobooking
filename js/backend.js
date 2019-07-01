'use strict';

(function () {
  var STATUS_OK = 200;

  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL);
      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_OK) {
          onLoad(xhr.response);
          window.backend.response = xhr.response;
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.addEventListener('timeout', function () {
        onError();
      });

      xhr.send();

      window.backend.response = xhr.response;
    },

    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_OK) {
          onLoad(xhr.response);
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.addEventListener('timeout', function () {
        onError();
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };

})();
