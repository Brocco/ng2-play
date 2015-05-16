var gulp = require('gulp'),
    del = require('del'),
    exec = require('child_process').exec,
    sequence = require('run-sequence');

var cfg = {
    distRoot: './dist',
    html: {
        src: './app/**/*.html',
        dest: './dist'
    },
    style: {
      src: ['./bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/bootstrap/dist/css/bootstrap-theme.min.css'],
      dest: './dist/style'
    },
    tsCmd: 'tsc -p ./app'
};

gulp.task('default', ['build'], function () {
});

gulp.task('build', function(){
  return sequence(
    'clean',
    ['ts', 'views'],
    'style'
  );
});

gulp.task('clean', function () {
  return del(cfg.distRoot);
});

gulp.task('style', function(){
  return gulp.src(cfg.style.src)
    .pipe(gulp.dest(cfg.style.dest));
});

gulp.task('views', function () {
    return gulp.src(cfg.html.src)
        .pipe(gulp.dest(cfg.html.dest));
});

gulp.task('ts', function (done) {
    exec(cfg.tsCmd, function (err, stdOut, stdErr) {
        console.log(stdOut);
        if (err) {
            done(err);
        } else {
            done();
        }
    });

});