/*
(function ($) {
 //...
})(jQuery);
*/
(function ($) {
  Drupal.behaviors.addLinkToColorboxCaption =  {
    attach: function(context, settings) {
      var titleArray = $('#cboxTitle').text().split("||");    
      if (titleArray.length > 1) {
        $('#cboxTitle').html(titleArray.join("<br />"));
      }
    }
  };
})(jQuery);
