(function (exports) {
  var ELASTICITY = 0.98;

  var Ball = nature.entityFactory(
    function step (scene) {
      var radius = this.radius;
      var pos = this.pos;
      var x = pos.x, y = pos.y;

      if (x < radius || x > scene.width - radius) {
        this.velocity.x *= -ELASTICITY;
        pos.x = this.pos.x + this.velocity.x * this.speed;
      }

      if (y > scene.height - radius) {
        this.velocity.y *= -ELASTICITY;
        pos.y = scene.height - radius; // inaccurate, but prettier
      }
    },
    function init () {
      var x = Math.random() * 2 - 1; // (-1, 1)
      var y = Math.random() * 2 - 1; // (-1, 1)

      this.velocity = (new nature.Vector(x, y)).normalize();

      this.phase = Math.floor(Math.random() * 360);
      this.radius = this.mass = this.phase / 6 + 30;
      this.forces = {
        gravity: new nature.Vector(0, 0.4 * this.mass)
      };
    }
  );

  new nature.Scene(
    function step (scene) {
      scene.ctx.clearRect(0, 0, scene.width, scene.height);
    },
    function init (scene) {
      var x, y, numBalls = 24;
      while (numBalls--) {
        x = 90 + (scene.width - 90 * 2) * Math.random();
        y = 90 + (scene.height - 90 * 2) * Math.random();
        scene.entities.push(new Ball(scene, x, y));
      }
    },
    {
      click: function (x, y) {
        this.entities.push(new Ball(this, x, y));
      }
    }
  );

})(typeof nature === 'object' ? nature : (nature = {}));
