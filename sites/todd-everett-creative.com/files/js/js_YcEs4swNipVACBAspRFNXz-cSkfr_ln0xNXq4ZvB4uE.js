
/**
 * @file
 * Written by Henri MEDOT <henri.medot[AT]absyx[DOT]fr>
 * http://www.absyx.fr
 *
 * Released under the GPLv2 license.
 */

(function(h){var k=function(a,b,c,d){a=a||0;if(a.pop){b=a[1];c=a[2];d=a[3];a=a[0]}this.x=a||0;this.y=b||0;this.width=c||0;this.height=d||0};h.extend(k,{MAP:[9,8,12,4,6,2,3,1],T:8,R:4,B:2,L:1});h.extend(k.prototype,{top:function(a){if(a!==undefined){this.height-=a-this.y;this.y=a;return this}return this.y},right:function(a){if(a!==undefined){this.width=a-this.x;return this}return this.x+this.width},bottom:function(a){if(a!==undefined){this.height=a-this.y;return this}return this.y+this.height},left:function(a){if(a!==
undefined){this.width-=a-this.x;this.x=a;return this}return this.x},location:function(a,b){if(a!==undefined){if(a.pop){b=a[1];a=a[0]}this.x=a;this.y=b;return this}return[this.x,this.y]},size:function(a,b){if(a!==undefined){if(a.pop){b=a[1];a=a[0]}this.width=a;this.height=b;return this}return[this.width,this.height]},scale:function(a,b){if(a.pop){b=a[1];a=a[0]}this.x*=a;this.y*=b;this.width*=a;this.height*=b;return this},intersection:function(a){this.left(Math.max(this.x,a.x));this.top(Math.max(this.y,
a.y));this.right(Math.min(this.right(),a.right()));this.bottom(Math.min(this.bottom(),a.bottom()));return this},union:function(a){this.left(Math.min(this.x,a.x));this.top(Math.min(this.y,a.y));this.right(Math.max(this.right(),a.right()));this.bottom(Math.max(this.bottom(),a.bottom()));return this},equals:function(a){return this.x==a.x&&this.y==a.y&&this.width==a.width&&this.height==a.height},contains:function(a){return this.union(a).equals(this)},setRect:function(a){this.x=a.x;this.y=a.y;this.width=
a.width;this.height=a.height;return this},clone:function(){return new k(this.x,this.y,this.width,this.height)},toArray:function(){return[this.x,this.y,this.width,this.height]},toCss:function(){var a=this.clone().round();return"rect("+a.y+"px "+(a.right()-1)+"px "+(a.bottom()-1)+"px "+a.x+"px)"},round:function(){var a=Math.round(this.right()),b=Math.round(this.bottom());this.x=Math.round(this.x);this.y=Math.round(this.y);return this.right(a).bottom(b)},isEmpty:function(){return this.width<=0||this.height<=
0},ifEmpty:function(a){return this.isEmpty()?this.setRect(a):this},applyTo:function(a){var b=this.clone().round();a.css({left:b.x,top:b.y}).width(b.width).height(b.height);return this},ratio:function(a,b){var c,d,e=k.MAP[b||0];if(a>1){c=Math.min(this.width,this.height*a);d=c/a}else{d=Math.min(this.height,this.width/a);c=d*a}if(e&k.R)this.x=this.right()-c;if(e&k.B)this.y=this.bottom()-d;this.width=c;this.height=d;return this},constraint:function(a){if(a.moveOnly){a.minRect&&this.location(Math.min(this.x,
a.minRect.x),Math.min(this.y,a.minRect.y)).location(Math.max(this.right(),a.minRect.right())-this.width,Math.max(this.bottom(),a.minRect.bottom())-this.height);a.maxRect&&this.location(Math.max(this.x,a.maxRect.x),Math.max(this.y,a.maxRect.y)).location(Math.min(this.right(),a.maxRect.right())-this.width,Math.min(this.bottom(),a.maxRect.bottom())-this.height)}else{var b=a.anchor||0,c=k.MAP[b];if(a.minRect){this.union(a.minRect);a.maxSize&&this.intersection((new l(a.minRect.right()-a.maxSize[0],a.minRect.bottom()-
a.maxSize[1])).right(a.minRect.x+a.maxSize[0]).bottom(a.minRect.y+a.maxSize[1]))}var d=this.width,e=this.height;if(a.minSize){d=Math.max(d,a.minSize[0]);e=Math.max(e,a.minSize[1])}if(a.maxSize){d=Math.min(d,a.maxSize[0]);e=Math.min(e,a.maxSize[1])}if(c&k.R)this.left(this.right()-d);else this.width=d;if(c&k.B)this.top(this.bottom()-e);else this.height=e;if(a.maxRect){a.minSize&&this.location(Math.max(this.x,a.maxRect.x+a.minSize[0]-this.width),Math.max(this.y,a.maxRect.y+a.minSize[1]-this.height)).location(Math.min(this.x,
a.maxRect.right()-a.minSize[0]),Math.min(this.y,a.maxRect.bottom()-a.minSize[1]));this.intersection(a.maxRect)}a.ratio&&this.ratio(a.ratio,b)}return this}});var l=k,p,q,n=function(){return h("<div></div>")},o=function(a){a.stopPropagation();a.preventDefault();return false},r=function(a,b,c){var d=b.offset();if(c){d.left+=b.width()/2;d.top+=b.height()/2}return[a.pageX-d.left,a.pageY-d.top]},s=function(a,b){for(var c=n().addClass("imgfocus-box imgfocus-"+a).appendTo(b).hide(),d=0;d<4;d++)n().addClass("imgfocus-border imgfocus-border-"+
d).appendTo(c);return c},t=function(a){a?q.css("cursor",a.css("cursor")).addClass("imgfocus-cursor"):q.css("cursor","auto").removeClass("imgfocus-cursor")},w={point:function(a){return r(a,this.wrapper)},unbindAll:function(){this.targets.unbind(".imgfocus");return this},setIdle:function(){var a=this.unbindAll();a.oldSelRect=a.selRect?a.selRect.clone():null;t();a.wrapper.bind("mousedown.imgfocus",function(b){var c=a.point(b);a.selRect=(new l(c[0],c[1],1,1)).constraint(a.constraints());a.repaint().setResize(4,
[0,0]);return o(b)});h.each(a.handles,function(b){(function(c,d,e){d.bind("mousedown.imgfocus",function(g){var i=r(g,d,true);c.setResize(e,i);return o(g)})})(a,h(this),b)});a.handle8.bind("mousedown.imgfocus",function(b){var c=r(b,a.handle8);a.setMove(c);return o(b)});return a},setResize:function(a,b){var c=this.unbindAll(),d=l.MAP[a],e=c.constraints((a+4)%8);t(c.handles[a]);p.bind("mousemove.imgfocus",function(g){var i=c.point(g);i[0]-=b[0];i[1]-=b[1];if(d&l.L)c.selRect.left(i[0]);else d&l.R&&c.selRect.right(i[0]);
if(d&l.T)c.selRect.top(i[1]);else d&l.B&&c.selRect.bottom(i[1]);c.selRect.constraint(e);c.repaint();return o(g)});return c.addMouseup()},setMove:function(a){var b=this.unbindAll(),c=b.constraints(true);t(b.handle8);p.bind("mousemove.imgfocus",function(d){var e=b.point(d);e[0]-=a[0];e[1]-=a[1];b.selRect.location(e).constraint(c);b.repaint();return o(d)});return b.addMouseup()},addMouseup:function(){var a=this;p.bind("mouseup.imgfocus",function(b){if(!a.oldSelRect||!a.selRect.equals(a.oldSelRect))a.$this.trigger("change");
a.setIdle();return o(b)});return a},constraints:function(a){var b=this.rules;if(a===true){b.moveOnly=true;b.anchor=0}else{b.moveOnly=false;b.anchor=a||0}return b},repaint:function(){var a=this.selRect;if(a&&!a.isEmpty()){a.applyTo(this.selBox.show());this.clipBox.show().css("clip",a.toCss())}else{this.selBox.hide();this.clipBox.hide()}return this},getSel:function(){return this.selRect?this.selRect.clone().scale(1/this.scale[0],1/this.scale[1]).round().constraint({minSize:[1,1]}).toArray():null},setSel:function(a){this.selRect=
a?(new k(a)).scale(this.scale).constraint(this.constraints()):null;return this.repaint().setIdle()}},u={_init:function(a){if(!p){p=h(document);q=h("html")}return this.each(function(){var b=h(this),c=b.data("imgfocus");if(!c){c=[b.width(),b.height()];var d=n().addClass("imgfocus-wrapper"),e=h("<img />").addClass("imgfocus-img").attr("src",b.attr("src")).appendTo(d);e=n().addClass("imgfocus-box imgfocus-clipbox").appendTo(d).append(e.clone()).hide();for(var g=s("minbox",d),i=s("maxbox",d),f=s("selbox",
d),j=[],m=0;m<8;m++)j[m]=n().addClass("imgfocus-resize imgfocus-handle imgfocus-handle-"+m).addClass(m%2==0?"imgfocus-resize-corner":"imgfocus-resize-side").appendTo(f);m=n().addClass("imgfocus-move imgfocus-handle").prependTo(f);var v=d.find(".imgfocus-handle").andSelf().add(document);d.insertAfter(b.hide());c=h.extend({$this:b,size:c,wrapper:d,clipBox:e,minBox:g,maxBox:i,selBox:f,handles:j,handle8:m,targets:v,sides:v.filter(".imgfocus-resize-side"),selRect:null,options:{}},w);b.data("imgfocus",
c)}b.imgfocus("options",a)})},options:function(a){a=a||{};return this.each(function(){var b=h(this).data("imgfocus"),c=h.extend(b.options,a),d=b.size,e=c.boxSize||[d[0],d[1]],g=c.realSize||[d[0],d[1]];e.pop||(e=[e,e]);e=(new l(0,0,e[0],e[1])).ratio(g[0]/g[1]);var i=e.clone();d=[e.width,e.height];g=b.scale=[d[0]/g[0],d[1]/g[1]];var f={};f.maxRect=e=(new l(c.maxRect)).scale(g).intersection(e).ifEmpty(e);f.maxSize=c.maxSize?[Math.max(0,Math.min(e.width,c.maxSize[0]*g[0])),Math.max(0,Math.min(e.height,
c.maxSize[1]*g[1]))]:[e.width,e.height];f.minRect=(new l(c.minRect)).scale(g).intersection(e);var j=f.minRect.size();if(f.minRect.isEmpty()){f.minRect=null;j=[0,0]}f.minSize=j=c.minSize?[Math.min(e.width,Math.max(j[0],c.minSize[0]*g[0])),Math.min(e.height,Math.max(j[1],c.minSize[1]*g[1]))]:j;f.ratio=c.ratio&&!f.minRect?j[0]>0&&j[1]>0?j[0]/j[1]:c.ratio*g[0]/g[1]:0;f.minSize=[Math.max(f.minSize[0],1),Math.max(f.minSize[1],1)];b.rules=f;b.wrapper.width(d[0]).height(d[1]);f.maxRect.equals(i)?b.maxBox.hide():
f.maxRect.applyTo(b.maxBox.show());f.minRect?f.minRect.applyTo(b.minBox.show()):b.minBox.hide();f.ratio?b.sides.hide():b.sides.show();b.selRect&&b.selRect.constraint(b.constraints());b.repaint().setIdle()})},selection:function(a){return a===undefined?this.data("imgfocus").getSel():this.each(function(){h(this).data("imgfocus").setSel(a)})}};h.fn.imgfocus=function(a){if(u[a])return u[a].apply(this,Array.prototype.slice.call(arguments,1));else if(typeof a=="object"||!a)return u._init.apply(this,arguments);
else throw"Method "+a+" does not exist on jQuery.imgfocus.";}})(jQuery);;
/**
 * @file
 * Written by Henri MEDOT <henri.medot[AT]absyx[DOT]fr>
 * http://www.absyx.fr
 */

