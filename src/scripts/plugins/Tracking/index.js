export default function() {
  $('body').on('click', '*[js-toggle="track"]', function(e) {
    let label = $(this).attr('ga-label')
    let category = $(this).attr('ga-category')
    let value = $(this).attr('ga-value') ? $(this).attr('ga-value') : ''
    window.gtag('event', 'click', {
      'event_category': category,
      'event_label': label,
      'value': value
    })
  })
}
