'use strict';

(function () {
  var STATUS_OK = 200;
  window.backend = {
    load: function (onLoad, onError, method, url, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open(method, url);
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

      xhr.send(data);
    }
  };
})();