(function($) {

  // Helper functions.
  var valToSel = function(val) {
    var sel = val.split(',');
    if (sel.length != 4) {
      return null;
    }

    for (var i = 0; i < 4; i++) {
      var v = Number(sel[i]);
      if (isNaN(v)) {
        return null;
      }
      sel[i] = Math.round(v);
    }

    if ((sel[0] < 0) || (sel[1] < 0) || (sel[2] <= 0) || (sel[3] <= 0)) {
      return null;
    }

    return sel;
  };

  var selToVal = function(sel) {
    return (sel) ? sel.join(',') : '';
  };
  //~Helper functions.



  // Drupal behavior.
  Drupal.behaviors.imagefield_focus = {
    attach: function(context) {
      $('.imagefield-focus.focus-box', context).once('imagefield_focus', function() {
        var $this = $(this);
        var img = $('> img', $this);
        var inputs = $('input.imagefield-focus', $this.parent());
        var fieldName = inputs.attr('name').replace(/^([a-z0-9_]+)\[.+$/, '$1');
        var settings = Drupal.settings.imagefield_focus[fieldName];

        var minSize, ratio;
        if (settings.min_width && settings.min_height) {
          minSize = [settings.min_width, settings.min_height];
          ratio = settings.lock_ratio;
        }

        var options = {
          boxSize: $this.width() || parseInt($this.css('min-width')),
          realSize: img.attr('alt').split('x'),
          minSize: minSize
        };
        img.css('display', 'block').imgfocus(options);

        inputs.focus(function(e, init) {
          img.unbind('change.imagefield-focus');
          var input = $(this).addClass('active');
          var other = inputs.eq((inputs.index(input) + 1) % 2).removeClass('active');
          var otherSel = valToSel(other.val());
          var options = (input.hasClass('crop-rect')) ? {
            ratio: 0,
            minRect: otherSel,
            maxRect: null
          } : {
            ratio: ratio,
            minRect: null,
            maxRect: otherSel
          };
          img.imgfocus('options', options).imgfocus('selection', valToSel(input.val()));
          img.bind('change.imagefield-focus', function() {
            input.val(selToVal(img.imgfocus('selection')));
          });

          if (init) {
            e.stopPropagation();
            e.preventDefault();
            return false;
          }
        }).change(function() {
          $(this).val(selToVal(img.imgfocus('selection', valToSel($(this).val())).imgfocus('selection')));
        });

        inputs.eq(0).trigger('focus', [true]);
      });
    }
  };
  //~Drupal behavior.

})(jQuery);
;
(function ($) {

/**
 * Attaches the autocomplete behavior to all required fields.
 */
Drupal.behaviors.autocomplete = {
  attach: function (context, settings) {
    var acdb = [];
    $('input.autocomplete', context).once('autocomplete', function () {
      var uri = this.value;
      if (!acdb[uri]) {
        acdb[uri] = new Drupal.ACDB(uri);
      }
      var $input = $('#' + this.id.substr(0, this.id.length - 13))
        .attr('autocomplete', 'OFF')
        .attr('aria-autocomplete', 'list');
      $($input[0].form).submit(Drupal.autocompleteSubmit);
      $input.parent()
        .attr('role', 'application')
        .append($('<span class="element-invisible" aria-live="assertive"></span>')
          .attr('id', $input.attr('id') + '-autocomplete-aria-live')
        );
      new Drupal.jsAC($input, acdb[uri]);
    });
  }
};

/**
 * Prevents the form from submitting if the suggestions popup is open
 * and closes the suggestions popup when doing so.
 */
Drupal.autocompleteSubmit = function () {
  return $('#autocomplete').each(function () {
    this.owner.hidePopup();
  }).length == 0;
};

/**
 * An AutoComplete object.
 */
Drupal.jsAC = function ($input, db) {
  var ac = this;
  this.input = $input[0];
  this.ariaLive = $('#' + this.input.id + '-autocomplete-aria-live');
  this.db = db;

  $input
    .keydown(function (event) { return ac.onkeydown(this, event); })
    .keyup(function (event) { ac.onkeyup(this, event); })
    .blur(function () { ac.hidePopup(); ac.db.cancel(); });

};

/**
 * Handler for the "keydown" event.
 */
Drupal.jsAC.prototype.onkeydown = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 40: // down arrow.
      this.selectDown();
      return false;
    case 38: // up arrow.
      this.selectUp();
      return false;
    default: // All other keys.
      return true;
  }
};

/**
 * Handler for the "keyup" event.
 */
Drupal.jsAC.prototype.onkeyup = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 16: // Shift.
    case 17: // Ctrl.
    case 18: // Alt.
    case 20: // Caps lock.
    case 33: // Page up.
    case 34: // Page down.
    case 35: // End.
    case 36: // Home.
    case 37: // Left arrow.
    case 38: // Up arrow.
    case 39: // Right arrow.
    case 40: // Down arrow.
      return true;

    case 9:  // Tab.
    case 13: // Enter.
    case 27: // Esc.
      this.hidePopup(e.keyCode);
      return true;

    default: // All other keys.
      if (input.value.length > 0 && !input.readOnly) {
        this.populatePopup();
      }
      else {
        this.hidePopup(e.keyCode);
      }
      return true;
  }
};

