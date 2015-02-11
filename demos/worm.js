(function (exports) {
  var Vector = nature.Vector;
  var PI2 = Math.PI * 2;

  // accept degrees instead of radians
  var sin = nature.sin;
  var cos = nature.cos;

  function polarToCartesian (r, theta) {
    var x = r * cos(theta);
    var y = - r * sin(theta);

    return new Vector(x, y);
  }

  var Worm = nature.entityFactory(
    function step (scene) {
      var components = [
        sin(scene.age + this.phase) * this.amplitude,
        sin(scene.age + this.phase * 1.5) * this.amplitude,
      ];
      this.pos.y = scene.height / 2 + components.reduce(function (acc, cur) {
        return acc + cur;
      }) / components.length;
    },
    function init (scene) {
      this.amplitude = (scene.height) / 2 - this.radius;
      this.phase = this.pos.x / scene.width * 360;
    },
    {
      radius: 36
    }
  );

  new nature.Scene(
    function step (scene) {
      scene.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      scene.ctx.fillRect(0, 0, scene.width, scene.height);
    },
    function init (scene) {
      for (var x = 0; x <= scene.width; x += 12) {
        scene.entities.push(new Worm(scene, x, scene.height / 2));
      }
    }
  );
})(typeof nature === 'object' ? nature : (nature = {}));
