;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $.fn.placeholder                ? $('input, textarea').placeholder() : null;
     
    $('#menu').jqDock();
    
    var count = 0;
    var rows = 0;

    $(".locations").click(function() {
    	var toAdd = $("input:checked").val();
      $("footer").append("<p>"+toAdd+"</p>");
      window.open("about.html", "_parent");
    });
    
    $(".locator").click(function() {
      var placeName = new Array();
    	placeName[0] = $("input").val();
      $("footer").append("<p>"+placeName+"</p>");
      placeName[1] = "boston";
      placeName[2] = "atlanta";    
      var twitter = new ctwitter.CTwitter();
      for (var i = 0; i<3; i++) {
      console.log(placeName[i]);
      twitter.stream("statuses/filter", { track:[placeName[i]] }, function (stream){
        stream.on("data", function(tweet) {
          console.log(tweet.text);
          if (count < 10){
            $(".content").append("<p class='tweet' style='display:none'>"+tweet.text+"</p>");
            $(".tweet:eq("+count+")").fadeIn(1200);
            count = count + 1;
          }
          else {
            if (rows===10){
              rows = 0;
            }
            $(".tweet:eq("+rows+")").fadeOut(600, function() {
              $(".tweet:eq("+rows+")").replaceWith(
                "<p class='tweet' style='display:none'>"+tweet.text+"</p>");
                $(".tweet:eq("+rows+")").fadeIn(600);
                rows = rows + 1;
            });
          }
        });
      });
    }
    });   
  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

})(jQuery, this);