/**
 * Puts the currently highlighted suggestion into the autocomplete field.
 */
Drupal.jsAC.prototype.select = function (node) {
  this.input.value = $(node).data('autocompleteValue');
};

/**
 * Highlights the next suggestion.
 */
Drupal.jsAC.prototype.selectDown = function () {
  if (this.selected && this.selected.nextSibling) {
    this.highlight(this.selected.nextSibling);
  }
  else if (this.popup) {
    var lis = $('li', this.popup);
    if (lis.length > 0) {
      this.highlight(lis.get(0));
    }
  }
};

/**
 * Highlights the previous suggestion.
 */
Drupal.jsAC.prototype.selectUp = function () {
  if (this.selected && this.selected.previousSibling) {
    this.highlight(this.selected.previousSibling);
  }
};

/**
 * Highlights a suggestion.
 */
Drupal.jsAC.prototype.highlight = function (node) {
  if (this.selected) {
    $(this.selected).removeClass('selected');
  }
  $(node).addClass('selected');
  this.selected = node;
  $(this.ariaLive).html($(this.selected).html());
};

/**
 * Unhighlights a suggestion.
 */
Drupal.jsAC.prototype.unhighlight = function (node) {
  $(node).removeClass('selected');
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Hides the autocomplete suggestions.
 */
Drupal.jsAC.prototype.hidePopup = function (keycode) {
  // Select item if the right key or mousebutton was pressed.
  if (this.selected && ((keycode && keycode != 46 && keycode != 8 && keycode != 27) || !keycode)) {
    this.input.value = $(this.selected).data('autocompleteValue');
  }
  // Hide popup.
  var popup = this.popup;
  if (popup) {
    this.popup = null;
    $(popup).fadeOut('fast', function () { $(popup).remove(); });
  }
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Positions the suggestions popup and starts a search.
 */
Drupal.jsAC.prototype.populatePopup = function () {
  var $input = $(this.input);
  var position = $input.position();
  // Show popup.
  if (this.popup) {
    $(this.popup).remove();
  }
  this.selected = false;
  this.popup = $('<div id="autocomplete"></div>')[0];
  this.popup.owner = this;
  $(this.popup).css({
    top: parseInt(position.top + this.input.offsetHeight, 10) + 'px',
    left: parseInt(position.left, 10) + 'px',
    width: $input.innerWidth() + 'px',
    display: 'none'
  });
  $input.before(this.popup);

  // Do search.
  this.db.owner = this;
  this.db.search(this.input.value);
};

/**
 * Fills the suggestion popup with any matches received.
 */
Drupal.jsAC.prototype.found = function (matches) {
  // If no value in the textfield, do not show the popup.
  if (!this.input.value.length) {
    return false;
  }

  // Prepare matches.
  var ul = $('<ul></ul>');
  var ac = this;
  for (key in matches) {
    $('<li></li>')
      .html($('<div></div>').html(matches[key]))
      .mousedown(function () { ac.select(this); })
      .mouseover(function () { ac.highlight(this); })
      .mouseout(function () { ac.unhighlight(this); })
      .data('autocompleteValue', key)
      .appendTo(ul);
  }

  // Show popup with matches, if any.
  if (this.popup) {
    if (ul.children().length) {
      $(this.popup).empty().append(ul).show();
      $(this.ariaLive).html(Drupal.t('Autocomplete popup'));
    }
    else {
      $(this.popup).css({ visibility: 'hidden' });
      this.hidePopup();
    }
  }
};

Drupal.jsAC.prototype.setStatus = function (status) {
  switch (status) {
    case 'begin':
      $(this.input).addClass('throbbing');
      $(this.ariaLive).html(Drupal.t('Searching for matches...'));
      break;
    case 'cancel':
    case 'error':
    case 'found':
      $(this.input).removeClass('throbbing');
      break;
  }
};

/**
 * An AutoComplete DataBase object.
 */
Drupal.ACDB = function (uri) {
  this.uri = uri;
  this.delay = 300;
  this.cache = {};
};

/**
 * Performs a cached and delayed search.
 */
Drupal.ACDB.prototype.search = function (searchString) {
  var db = this;
  this.searchString = searchString;

  // See if this string needs to be searched for anyway.
  searchString = searchString.replace(/^\s+|\s+$/, '');
  if (searchString.length <= 0 ||
    searchString.charAt(searchString.length - 1) == ',') {
    return;
  }

  // See if this key has been searched for before.
  if (this.cache[searchString]) {
    return this.owner.found(this.cache[searchString]);
  }

  // Initiate delayed search.
  if (this.timer) {
    clearTimeout(this.timer);
  }
  this.timer = setTimeout(function () {
    db.owner.setStatus('begin');

    // Ajax GET request for autocompletion. We use Drupal.encodePath instead of
    // encodeURIComponent to allow autocomplete search terms to contain slashes.
    $.ajax({
      type: 'GET',
      url: db.uri + '/' + Drupal.encodePath(searchString),
      dataType: 'json',
      success: function (matches) {
        if (typeof matches.status == 'undefined' || matches.status != 0) {
          db.cache[searchString] = matches;
          // Verify if these are still the matches the user wants to see.
          if (db.searchString == searchString) {
            db.owner.found(matches);
          }
          db.owner.setStatus('found');
        }
      },
      error: function (xmlhttp) {
        alert(Drupal.ajaxError(xmlhttp, db.uri));
      }
    });
  }, this.delay);
};

/**
 * Cancels the current autocomplete request.
 */
Drupal.ACDB.prototype.cancel = function () {
  if (this.owner) this.owner.setStatus('cancel');
  if (this.timer) clearTimeout(this.timer);
  this.searchString = '';
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;

(function ($) {

/**
 * Auto-hide summary textarea if empty and show hide and unhide links.
 */
Drupal.behaviors.textSummary = {
  attach: function (context, settings) {
    $('.text-summary', context).once('text-summary', function () {
      var $widget = $(this).closest('div.field-type-text-with-summary');
      var $summaries = $widget.find('div.text-summary-wrapper');

      $summaries.once('text-summary-wrapper').each(function(index) {
        var $summary = $(this);
        var $summaryLabel = $summary.find('label');
        var $full = $widget.find('.text-full').eq(index).closest('.form-item');
        var $fullLabel = $full.find('label');

        // Create a placeholder label when the field cardinality is
        // unlimited or greater than 1.
        if ($fullLabel.length == 0) {
          $fullLabel = $('<label></label>').prependTo($full);
        }

        // Setup the edit/hide summary link.
        var $link = $('<span class="field-edit-link">(<a class="link-edit-summary" href="#">' + Drupal.t('Hide summary') + '</a>)</span>').toggle(
          function () {
            $summary.hide();
            $(this).find('a').html(Drupal.t('Edit summary')).end().appendTo($fullLabel);
            return false;
          },
          function () {
            $summary.show();
            $(this).find('a').html(Drupal.t('Hide summary')).end().appendTo($summaryLabel);
            return false;
          }
        ).appendTo($summaryLabel);

        // If no summary is set, hide the summary field.
        if ($(this).find('.text-summary').val() == '') {
          $link.click();
        }
        return;
      });
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * Automatically display the guidelines of the selected text format.
 */
Drupal.behaviors.filterGuidelines = {
  attach: function (context) {
    $('.filter-guidelines', context).once('filter-guidelines')
      .find(':header').hide()
      .closest('.filter-wrapper').find('select.filter-list')
      .bind('change', function () {
        $(this).closest('.filter-wrapper')
          .find('.filter-guidelines-item').hide()
          .siblings('.filter-guidelines-' + this.value).show();
      })
      .change();
  }
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 * Provides JavaScript additions to the managed file field type.
 *
 * This file provides progress bar support (if available), popup windows for
 * file previews, and disabling of other file fields during Ajax uploads (which
 * prevents separate file fields from accidentally uploading files).
 */

(function ($) {

/**
 * Attach behaviors to managed file element upload fields.
 */
Drupal.behaviors.fileValidateAutoAttach = {
  attach: function (context, settings) {
    if (settings.file && settings.file.elements) {
      $.each(settings.file.elements, function(selector) {
        var extensions = settings.file.elements[selector];
        $(selector, context).bind('change', {extensions: extensions}, Drupal.file.validateExtension);
      });
    }
  },
  detach: function (context, settings) {
    if (settings.file && settings.file.elements) {
      $.each(settings.file.elements, function(selector) {
        $(selector, context).unbind('change', Drupal.file.validateExtension);
      });
    }
  }
};

/**
 * Attach behaviors to the file upload and remove buttons.
 */
Drupal.behaviors.fileButtons = {
  attach: function (context) {
    $('input.form-submit', context).bind('mousedown', Drupal.file.disableFields);
    $('div.form-managed-file input.form-submit', context).bind('mousedown', Drupal.file.progressBar);
  },
  detach: function (context) {
    $('input.form-submit', context).unbind('mousedown', Drupal.file.disableFields);
    $('div.form-managed-file input.form-submit', context).unbind('mousedown', Drupal.file.progressBar);
  }
};

/**
 * Attach behaviors to links within managed file elements.
 */
Drupal.behaviors.filePreviewLinks = {
  attach: function (context) {
    $('div.form-managed-file .file a, .file-widget .file a', context).bind('click',Drupal.file.openInNewWindow);
  },
  detach: function (context){
    $('div.form-managed-file .file a, .file-widget .file a', context).unbind('click', Drupal.file.openInNewWindow);
  }
};

/**
 * File upload utility functions.
 */
Drupal.file = Drupal.file || {
  /**
   * Client-side file input validation of file extensions.
   */
  validateExtension: function (event) {
    // Remove any previous errors.
    $('.file-upload-js-error').remove();

    // Add client side validation for the input[type=file].
    var extensionPattern = event.data.extensions.replace(/,\s*/g, '|');
    if (extensionPattern.length > 1 && this.value.length > 0) {
      var acceptableMatch = new RegExp('\\.(' + extensionPattern + ')$', 'gi');
      if (!acceptableMatch.test(this.value)) {
        var error = Drupal.t("The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.", {
          // According to the specifications of HTML5, a file upload control
          // should not reveal the real local path to the file that a user
          // has selected. Some web browsers implement this restriction by
          // replacing the local path with "C:\fakepath\", which can cause
          // confusion by leaving the user thinking perhaps Drupal could not
          // find the file because it messed up the file path. To avoid this
          // confusion, therefore, we strip out the bogus fakepath string.
          '%filename': this.value.replace('C:\\fakepath\\', ''),
          '%extensions': extensionPattern.replace(/\|/g, ', ')
        });
        $(this).closest('div.form-managed-file').prepend('<div class="messages error file-upload-js-error">' + error + '</div>');
        this.value = '';
        return false;
      }
    }
  },
  /**
   * Prevent file uploads when using buttons not intended to upload.
   */
  disableFields: function (event){
    var clickedButton = this;

    // Only disable upload fields for Ajax buttons.
    if (!$(clickedButton).hasClass('ajax-processed')) {
      return;
    }

    // Check if we're working with an "Upload" button.
    var $enabledFields = [];
    if ($(this).closest('div.form-managed-file').length > 0) {
      $enabledFields = $(this).closest('div.form-managed-file').find('input.form-file');
    }

    // Temporarily disable upload fields other than the one we're currently
    // working with. Filter out fields that are already disabled so that they
    // do not get enabled when we re-enable these fields at the end of behavior
    // processing. Re-enable in a setTimeout set to a relatively short amount
    // of time (1 second). All the other mousedown handlers (like Drupal's Ajax
    // behaviors) are excuted before any timeout functions are called, so we
    // don't have to worry about the fields being re-enabled too soon.
    // @todo If the previous sentence is true, why not set the timeout to 0?
    var $fieldsToTemporarilyDisable = $('div.form-managed-file input.form-file').not($enabledFields).not(':disabled');
    $fieldsToTemporarilyDisable.attr('disabled', 'disabled');
    setTimeout(function (){
      $fieldsToTemporarilyDisable.attr('disabled', false);
    }, 1000);
  },
  /**
   * Add progress bar support if possible.
   */
  progressBar: function (event) {
    var clickedButton = this;
    var $progressId = $(clickedButton).closest('div.form-managed-file').find('input.file-progress');
    if ($progressId.length) {
      var originalName = $progressId.attr('name');

      // Replace the name with the required identifier.
      $progressId.attr('name', originalName.match(/APC_UPLOAD_PROGRESS|UPLOAD_IDENTIFIER/)[0]);

      // Restore the original name after the upload begins.
      setTimeout(function () {
        $progressId.attr('name', originalName);
      }, 1000);
    }
    // Show the progress bar if the upload takes longer than half a second.
    setTimeout(function () {
      $(clickedButton).closest('div.form-managed-file').find('div.ajax-progress-bar').slideDown();
    }, 500);
  },
  /**
   * Open links to files within forms in a new window.
   */
  openInNewWindow: function (event) {
    $(this).attr('target', '_blank');
    window.open(this.href, 'filePreview', 'toolbar=0,scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1,width=500,height=550');
    return false;
  }
};

})(jQuery);
;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.menuFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.menu-link-form', context).drupalSetSummary(function (context) {
      if ($('.form-item-menu-enabled input', context).is(':checked')) {
        return Drupal.checkPlain($('.form-item-menu-link-title input', context).val());
      }
      else {
        return Drupal.t('Not in menu');
      }
    });
  }
};

/**
 * Automatically fill in a menu link title, if possible.
 */
Drupal.behaviors.menuLinkAutomaticTitle = {
  attach: function (context) {
    $('fieldset.menu-link-form', context).each(function () {
      // Try to find menu settings widget elements as well as a 'title' field in
      // the form, but play nicely with user permissions and form alterations.
      var $checkbox = $('.form-item-menu-enabled input', this);
      var $link_title = $('.form-item-menu-link-title input', context);
      var $title = $(this).closest('form').find('.form-item-title input');
      // Bail out if we do not have all required fields.
      if (!($checkbox.length && $link_title.length && $title.length)) {
        return;
      }
      // If there is a link title already, mark it as overridden. The user expects
      // that toggling the checkbox twice will take over the node's title.
      if ($checkbox.is(':checked') && $link_title.val().length) {
        $link_title.data('menuLinkAutomaticTitleOveridden', true);
      }
      // Whenever the value is changed manually, disable this behavior.
      $link_title.keyup(function () {
        $link_title.data('menuLinkAutomaticTitleOveridden', true);
      });
      // Global trigger on checkbox (do not fill-in a value when disabled).
      $checkbox.change(function () {
        if ($checkbox.is(':checked')) {
          if (!$link_title.data('menuLinkAutomaticTitleOveridden')) {
            $link_title.val($title.val());
          }
        }
        else {
          $link_title.val('');
          $link_title.removeData('menuLinkAutomaticTitleOveridden');
        }
        $checkbox.closest('fieldset.vertical-tabs-pane').trigger('summaryUpdated');
        $checkbox.trigger('formUpdated');
      });
      // Take over any title change.
      $title.keyup(function () {
        if (!$link_title.data('menuLinkAutomaticTitleOveridden') && $checkbox.is(':checked')) {
          $link_title.val($title.val());
          $link_title.val($title.val()).trigger('formUpdated');
        }
      });
    });
  }
};

})(jQuery);
;

/**
 * @file
 * Attaches behaviors for the Path module.
 */

(function ($) {

Drupal.behaviors.pathFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.path-form', context).drupalSetSummary(function (context) {
      var path = $('.form-item-path-alias input').val();

      return path ?
        Drupal.t('Alias: @alias', { '@alias': path }) :
        Drupal.t('No alias');
    });
  }
};

})(jQuery);
;

