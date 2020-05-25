import 'sass/global.sass'
import IEFixed from '../plugins/IEFixed'
import DetectIE from '../plugins/DetectIE'
import Tracking from '../plugins/Tracking'
const init = () => {
  window.addEventListener('load', () => {
    IEFixed()
    if (DetectIE()) {
      $('html').addClass('is-ie')
    }
    Tracking()

    // Pace.on('start', () => {})
    // Pace.on('done', () => {
    // })
  })
}

export default init

if (process.env.NODE_ENV !== 'production') {
  const requirePages = require.context('~/pages/', false, /^\.\/.*\.pug$/)
  requirePages.keys().forEach(filename => {
    requirePages(filename)
  })
}
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(registration => {
//         console.log('SW registered: ', registration)
//       })
//       .catch(registrationError => {
//         console.log('SW registration failed: ', registrationError)
//       })
//   })
// }
