/*
 * imgPreview jQuery plugin
 * Copyright (c) 2009 James Padolsey
 * j@qd9.co.uk | http://james.padolsey.com
 * Dual licensed under MIT and GPL.
 * Updated: 09/02/09
 * @author James Padolsey
 * @version 0.22
 */
(function(c){c.expr[':'].linkingToImage=function(a,g,e){return!!(c(a).attr(e[3])&&c(a).attr(e[3]).match(/\.(gif|jpe?g|png|bmp)$/i))};c.fn.imgPreview=function(j){var b=c.extend({imgCSS:{},distanceFromCursor:{top:10,left:10},preloadImages:true,onShow:function(){},onHide:function(){},onLoad:function(){},containerID:'imgPreviewContainer',containerLoadingClass:'loading',thumbPrefix:'',srcAttr:'href'},j),d=c('<div/>').attr('id',b.containerID).append('<img/>').hide().css('position','absolute').appendTo('body'),f=c('img',d).css(b.imgCSS),h=this.filter(':linkingToImage('+b.srcAttr+')');function i(a){return a.replace(/(\/?)([^\/]+)$/,'$1'+b.thumbPrefix+'$2')}if(b.preloadImages){(function(a){var g=new Image(),e=arguments.callee;g.src=i(c(h[a]).attr(b.srcAttr));g.onload=function(){h[a+1]&&e(a+1)}})(0)}h.mousemove(function(a){d.css({top:a.pageY+b.distanceFromCursor.top+'px',left:a.pageX+b.distanceFromCursor.left+'px'})}).hover(function(){var a=this;d.addClass(b.containerLoadingClass).show();f.load(function(){d.removeClass(b.containerLoadingClass);f.show();b.onLoad.call(f[0],a)}).attr('src',i(c(a).attr(b.srcAttr)));b.onShow.call(d[0],a)},function(){d.hide();f.unbind('load').attr('src','').hide();b.onHide.call(d[0],this)});return this}})(jQuery);
;
/**
 * @file
 * Attaches behaviors for the Contextual module.
 */

(function ($) {

Drupal.contextualLinks = Drupal.contextualLinks || {};

/**
 * Attaches outline behavior for regions associated with contextual links.
 */
Drupal.behaviors.contextualLinks = {
  attach: function (context) {
    $('div.contextual-links-wrapper', context).once('contextual-links', function () {
      var $wrapper = $(this);
      var $region = $wrapper.closest('.contextual-links-region');
      var $links = $wrapper.find('ul.contextual-links');
      var $trigger = $('<a class="contextual-links-trigger" href="#" />').text(Drupal.t('Configure')).click(
        function () {
          $links.stop(true, true).slideToggle(100);
          $wrapper.toggleClass('contextual-links-active');
          return false;
        }
      );
      // Attach hover behavior to trigger and ul.contextual-links.
      $trigger.add($links).hover(
        function () { $region.addClass('contextual-links-region-active'); },
        function () { $region.removeClass('contextual-links-region-active'); }
      );
      // Hide the contextual links when user clicks a link or rolls out of the .contextual-links-region.
      $region.bind('mouseleave click', Drupal.contextualLinks.mouseleave);
      // Prepend the trigger.
      $wrapper.prepend($trigger);
    });
  }
};

/**
 * Disables outline for the region contextual links are associated with.
 */
Drupal.contextualLinks.mouseleave = function () {
  $(this)
    .find('.contextual-links-active').removeClass('contextual-links-active')
    .find('ul.contextual-links').hide();
};

})(jQuery);
;
