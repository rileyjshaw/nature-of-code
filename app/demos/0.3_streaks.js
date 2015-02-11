(function (exports) {
  var StreakWalker = new nature.entityFactory(null, function (scene) {
    var direction = Math.floor(Math.random() * 4);

    switch (direction) {
      case 0: // right
        this.velocity = new nature.Vector(1, 0);
        this.pos.x = 0;
        this.pos.y = Math.floor(Math.floor(Math.random () * scene.height) / 25) * 25;
        break;
      case 1: // up
        this.velocity = new nature.Vector(0, -1);
        this.pos.y = Math.floor(scene.height / 25) * 25;
        this.pos.x = Math.floor(Math.floor(Math.random () * scene.width) / 25) * 25;
        break;
      case 2: // left
        this.velocity = new nature.Vector(-1, 0);
        this.pos.x = Math.floor(scene.width / 25) * 25;
        this.pos.y = Math.floor(Math.floor(Math.random () * scene.height) / 25) * 25;
        break;
      case 3: // down
        this.velocity = new nature.Vector(0, 1);
        this.pos.x = Math.floor(Math.floor(Math.random () * scene.width) / 25) * 25;
        this.pos.y = 0;
    }

    this.phase = Math.floor(Math.random() * 360);
  }, {radius: 4, speed: 25});

  new nature.Scene(
    function step (scene) {
      var x, y;
      if (Math.random() < 0.8) {
        scene.entities.push(new StreakWalker(scene));
      }
      scene.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      scene.ctx.fillRect(0, 0, scene.width, scene.height);
    }
  );

})(typeof nature === 'object' ? nature : (nature = {}));
