var glob = require('glob');
var gulp = require('gulp');
var path = require('path');
var $    = require('gulp-load-plugins')();

var paths = {
  app: {},
  dist: {}
};

// app paths
paths.app.root   = 'app/';
paths.app.demo   = paths.app.root + 'demo.jade';
paths.app.index  = paths.app.root + 'index.jade';
paths.app.static = paths.app.root + 'static/**/*';
paths.app.demos  = paths.app.root + 'demos/*.js';

// dist paths
paths.dist.root  = 'dist/';
paths.dist.demos = paths.dist.root + 'demos/';

function removeNumberFrom (name) {
  return name.slice(name.indexOf('_') + 1);
}

function getJSBasename (name) {
  return path.basename(name, '.js');
}

function buildHTML (demoName, i, next, prev) {
  // start filenames at 1.html, not 0.html
  ++i;

  gulp.src(paths.app.demo)
    .pipe($.jade({
      locals: {
        demoName: demoName,
        i: i,
        next: next ? i + 1 : null,
        prev: prev ? i - 1 : null
      }
    }))
    .pipe($.rename(i + '.html'))
    .pipe(gulp.dest(paths.dist.root))
}

gulp.task('build', ['static', 'demos'], function () {
  return glob(paths.app.demos, function (err, files) {
    files = files.map(getJSBasename);

    // sort by the numbers at the beginning of each filename
    // (reverse order, so newest demos are shown first)
    files.sort(function (a, b) {
      return parseFloat(a) < parseFloat(b);
    });

    // remove the numbers once we're in sorted order
    files = files.map(removeNumberFrom);

    files.forEach(function (demoName, i) {
      // files[i + 1] and [i - 1] will only be truthy if they exist
      return buildHTML(demoName, i, files[i + 1], files[i - 1]);
    });
  });
});

gulp.task('demos', ['lint'], function () {
  return gulp.src(paths.app.demos)
    .pipe($.rename(function (name) {
      name.basename = removeNumberFrom(name.basename);
    }))
    .pipe(gulp.dest(paths.dist.demos))
    .pipe($.rename(function (name) {
      name.basename += '.min';
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.demos));
});

gulp.task('lint', function () {
  return gulp.src(paths.app.demos)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});


gulp.task('static', ['index'], function () {
  return gulp.src(paths.app.static)
    .pipe(gulp.dest(paths.dist.root));
});

gulp.task('index', function () {
  return gulp.src(paths.app.index)
    .pipe($.jade())
    .pipe(gulp.dest(paths.dist.root))
});

gulp.task('watch', function () {
  gulp.watch([paths.app.demos, paths.app.static], ['build']);
});

gulp.task('webserver', function () {
  gulp.src(paths.dist.root)
    .pipe($.webserver({
      host: 'localhost',
      livereload: true,
      open: true
    }));
});

gulp.task('deploy', function () {
  gulp.src(paths.dist.root + '/**/*')
    .pipe($.ghPages('https://github.com/rileyjshaw/nature-of-code.git', 'origin'));
});

gulp.task( 'default', [ 'build', 'webserver', 'watch' ] );
