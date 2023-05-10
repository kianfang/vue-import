import _ from 'lodash';
import gulp from 'gulp';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import { deleteAsync } from 'del';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const tsProject = ts.createProject('tsconfig.json');

function clean() {
  return deleteAsync(['dist/**/*']);
}

function compiler() {
  return gulp.src('src/index.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    .pipe(rename({ basename: `${pkg.name}.esm-browser` }))
    .pipe(gulp.dest('dist'))
    .pipe(uglify({ output: { comments: 'some' }}))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
}

export const build = gulp.series(clean, compiler);
export { clean, compiler };

export default build;
