(function() {
  setInterval(function() {
    var now, timestamp;
    timestamp = new Date(2014, 9, 3);
    now = new Date();
    var timeDiff = Math.abs(now.getTime() - timestamp.getTime());
    return $('#time').text((timeDiff / 1000).toFixed(2));
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
