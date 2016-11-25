// Forismatic provides an open, key-less API for quote generators
var url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";

// Wraps the color changing event
function applyRandomColor() {
  // Pre-determined set of colors
  var colors = ['#3498DB', '#7B7D7D', '#A93226', '#273746', '#797D7F', '#229954', '#FF5733', '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857", "#F1C40F"];
  function randomWholeNum() {
    return Math.floor(Math.random() * 21);
  }
  var currentNumber = randomWholeNum();
  $("body").animate({backgroundColor: colors[currentNumber]}, 'slow');
  $("blockquote").animate({color: colors[currentNumber]}, 'slow');
  $("blockquote:before").animate({color: colors[currentNumber]}, 'slow');
  $("body").animate({color: colors[currentNumber]}, 'slow');
  $("i").animate({color: colors[currentNumber]}, 'slow');
}

// Wraps the JSON call and string events
function updateQuoteEvent() {
  $.getJSON(url, function(json) {
    quote = JSON.stringify(json.quoteText);
    if (json.quoteAuthor.length > 0 ) {
      author = "&#151; " + JSON.stringify(json.quoteAuthor);
    } else {
      author = "&#151; Unknown";
    }
    $('#author').hide().html(author).fadeIn({queue: false, duration: 'slow'});
    $('#quote').hide().html(quote).fadeIn({queue: false, duration: 'slow'});
  });
  applyRandomColor();
}

function tweetQuote() {
  var tweet = quote + " @dentemple #freecodecamp https://goo.gl/eTaIAF";
	window.open("http://www.twitter.com/home/?status=" + tweet);
}

// Prevents an issue where the quote will only update on the first click
$.ajaxSetup({ cache: false });

// Main execution
$(document).ready(initializePage);
function initializePage(){
  updateQuoteEvent();
  $("#new-quote-button").on("click", updateQuoteEvent);
  $("#tweet-button").on("click", tweetQuote);
}