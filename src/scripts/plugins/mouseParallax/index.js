import { TweenMax } from 'gsap'

function MouseParallax() {
  function init() {
    if ($(window).width() > 768) {
      window.addEventListener('mousemove', (e) => {
        parallax(e)
      }, false)
    }
  }
  function parallax(e) {
    if ($(window).width() > 768) {
      $('.mouse-parallax').each(function() {
        let firstLeft = $(this).offset().left
        let rate = $(this).attr('data-rate')
        let relX = e.pageX - firstLeft
        TweenMax.to(this, 1, {
          x: (relX - $(this).width() / 2) / $(this).width() * rate
        })
      })
    }
  }
  init()
}

/********************/
/* install Parallax */
/********************/

export default async() => {
  await MouseParallax()
}
