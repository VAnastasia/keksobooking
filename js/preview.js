'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PREVIEW_AVATAR_DEFAULT = 'img/muffin-grey.svg';

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview');
  var previewImage = preview.querySelector('img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewImage.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  var removePreview = function (images) {
    if (images) {
      images.forEach(function (image) {
        image.remove();
      });
    }
  };

  photoChooser.addEventListener('change', function () {
    var images = photoPreview.querySelectorAll('img');
    removePreview(images);

    var files = Array.from(photoChooser.files);

    files.forEach(function (elem) {
      var fileName = elem.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var readerPhoto = new FileReader();

        readerPhoto.addEventListener('load', function () {
          var photo = document.createElement('img');
          photo.width = '70';
          photo.height = '70';
          photoPreview.appendChild(photo);
          photo.src = readerPhoto.result;
        });

        readerPhoto.readAsDataURL(elem);
      }
    });
  });

  window.preview = {
    previewAvatarDefault: PREVIEW_AVATAR_DEFAULT,
    removePreview: removePreview
  };

})();