(function ($) {

Drupal.behaviors.commentFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.comment-node-settings-form', context).drupalSetSummary(function (context) {
      return Drupal.checkPlain($('.form-item-comment input:checked', context).next('label').text());
    });

    // Provide the summary for the node type form.
    $('fieldset.comment-node-type-settings-form', context).drupalSetSummary(function(context) {
      var vals = [];

      // Default comment setting.
      vals.push($(".form-item-comment select option:selected", context).text());

      // Threading.
      var threading = $(".form-item-comment-default-mode input:checked", context).next('label').text();
      if (threading) {
        vals.push(threading);
      }

      // Comments per page.
      var number = $(".form-item-comment-default-per-page select option:selected", context).val();
      vals.push(Drupal.t('@number comments per page', {'@number': number}));

      return Drupal.checkPlain(vals.join(', '));
    });
  }
};

})(jQuery);
;

(function ($) {

Drupal.behaviors.nodeFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.node-form-revision-information', context).drupalSetSummary(function (context) {
      var revisionCheckbox = $('.form-item-revision input', context);

      // Return 'New revision' if the 'Create new revision' checkbox is checked,
      // or if the checkbox doesn't exist, but the revision log does. For users
      // without the "Administer content" permission the checkbox won't appear,
      // but the revision log will if the content type is set to auto-revision.
      if (revisionCheckbox.is(':checked') || (!revisionCheckbox.length && $('.form-item-log textarea', context).length)) {
        return Drupal.t('New revision');
      }

      return Drupal.t('No revision');
    });

    $('fieldset.node-form-author', context).drupalSetSummary(function (context) {
      var name = $('.form-item-name input', context).val() || Drupal.settings.anonymous,
        date = $('.form-item-date input', context).val();
      return date ?
        Drupal.t('By @name on @date', { '@name': name, '@date': date }) :
        Drupal.t('By @name', { '@name': name });
    });

    $('fieldset.node-form-options', context).drupalSetSummary(function (context) {
      var vals = [];

      $('input:checked', context).parent().each(function () {
        vals.push(Drupal.checkPlain($.trim($(this).text())));
      });

      if (!$('.form-item-status input', context).is(':checked')) {
        vals.unshift(Drupal.t('Not published'));
      }
      return vals.join(', ');
    });
  }
};

})(jQuery);
;
