import $ from 'jquery'
import MobileDetect from 'mobile-detect'

let index = 0
export default class SliderEffect {
  constructor(args) {
    // 預設值
    const def = {
      second: 3000,
      parent: '.cover-swiper'
    }
    Object.assign(def, args)
    Object.assign(this, def)
    this.$parent = $(this.parent)
    this.$window = $(window)
    this.$img = this.$parent.find('img')
    this.$slide = this.$parent.children('.cover-swiper-slide')
    this.$coverSwiper = $('.cover-swiper')
    this.$slide2 = $('.cover--slide')
    this.$coverImg = $('.coverSwiper__img')
    this.$coverImgImg = $('.coverSwiper__img img')
    this.$slideLeft = $('.cover--content .swiper-prev')
    this.$slideRight = $('.cover--content .swiper-next')
    this.aspectRatio = this.$img.width() / this.$img.height()
    this.index = 0
    this.init()
  }
  get slideCount() {
    return this.$slide.length
  }
  init() {
    // 固定秒數輪播圖片
    this.animating = true
    this.time = setInterval(() => this.interval(1), this.second)
    this.isClick = false
    this.$slideLeft.on('click', () => {
      if (!this.click) {
        this.isClick = true
        $('.swiper-buttons').addClass('is-disabled')
        clearTimeout(this.timeout)
        clearInterval(this.time)
        this.interval(-1)
        this.animating = false
        this.timeout = setTimeout(() => {
          this.animating = true
          this.isClick = false
          $('.swiper-buttons').removeClass('is-disabled')
          this.time = false
          this.time = setInterval(() => this.interval(1), this.second)
        }, 450)
      }
    })
    this.$slideRight.on('click', () => {
      if (!this.click) {
        this.click = true
        $('.swiper-buttons').addClass('is-disabled')
        clearTimeout(this.timeout)
        clearInterval(this.time)
        this.interval(1)
        this.animating = false
        this.timeout = setTimeout(() => {
          this.animating = true
          this.click = false
          $('.swiper-buttons').removeClass('is-disabled')
          this.time = false
          this.time = setInterval(() => this.interval(1), this.second)
        }, 450)
      }
    })

    // 讓首頁COVER圖片滿版
    let aspectRatio = 375 / 325
    this.$window.resize(() => {
      let md = new MobileDetect(window.navigator.userAgent)
      if (md.mobile() || md.tablet()) {
        this.$coverImg.css({
          width: this.$window.width(),
          height: this.$window.width() / aspectRatio
        })
        this.$slide.css({
          height: this.$window.width() / aspectRatio
        })
        this.$coverImgImg.css({
          minHeight: this.$window.width() / aspectRatio
        })
        this.$coverSwiper.css({
          minHeight: this.$window.width() / aspectRatio
        })
      } else {
        this.$coverImg.css({
          width: this.$window.width() >= 1280 ? this.$window.width() / 3 * 2 : 1280 / 3 * 2,
          height: this.$window.height()
        })
        this.$slide.css({
          height: this.$window.height()
        })
        if ((this.$window.width() / this.$window.height()) < this.aspectRatio) {
          this.$coverImg
            .removeClass('bgheight bgwidth')
            .addClass('bgheight')
        } else {
          this.$coverImg
            .removeClass('bgheight bgwidth')
            .addClass('bgwidth')
        }
      }
    }).trigger('resize')
  }
  interval(id) {
    if (this.animating) {
      index = (index + id + this.slideCount) % this.slideCount
      this.$slide.removeClass('active')
      this.$slide2.removeClass('active')
      this.$slide.each(function(item) {
        if (index === item) {
          $(this).addClass('active')
        }
      })
      this.$slide2.each(function(item) {
        if (index === item) {
          $(this).addClass('active')
        }
      })
    }
  }
}
