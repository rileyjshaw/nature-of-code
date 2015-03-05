(function (exports) {
  var FRICTION = 0.995;
  var Vector = nature.Vector;

  var Chaser = nature.entityFactory(
    function step (scene) {
      var mouse = new Vector(scene.mouse.x, scene.mouse.y);
      var dir = mouse.minus(this.pos).normalize();

      this.acceleration = dir.times(0.6);
      this.velocity = this.velocity.times(FRICTION);
    },
    function init (scene) {
      this.phase = Math.floor(Math.random() * 360);
    },
    {
      radius: 6,
      drawSetup: function (scene) {
        var ctx = scene.ctx, pos = this.pos;
        ctx.fillStyle = ctx.strokeStyle = 'hsl(' + (scene.age + this.phase) + ', 55%, 70%)';
        ctx.lineWidth = this.radius * 2;
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      },
      draw: function (scene) {
        var ctx = scene.ctx, pos = this.pos;
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.closePath();
      },
      outOfBounds: function () {}
    }
  );

  new nature.Scene(
    function step (scene) {
      scene.ctx.clearRect(0, 0, scene.width, scene.height);
    },
    function init (scene) {
      var n = 24;

      scene.entityCap = 48;
      while (n--) {
        scene.entities.push(new Chaser(scene, scene.width * Math.random(), scene.height * Math.random()));
      }
    },
    {
      mouse: function (x, y) {
        this.mouse = {
          x: x,
          y: y,
        };
      },
      click: function (x, y) {
        this.entities.push(new Chaser(this, x, y));
      }
    }
  );

})(typeof nature === 'object' ? nature : (nature = {}));
