
function outerHeight(el) {
  let height = el.offsetHeight
  let style = getComputedStyle(el)
  height += parseInt(style.marginTop) + parseInt(style.marginBottom)
  return height
}
function getRectTop(el) {
  let rect = el.getBoundingClientRect()
  return rect.top + document.body.scrollTop
}

function inView(def) {
  let dElement = document.documentElement
  let body = document.getElementsByTagName('body')[0]
  let winH = window.innerHeight || dElement.clientHeight || body.clientHeight
  let winT = document.body.scrollTop
  let winB = (winT + winH) * def.threhold

  const elements = document.querySelectorAll('*[data-scroll]')
  for (let i = 0; i < elements.length; i++) {
    let ele = elements[i]
    let eleH = outerHeight(ele)
    let eleT = getRectTop(ele)
    let eleB = eleT + eleH
    if ((eleB >= winT) && (eleT <= winB)) {
      ele.setAttribute('data-scroll', 'in')
    } else {
      if (!def.once) {
        ele.setAttribute('data-scroll', 'out')
      }
    }
  }
}
function trigger(eventName, el) {
  let event = document.createEvent('HTMLEvents')
  event.initEvent(eventName, true, false)
  el.dispatchEvent(event)
}

export default function(el = {}) {
  const def = {
    once: false,
    threhold: 1
  }
  Object.assign(def, el)
  if (def.once) {
    const elements = document.querySelectorAll('*[data-scroll]')
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute('data-scroll', 'out')
    }
  }
  window.addEventListener('scroll', () => {
    inView(def)
  })
  window.addEventListener('resize', () => {
    inView(def)
  })
  trigger('scroll', window)
}
