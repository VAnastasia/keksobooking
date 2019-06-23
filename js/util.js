'use strict';

(function () {
  window.util = {
    getRandomItem: function (array) {
      return array[Math.round(Math.random() * (array.length - 1))];
    },

    getRandomNumber: function (start, finish) {
      return Math.round(Math.random() * (Math.abs(finish - start)) + start);
    },

    shuffle: function (arr) {
      var j;
      var temp;
      for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    }
  };
})();
