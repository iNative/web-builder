					const GhostContentAPI = require('@tryghost/content-api');

					const api 			= new GhostContentAPI({
												//GHOST API CREDENTIALS AND SERVER URL
												host: 'http://139.162.193.141',
												key: '2233dbac4d04bd8c0d83e0f2ca',
												version: 'v2'
											});

					var gulp         	= require('gulp');

					var data 			= require('gulp-data');

					var path         	= require('path');

					var sass         	= require('gulp-sass');

					var autoprefixer 	= require('gulp-autoprefixer');

					var sourcemaps  	= require('gulp-sourcemaps');

					var connect      	= require('gulp-connect');

					var open         	= require('gulp-open');

					var nunjucksRender 	= require('gulp-nunjucks-render');

					var dateFilter 		= require('nunjucks-date-filter');
					
					const jsonfile = require('jsonfile')

					var JSONdata		={"posts":[],"pages":[]};

					var Paths 			= {
											HERE                 : './',
											DIST                 : 'dist/',
											CSS                  : './assets/css/',
											SCSS_TOOLKIT_SOURCES : './assets/scss/material-kit.scss',
											SCSS                 : './assets/scss/**/**'
										};




					gulp.task('get_data', function() {
						
					api.posts
					    .browse({ include: 'tags'})
					    .then((posts) => {
					        posts.forEach((post) => {
								JSONdata.posts.push(post);
					            
					        });
							
						api.pages
						    .browse({ include: 'tags'})
						    .then((pages) => {
						        pages.forEach((page) => {
									JSONdata.pages.push(page);
					            
						        });
							
								jsonfile.writeFile('./assets/mdata.json', JSONdata, function (err) {
								  if (err) console.error(err)
								})
							
								// write file
						    })
						    .catch((err) => {
						        console.error(err);
						    });
							
							// write file
					    })
					    .catch((err) => {
					        console.error(err);
					    });
					});
					
					
					
					

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
							manageEnv: function(environment) {
								environment.addFilter('date', dateFilter);
							},
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
					/* END SASS */

					gulp.task('watch', function () {
	
						gulp.watch(Paths.SCSS, ['compile:scss']);
						gulp.watch('html/**/*.+(html|nunjucks)', ['nunjucks']);
						gulp.watch('html/**/**/*.+(html|nunjucks)', ['nunjucks']);
						gulp.watch('assets/data.json', ['nunjucks']);
   
					});


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
