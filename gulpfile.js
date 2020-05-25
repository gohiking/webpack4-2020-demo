/* eslint max-len:0, no-console:0, func-names: 0, no-mixed-operators:0 */
const gulp = require('gulp')
const changed = require('gulp-changed')
const size = require('gulp-size')
const imagemin = require('gulp-imagemin')
const imageminOptipng = require('imagemin-optipng')
const imageminMozjpeg = require('imagemin-mozjpeg')
const merge = require('merge-stream')
const spritesmith = require('gulp.spritesmith')
const buffer = require('vinyl-buffer')

// https://github.com/twolfson/gulp.spritesmith
function createSprite(src, fileName, cssTemplate) {
  const spriteData = gulp.src(src)
    .pipe(spritesmith({
      imgName: `${fileName}.png`,
      cssName: `${fileName}.sass`,
      padding: 4,
      imgOpts: {
        quality: 100
      },
      cssTemplate,
      cssHandlebarsHelpers: {
        percent(value, base) {
          return `${(value / base) * 100}%`
        },
        bgPosition(spriteSize, imgSize, offset) {
          const result = (offset / (imgSize - spriteSize)) * 100
          if (Number.isNaN(result)) {
            return '0'
          }
          return `${result}%`
        },
        half(num) {
          return `${num / 2}px`
        }
      }
    }))
  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest('src/assets/img/'))

  const cssStream = spriteData.css
    .pipe(gulp.dest('src/sass'))
  return merge(imgStream, cssStream)
}

gulp.task('sprite', () => {
  const basicTemplate = 'src/sass/handlebars/basic.hbs'
  const a = [
    createSprite('src/assets/sprites/*', 'sprite', basicTemplate)
  ]
  return merge(...a)
})

gulp.task('m', () => {
  const imgSrc = [
    'src/assets/img/**/*.+(jpg|png|gif)',
    '!src/assets/img/_*'
  ]
  const otherSrc = imgSrc.map(imgPath => (imgPath.indexOf('!') === 0 ? imgPath.substr(1) : `!${imgPath}`))
  otherSrc.push('src/asset/img/**/*.+(svg)')
  const imgDest = 'src/assets/images'

  const taskOtherSrc = gulp.src(otherSrc)
    .pipe(changed(imgDest))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(imgDest))

  const taskImgSrc = gulp.src(imgSrc)
    .pipe(changed(imgDest))
    .pipe(size({ showFiles: true }))
    .pipe(imagemin([
      imageminMozjpeg({ quality: 60 }),
      imageminOptipng({ optimizationLevel: 3 })
    ]))
    .pipe(gulp.dest(imgDest))

  return merge(taskOtherSrc, taskImgSrc)
})

gulp.task('sprite-img', () => gulp.src('src/assets/img/sprite.png')
  .pipe(imagemin([
    imageminMozjpeg({ quality: 60 }),
    imageminOptipng({ optimizationLevel: 3 })
  ]))
  .pipe(gulp.dest('src/assets/images')))

gulp.task('watch', () => {
  gulp.watch('src/assets/img/**', gulp.series('m'))
  gulp.watch('src/assets/sprites/**', gulp.series('sprite', 'sprite-img'))
})

gulp.task('default', gulp.series('m', 'sprite', 'watch'))
