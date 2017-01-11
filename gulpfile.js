var gulp = require("gulp"),
sass = require("gulp-sass"),
uglify = require("gulp-uglify"), 
rename = require("gulp-rename"),
cssmin = require('gulp-cssmin'),
concat = require('gulp-concat'),
autoprefixer = require('gulp-autoprefixer');

gulp.task("JS", function(){
    gulp.src("./javascript/*.js")
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./build/js"));
}) 

gulp.task("styles", function(){
    gulp.src("./sass/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./build/css"))
    .pipe(cssmin())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('./build/css'));
})

gulp.task("watch", function(){
    gulp.watch("./javascript/*.js", ["JS"]) 
    gulp.watch("./sass/*.scss", ["styles"])
})