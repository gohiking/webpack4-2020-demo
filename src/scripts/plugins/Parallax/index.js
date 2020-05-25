class Parallax {
  constructor(args) {
    const def = {
      el: '.parallax'
    }
    Object.assign(def, args)
    Object.assign(this, def)

    this.init()
  }
  init() {
    console.log('parallax init')
    window.addEventListener('scroll', () => this.handleScroll(), false)
  }
  handleScroll() {
    const targets = document.querySelectorAll(this.el)

    for (let i = 0; i < targets.length; i++) {
      var pos = window.pageYOffset * targets[i].dataset.rate
      if (targets[i].dataset.direction === 'virtical') {
        targets[i].style.transform = `translate3d(0px, ${pos}px, 0px)`
      } else {
        var posX = window.pageYOffset * targets[i].dataset.ratex
        var posY = window.pageYOffset * targets[i].dataset.ratey
        targets[i].style.transform = `translate3d(${posX}px, ${posY}px, 0px)`
      }
    }
  }
}

/********************/
/* install Parallax */
/********************/

export default async(el = '.parallax') => {
  await new Parallax({
    el: el
  })
}
