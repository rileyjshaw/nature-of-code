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

  var Ring = nature.entityFactory(
    function step (scene) {
      this.angle += this.angularVelocity;
      this.pos = this.pos.plus(polarToCartesian(this.r, this.angle));
    },
    function init () {
      this.angularVelocity = 1;
      this.r = 1;
    }
  );

  new nature.Scene(
    null,
    function init (scene) {
      var s1 = new Ring(scene, scene.width / 2, scene.height / 2);
      var s2 = new Ring(scene, scene.width / 2, scene.height / 2);
      var s3 = new Ring(scene, scene.width / 2, scene.height / 2);
      var s4 = new Ring(scene, scene.width / 2, scene.height / 2);

      s1.angle = 0;
      s2.angle = 90;
      s3.angle = 180;
      s4.angle = 270;

      scene.entities.push(s1, s2, s3, s4);
    }
  );
})(typeof nature === 'object' ? nature : (nature = {}));
