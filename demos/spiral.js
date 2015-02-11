(function (exports) {
  var Vector = nature.Vector;

  // accept degrees instead of radians
  var sin = nature.sin;
  var cos = nature.cos;

  function polarToCartesian (r, theta) {
    var x = r * cos(theta);
    var y = - r * sin(theta);

    return new Vector(x, y);
  }

  var Spiral = nature.entityFactory(
    function step (scene) {
      this.angle += this.angularVelocity;
      this.pos = this.pos.plus(polarToCartesian(this.r, this.angle));
      this.r += 0.01;
    },
    function init () {
      this.angle = 0;
      this.angularVelocity = 2;
      this.r = 1;
    },
    {
      radius: 18
    }
  );

  new nature.Scene(
    null,
    function init (scene) {
      scene.entities.push(new Spiral(scene, scene.width / 2, scene.height / 2));
    }
  );
})(typeof nature === 'object' ? nature : (nature = {}));
