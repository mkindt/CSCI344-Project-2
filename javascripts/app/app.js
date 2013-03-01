/*global $, ctwitter, console, window, document, jQuery*/
(function () {
  'use strict';
  var $, $doc, dockOptions2, twitter, locationCoords, count, cityblock, inputTrend, i;
  $ = window.$;

  $(document).ready(function () {
    // vertical menu, with expansion LEFT from a fixed RIGHT edge
    dockOptions2 = { align: 'right', labels: true };
    $('#menu').jqDock(dockOptions2);
    count = 0;
    $(".locator").click(function () {
      $("#searchbox").fadeOut(600, function () {
        $("#returnSearch").append(
          "<a href='about.html' title='HOME'>You searched: " + inputTrend + "<h3>  Search Again?</h3></a>"
        );
      });
      inputTrend = $("input").val();
      //$("#returnSearch").append("<p>This search:"+inputTrend+"</p>");
      twitter = new ctwitter.CTwitter();
      // coordinates of NYC, Los Angeles and Asheville
      locationCoords = ["40.71455%2C-74.007118%2C3mi", "34.05349%2C-118.245323%2C10mi", "35.598461%2C-82.553139%2C30mi"];
      function locationStream() {
        twitter.stream("statuses/filter", { location: [locationCoords[i]], track: [inputTrend] }, function (stream) {
          stream.on("data", function (tweet) {
            console.log(tweet.text);
            if (count === 0) {
              cityblock = ".losangeles";
            }
            if (count === 10) {
              cityblock = ".asheville";
            }
            if (count === 20) {
              cityblock = ".newyork";
            }
            console.log(count, cityblock);
            $(cityblock).append("<p class='tweet' style='display:block'>" + tweet.text + "</p>");
            //$(".tweet:eq("+count+")").fadeIn(1200);
            count = count + 1;
          });
        });
      }
      for (i = 0; i < 3; i = i + 1) {
        locationStream();
      }
    });
  });
  $doc = $(document);
}(jQuery));