(function (exports) {
	var PI2 = Math.PI * 2;

	function radians (deg) {
    return deg / 360 * 2 * Math.PI;
  }

  function sin (deg) {
    return Math.sin(radians(deg));
  }

  function cos (deg) {
    return Math.cos(radians(deg));
  }

	var height = window.innerHeight;
	var width = document.documentElement.clientWidth;

	function createCanvas () {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');

		// Creates a dummy canvas to test device's pixel ratio
		ratio = (function () {
			var ctx = document.createElement('canvas').getContext('2d');
			var dpr = window.devicePixelRatio || 1;
			var bsr = ctx.webkitBackingStorePixelRatio ||
			          ctx.mozBackingStorePixelRatio ||
			          ctx.msBackingStorePixelRatio ||
			          ctx.oBackingStorePixelRatio ||
			          ctx.backingStorePixelRatio || 1;
			return dpr / bsr;
		})();

		canvas.width = width * ratio;
		canvas.height = height * ratio;
		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';

		document.body.appendChild(canvas);
		return canvas;
	}

	function Vector (x, y) {
		this.x = x;
		this.y = y;
	}

	Vector.prototype.plus = function (vector) {
		var x = this.x + vector.x;
		var y = this.y + vector.y;
		return new Vector(x, y);
	};

	Vector.prototype.times = function (factor) {
		var x = this.x * factor;
		var y = this.y * factor;
		return new Vector(x, y);
	};

	function BaseEntity () {
		this.phase = 0;
		this.velocity = new Vector(0, 0);
		this.acceleration = new Vector(0, 0);
		this.pos = new Vector(0, 0);
		this.radius = 2;
		this.speed = 1;
	}

	BaseEntity.prototype.draw = function (scene) {
		var ctx = scene.ctx;
		ctx.fillStyle = ctx.strokeStyle = 'hsl(' + (scene.age + this.phase) + ', 55%, 70%)';
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, PI2);
		ctx.closePath();
		ctx.fill();
	};

	BaseEntity.prototype.die = function (scene) {
		var entities = scene.entities;
		return entities.splice(entities.indexOf(this), 1);
	};

	function entityFactory (stepFn, init, protoHash) {
		var Entity;

		if (init) {
			Entity = function (scene, x, y) {
				this.pos = new Vector(x, y);
				init.call(this, scene);
			};
		} else {
			Entity = function (scene, x, y) {
				this.pos = new Vector(x, y);
			};
		}

		Entity.prototype = new BaseEntity();
		Entity.prototype.constructor = Entity;

		if (protoHash) {
			Object.keys(protoHash).forEach(function (key) {
				Entity.prototype[key] = protoHash[key];
			});
		}

		if (typeof stepFn !== 'function') {
			stepFn = function () {};
		}

		Entity.prototype.step = function step (scene) {
			var x = this.pos.x, y = this.pos.y;

			stepFn.call(this, scene);
			this.velocity = this.velocity.plus(this.acceleration);
			this.pos = this.pos.plus(this.velocity.times(this.speed));

			if (x < -this.radius * 2 || x > scene.width ||
			    y < -this.radius * 2 || y > scene.height) {
				typeof this.outOfBounds === 'function' ?
					this.outOfBounds(scene) :
					this.die(scene);
			} else {
				this.draw(scene);
			}
		};

		return Entity;
	}

	function Scene (stepFn, init, entityCap) {
		var self = this;
		var canvas = createCanvas();

		stepFn = stepFn || function () {};

		function loop () {
			var entities = self.entities;
			entities.splice(0, entities.length - self.entityCap);
			stepFn(self);
			entities.forEach(function (entity) {
				entity.step(self);
			});
			self.age++;
			window.requestAnimationFrame(loop);
		};

		self.age = 0;
		self.entities = [];
		self.canvas = canvas;
		self.ctx = canvas.getContext('2d');
		self.height = canvas.height;
		self.width = canvas.width;

		if (init) init(self);
		if (entityCap) self.entityCap = entityCap;

		window.requestAnimationFrame(loop);
	}

	Scene.prototype.entityCap = Infinity;

	exports.radians = radians;
	exports.sin = sin;
	exports.cos = cos;
	exports.Vector = Vector;
	exports.entityFactory = entityFactory;
	exports.Scene = Scene;
})(typeof nature === 'object' ? nature : (nature = {}));
