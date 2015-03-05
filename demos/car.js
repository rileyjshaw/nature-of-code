(function (exports) {
  var RAD90 = Math.PI / 2;

  function drawRotatedRect (scene) {
    var ctx = scene.ctx;
    var x = this.pos.x;
    var y = this.pos.y;

    var rad = Math.atan2(this.velocity.y, this.velocity.x);

    ctx.fillStyle = 'hsl(' + (scene.age + this.phase) + ', 55%, 70%)';

    // vector components from height (1) and width (2)
    var x1 = Math.cos(rad) * this.height;
    var y1 = Math.sin(rad) * this.height;
    var x2 = Math.cos(RAD90 - rad) * this.width;
    var y2 = Math.sin(RAD90 - rad) * this.width;

    ctx.beginPath();

    // top left corner of unrotated rectangle
    ctx.moveTo(x - x1 - x2, y - y1 + y2);

    // top right corner of unrotated rectangle
    ctx.lineTo(x + x1 - x2, y + y1 + y2);

    // bottom right corner of unrotated rectangle
    ctx.lineTo(x + x1 + x2, y + y1 - y2);

    // bottom left corner of unrotated rectangle
    ctx.lineTo(x - x1 + x2, y - y1 - y2);

    ctx.fill();
  }

  var Car = nature.entityFactory(
    function step (scene) {
      this.acceleration.x += (Math.random() - 0.5) / 1000;
      this.acceleration.y += (Math.random() - 0.5) / 1000;
    },
    function init () { },
    {
      draw: drawRotatedRect,
      height: 54,
      width: 30,
      outOfBounds: function (scene) {
        this.pos.x = (this.pos.x + scene.width) % scene.width;
        this.pos.y = (this.pos.y + scene.height) % scene.height;
      }
    }
  );

  new nature.Scene(
    function step (scene) {
      scene.ctx.clearRect(0, 0, scene.width, scene.height);
    },
    function init (scene) {
      scene.entities.push(new Car(scene, scene.width / 2, scene.height / 2));
    }
  );
})(typeof nature === 'object' ? nature : (nature = {}));
