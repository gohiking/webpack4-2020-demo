
import lazySizes from 'lazysizes'
import 'lazysizes/plugins/respimg/ls.respimg.min'
import 'lazysizes/plugins/optimumx/ls.optimumx.min'
export default function() {
  Object.assign(lazySizes.cfg, {
    hFac: 0.4,
    loadMode: 1,
    loadingClass: 'is-loading',
    loadedClass: 'is-loaded',
    expand: 10
    // throttleDelay: 1000
  })
  document.addEventListener('lazyloaded', (e) => {
    e.target.parentElement.classList.remove('is-parent-loading')
    e.target.parentElement.classList.add('is-parent-loaded')
  })
}
