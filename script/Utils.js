var Utils = {

  extend: function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  },
  
  distance: function(x1, y1, x2, y2) {
    var dx,
        dy;
    if (arguments.length > 2) {
      dx = x1 - x2;
      dy = y1 - y2;

      return Math.sqrt(dx * dx + dy * dy);
    } else {
      dx = x1.x - y1.x;
      dy = x1.y - y1.y;

      return Math.sqrt(dx * dx + dy * dy);
    }
  },

  circWrappedDistance: function(a, b) {
    return this.wrappedDistance(a, b, Math.PI * 2);
  },

  wrappedDistance: function(a, b, max) {
    var l,
        r;
    if (a === b) return 0;
    else if (a < b) {
      l = -a - max + b;
      r = b - a;
    } else {
      l = b - a;
      r = max - a + b;
    }

    if (Math.abs(l) > Math.abs(r)) return r;
    else return l;
  },

  circWrap: function(val) {
    return this.wrap(val, 0, Math.PI * 2);
  },

  wrap: function(value, min, max) {
    if (value < min) return max + (value % max);
    if (value >= max) return value % max;
    return value;
  },

  wrapTo: function(value, target, max, step) {
    if (value === target) return target;

    var result = value;

    var d = this.wrappedDistance(value, target, max);

    if (Math.abs(d) < step) return target;

    result += (d < 0 ? -1 : 1) * step;

    if (result > max) {
      result = result - max;
    } else if (result < 0) {
      result = max + result;
    }

    return result;
  },

  circWrapTo: function(value, target, step) {
    return this.wrapTo(value, target, Math.PI * 2, step);
  }

};