import _ from 'lodash';
import gulp from 'gulp';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import { deleteAsync } from 'del';

const tsProject = ts.createProject('tsconfig.json');

function clean() {
  return deleteAsync(['dist/**/*']);
}

function compilerTS() {
  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js.pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
}

export const build = gulp.series(clean, compilerTS);
export { clean, compilerTS };

export default build;
