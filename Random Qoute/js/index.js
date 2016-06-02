$(document).ready(function() {
  quotePost();
  $('.btnclick').on('click', quotePost);
});

function removeTag(str, tag) {
  var regex = new RegExp('</?' + tag + '[^>]*>', 'g')
  return str.replace(regex, '').replace('\n', '');
};

function quotePost() {
  var s = ' ';
  $.ajax({
    headers: {
      "X-Mashape-Key": "khKYdQfTLamshfqxVTacC3ywbbUtp12cpFCjsnbGcDzMPmeYph",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/famous=',
    success: function(json) {
      s = JSON.parse(json);
      var quotes = removeTag(s.quote, 'p');
      $('.card-title').text("*** " + s.author);
      $('.gete').html(s.quote);
      $('.twtthequote').attr('href', "https://twitter.com/intent/tweet?hashtags=quotes,freecodecamp&text=" + encodeURIComponent('" ' + quotes + ' "') + '&via=twitterdev');
    }
  }).error(function() {
    console.log("error");
  });
}