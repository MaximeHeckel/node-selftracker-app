(function() {
  setInterval(function() {
    var now, timestamp;
    timestamp = new Date(2014, 8, 28);
    now = new Date();
    return $('#time').text(((now - timestamp) / 1000).toFixed(0));
  }, 1000);
}).call(this);
