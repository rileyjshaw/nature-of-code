(function (exports) {
  var Chaser = nature.entityFactory(
    function step (scene) {
      var pos = this.pos;
      var x = pos.x;
      var y = pos.y;

      if (x < this.radius || x + this.radius > scene.width) {
        this.velocity.x *= -1;
      }

      if (y < this.radius || y + this.radius > scene.height) {
        this.velocity.y *= -1;
      }
    },
    {
      radius: 90,
      speed: 14,
      die: function () {},
    }
  );

  new nature.Scene(
    function step (scene) {
      scene.ctx.clearRect(0, 0, scene.width, scene.height);
    }, function init (scene) {
      scene.entities.push(new Chaser(scene, scene.width / 2, scene.height / 2));
    },
    {
      mouse: function (x, y) {
        this.ctx.fillRect(x, y, 100, 200);
      }
    }
  );

})(typeof nature === 'object' ? nature : (nature = {}));
