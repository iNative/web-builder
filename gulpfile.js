const GhostContentAPI = require('@tryghost/content-api');
const api = new GhostContentAPI({
  host: 'http://localhost:8080',
  key: 'b2ac88884788a2bd493f2c55c9',
  version: 'v2'
});


var gulp         = require('gulp');

var data = require('gulp-data');

var path         = require('path');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var connect      = require('gulp-connect');
var open         = require('gulp-open');
var nunjucksRender = require('gulp-nunjucks-render');
var dateFilter = require('nunjucks-date-filter');


var manageEnvironment = function(environment) {
  environment.addFilter('date', dateFilter);
 
  
}
 



var JSONdata={"posts":[]};

	
	

var Paths = {
  HERE                 : './',
  DIST                 : 'dist/',
  CSS                  : './assets/css/',
  SCSS_TOOLKIT_SOURCES : './assets/scss/material-kit.scss',
  
	
  SCSS                 : './assets/scss/**/**'
};




gulp.task('nunjucks', function() {
	
	
	
	

	
	
  // Gets .html and .nunjucks files in pages
   return gulp.src('html/pages/**/*.+(html|nunjucks)')
	// adds data 
	.pipe(data(function() {

		
		
	     return require('./assets/mdata.json')
	    }))
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['html/templates'],
	   manageEnv: manageEnvironment
    }))
  // output files in app folder
  .pipe(gulp.dest('html'))
	
 
	
	
	
	
});

/* SASS */


gulp.task('compile:scss', function () {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task('watch', function () {
  gulp.watch(Paths.SCSS, ['compile:scss']);
   gulp.watch('html/**/*.+(html|nunjucks)', ['nunjucks']);
   gulp.watch('html/**/**/*.+(html|nunjucks)', ['nunjucks']);
   gulp.watch('assets/data.json', ['nunjucks']);
   
});


/* END SASS */



gulp.task('server', function () {
  connect.server({
	  host:"0.0.0.0",
    port: 9001,
    livereload: true
  });
});

gulp.task('default', ['server', 'watch'], function () {
  gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:9001/html'}));
});
