;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function () {
    //$('#menu').jqDock();
    var dockOptions2 =
      { align: 'right' // vertical menu, with expansion LEFT from a fixed RIGHT edge
      , labels: true
      };
      $('#menu').jqDock(dockOptions2);
    
    var count = 0;
    var rows = 0;
    var cityblock;
    $(".locations").click(function() {
    	var toAdd = $("input:checked").val();
      $("footer").append("<p>"+toAdd+"</p>");
      window.open("about.html", "_parent");
    });
    
    $(".locator").click(function() {
      $("#searchbox").fadeOut(600, function() {
        $("#returnSearch").append(
          "<a href='about.html' title='HOME'>You searched: "+inputTrend+"<h3>  Search Again?</h3></a>");
      });
      var inputTrend;
    	inputTrend = $("input").val();
      //$("#returnSearch").append("<p>This search:"+inputTrend+"</p>");
      var twitter = new ctwitter.CTwitter();
      // coordinates of NYC, Los Angeles and Asheville
      var locationCoords = new Array("40.71455%2C-74.007118%2C3mi", "34.05349%2C-118.245323%2C10mi","35.598461%2C-82.553139%2C30mi");
      for (var i = 0; i<3; i++) {
        twitter.stream("statuses/filter", { location:[locationCoords[i]], track:[inputTrend] }, function (stream){
          stream.on("data", function(tweet) {
            console.log(tweet.text);
            if (count === 0){
              cityblock = ".losangeles";
            }
            if (count === 10){
              cityblock = ".asheville";
            }
            if (count === 20){
              cityblock = ".newyork";
            }
            console.log(count, cityblock);
            $(cityblock).append("<p class='tweet' style='display:block'>"+tweet.text+"</p>");
            //$(".tweet:eq("+count+")").fadeIn(1200);
            count = count + 1;
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
