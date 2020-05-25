import ScrollMagic from 'scrollmagic'
import { TweenMax, Power4 } from 'gsap'
import 'gsap/ScrollToPlugin'

export default function Scrollspy() {
  // 假如網址列上有hashtag, 捲動到hashtag處
  if (window.location.hash) {
    let hash = window.location.hash
    TweenMax.to(window, 0.5, {
      scrollTo: {
        y: hash,
        autoKill: true
      },
      ease: Power4.easeInOut
    })
  }
  // 建立.scrollspy
  let scrollspy = document.querySelector('.scrollspy')
  if (!scrollspy) {
    scrollspy = document.createElement('div')
    scrollspy.setAttribute('class', 'scrollspy')
    document.querySelector('#viewport').appendChild(scrollspy)
  }
  // 建立.anchor-nav
  let anchorNav = document.querySelector('.anchor-nav')
  const section = document.querySelectorAll('section')
  if (!anchorNav) {
    anchorNav = document.createElement('nav')
    anchorNav.setAttribute('class', 'anchor-nav')
    scrollspy.appendChild(anchorNav)
    // 產生 a標籤
    for (let i = 0; i < section.length; i++) {
      let s = section[i]
      const a = document.createElement('a')
      a.setAttribute('href', `#${s.id}`)
      a.innerHTML = s.id
      anchorNav.appendChild(a)
    }
  }
  let controller
  let scenes = []
  const init = () => {
    // 安裝 scrollmagic Controller
    controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        duration: $('section').height(),
        triggerHook: 0.025,
        reverse: true
      }
    })
    // 安裝 scrollmagic Controller
    section.forEach((s, i) => {
      scenes.push(new ScrollMagic.Scene({ triggerElement: '#' + s.id })
        .setClassToggle(`a[href="#${s.id}"], #${s.id}`, 'active')
        .addTo(controller)
      )
    })
  }
  init()
  const scrollTo = function(target) {
    TweenMax.to(window, 0.5, {
      scrollTo: {
        y: target,
        autoKill: true
      },
      ease: Power4.easeInOut
    })
  }
  // 綁定 scroll nav a 標籤 scrollTo 函式
  anchorNav.addEventListener('click', function(e) {
    const target = e.target
    const id = target.getAttribute('href')
    if (id !== null) {
      if (id.length > 0) {
        e.preventDefault()
        scrollTo(id)

        if (window.history && window.history.pushState) {
          history.pushState('', document.title, id)
        }
      }
    }
  })
  // resize destroy and reset
  window.addEventListener('resize', () => {
    controller.destroy()
    scenes.forEach(s => s.destroy(true))
    scenes = []
    init()
  })
}
