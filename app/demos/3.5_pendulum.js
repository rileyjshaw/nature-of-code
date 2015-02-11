(function (exports) {
  var ARM_LENGTH = 180;
  var MASS = 36;
  var GRAVITY = 9.81;
  var FRICTION = 0.995;

  var Vector = nature.Vector;

  // accept degrees instead of radians
  var sin = nature.sin;
  var cos = nature.cos;

  function polarToCartesian (r, theta) {
    var x = r * cos(theta);
    var y = - r * sin(theta);

    return new Vector(x, y);
  }

  var Pendulum = nature.entityFactory(
    function step (scene) {
      var ctx = scene.ctx;
      var origin = this.origin;
      var armLength = this.armLength;

      // update attributes
      this.angularAcceleration = -1 * GRAVITY * cos(this.angle) / armLength;
      this.angularVelocity = (this.angularVelocity + this.angularAcceleration) * FRICTION;
      this.angle += this.angularVelocity;

      this.pos = polarToCartesian(armLength, this.angle).plus(this.origin);

      // draw the pendulum arm
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(scene.width / 2, scene.height / 2);
      ctx.stroke();
    },
    function init (scene) {
      var ctx = scene.ctx;

      this.angle = 135;
      this.angularVelocity = 0;
      this.angularAcceleration = 0;
      this.origin = {
        x: scene.width / 2,
        y: scene.height / 2
      };

      // make sure the color is set for the first draw in step()
      ctx.fillStyle = ctx.strokeStyle = 'hsl(' + (scene.age + this.phase) + ', 55%, 70%)';
    },
    {
      armLength: ARM_LENGTH,
      radius: MASS
    }
  );

  new nature.Scene(
    function step (scene) {
      scene.ctx.clearRect(0, 0, scene.width, scene.height);
    },
    function init (scene) {
      var ctx = scene.ctx;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';

      scene.entities.push(new Pendulum(scene, scene.width / 2 - ARM_LENGTH, scene.height / 2));
    }
  );
})(typeof nature === 'object' ? nature : (nature = {}));
