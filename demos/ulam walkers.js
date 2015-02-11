(function (exports) {

  function ulamWalk (scene) {
    var delX, delY;
    if (scene.age === this.redirect) {
      delX = this.velocity.x || -this.velocity.y;
      delY = this.velocity.x || this.velocity.y;
      this.velocity.x -= delX;
      this.velocity.y -= delY;

      // run increases when switching left or right
      if (this.velocity.x) {
        this.runDistance++;
      }

      this.redirect += this.runDistance;
    }
  }

  var UlamWalker = nature.entityFactory(ulamWalk, function init (scene) {
    this.velocity = new nature.Vector(1, 0);
    this.runDistance = 1; // current spiral arm length
    this.redirect = scene.age + 3; // next step that the spiral changes direction at
  }, {radius: 15, speed: 40});

  new nature.Scene(
    function step (scene) {
      var x, y;
      if (!scene.entities.length) {
        x = Math.floor(Math.floor(Math.random() * scene.width) / 80) * 80;
        y = Math.floor(Math.floor(Math.random() * scene.height) / 80) * 80;
        scene.entities.push(new UlamWalker(scene, x, y));
      }
      if (scene.age % 60 === 0) {
        scene.ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        scene.ctx.fillRect(0, 0, scene.width, scene.height);
      }
    },
    function init (scene) {
      var x = Math.floor(scene.width / 2 / 80) * 80;
      var y = Math.floor(scene.height / 2 / 80) * 80;

      scene.entityCap = 5;
      scene.entities.push(new UlamWalker(scene, x, y));
    }
  );

})(typeof nature === 'object' ? nature : (nature = {}));
