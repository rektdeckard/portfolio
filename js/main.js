// main javascript file
$(document).ready(function() {
  var $window = $(window);
  var lastScrollTop = 0;
  var scrollDirection = '';

  var lastCSSColors = {};

  function showImages(el) {
    var windowHeight = $window.height();

    $(el).each(function() {
      var thisPos = $(this).offset().top;
      var topOfWindow = $window.scrollTop();

      if ((topOfWindow + windowHeight - 64) > thisPos) {
        $(this).addClass('fade-in');
      }
    });
  }
