/* global gtag */

const $ = s => Array.from(document.querySelectorAll(s))

const on = (el, ev, cb) =>
  el && el.addEventListener && el.addEventListener(ev, e => cb(e, el))

const clean = s => (s && s.trim().replace(/\s\s+/g, ' ')) || 'n/a'

const trackClick = (category, label) =>
  gtag('event', 'click', {
    event_category: clean(category),
    event_label: clean(label),
  })

const autoTrackLinks = () =>
  $('a').forEach(link =>
    on(link, 'click', (_ev, el) =>
      trackClick(el.textContent, el.getAttribute('href'))
    )
  )

export default autoTrackLinks
