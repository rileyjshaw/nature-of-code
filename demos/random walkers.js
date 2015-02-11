(function (exports) {
  function randomWalk (scene) {
    this.velocity = new nature.Vector(
      Math.round(Math.random() * 3 - 1.5),
      Math.round(Math.random() * 3 - 1.5)
    );
    if (this.velocity.x) this.velocity.y = 0;
  }

  var RandomWalker = nature.entityFactory(randomWalk, function () {
    this.phase = Math.floor(Math.random() * 360);
  }, { radius: 4, speed: 9 });

  new nature.Scene(function step (scene) {
    var x, y;
    if (Math.random() > 0.5) {
      x = Math.floor(Math.floor(Math.random() * scene.width) / 9) * 9;
      y = Math.floor(Math.floor(Math.random() * scene.height) / 9) * 9;
      scene.entities.push(new RandomWalker(scene, x, y));
    }
    scene.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    scene.ctx.fillRect(0, 0, scene.width, scene.height);
  }, null, 200);
})(typeof nature === 'object' ? nature : (nature = {}));
