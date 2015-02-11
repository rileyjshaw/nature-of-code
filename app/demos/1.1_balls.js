(function (exports) {
  var Ball = nature.entityFactory(function step (scene) {
    var pos = this.pos;
    var x = pos.x;
    var y = pos.y;

    if (x < this.radius || x + this.radius > scene.width) {
      this.velocity.x *= -1;
    }

    if (y < this.radius || y + this.radius > scene.height) {
      this.velocity.y *= -1;
    }
  }, function init () {
    var x = Math.random() * 2 - 1; // (-1, 1)
    var y = Math.random() * 2 - 1; // (-1, 1)
    var factor = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    this.phase = Math.floor(Math.random() * 360);
    this.velocity = new nature.Vector(x / factor, y / factor);
  }, {radius: 90, speed: 14});

  new nature.Scene(
    function step (scene) {
      scene.ctx.clearRect(0, 0, scene.width, scene.height);
    },
    function init (scene) {
      scene.entities.push(new Ball(scene, scene.width / 2, scene.height / 2));
      scene.entities.push(new Ball(scene, scene.width / 4, scene.height / 4));
      scene.entities.push(new Ball(scene, scene.width * 3 / 4, scene.height * 3 / 4));
    }
  );

})(typeof nature === 'object' ? nature : (nature = {}));
