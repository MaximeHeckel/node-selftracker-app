(function() {
  setInterval(function() {
    var now, timestamp;
    timestamp = new Date(2014, 8, 28);
    now = new Date();
    return $('#time').text(((now - timestamp) / 1000).toFixed(2));
  }, 40);
}).call(this);

(function() {
  setInterval(function() {
    var now, timestamp;
    timestamp = new Date(1992, 5, 15);
    now = new Date();
    return $('#age').text((((now - timestamp) / 1000)/3600/24/365).toFixed(10));
  }, 50);
}).call(this);
