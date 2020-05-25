import { TweenMax, Power2 } from 'gsap'
// import ScrollToPlugin from 'gsap/umd/ScrollToPlugin'
function scrollTo(target) {
  TweenMax.to(window, 1.3, {
    scrollTo: {
      y: target,
      autoKill: true
    },
    ease: Power2.easeInOut
  })
}

export default function() {
  const elements = document.querySelectorAll('*[js-scroll]')
  elements.forEach(ele => {
    ele.addEventListener('click', (e) => {
      e.preventDefault()
      let target = ele.getAttribute('js-scroll')
      if (target === undefined) {
        target = ele.getAttribute('href')
      }
      scrollTo(target)
    })
  })
}
