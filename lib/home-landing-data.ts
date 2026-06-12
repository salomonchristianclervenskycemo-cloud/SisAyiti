export const HOME_TIMELINE = [
  { year: '1751', magKey: 'home.landing.timeline.1751.mag', locKey: 'home.landing.timeline.1751.loc', sumKey: 'home.landing.timeline.1751.sum' },
  { year: '1770', magKey: 'home.landing.timeline.1770.mag', locKey: 'home.landing.timeline.1770.loc', sumKey: 'home.landing.timeline.1770.sum' },
  { year: '1842', magKey: 'home.landing.timeline.1842.mag', locKey: 'home.landing.timeline.1842.loc', sumKey: 'home.landing.timeline.1842.sum' },
  { year: '2010', magKey: 'home.landing.timeline.2010.mag', locKey: 'home.landing.timeline.2010.loc', sumKey: 'home.landing.timeline.2010.sum' },
  { year: '2021', magKey: 'home.landing.timeline.2021.mag', locKey: 'home.landing.timeline.2021.loc', sumKey: 'home.landing.timeline.2021.sum' },
] as const

export const HOME_STATS = [
  { value: '2', titleKey: 'home.landing.stat.faults.title', descKey: 'home.landing.stat.faults.desc', icon: 'fault' },
  { value: '10+', titleKey: 'home.landing.stat.quakes.title', descKey: 'home.landing.stat.quakes.desc', icon: 'quake' },
  { value: '5M+', titleKey: 'home.landing.stat.exposed.title', descKey: 'home.landing.stat.exposed.desc', icon: 'people' },
  { value: '80%+', titleKey: 'home.landing.stat.buildings.title', descKey: 'home.landing.stat.buildings.desc', icon: 'building' },
] as const

export const HOME_PARTNERS = ['USGS', 'BME', 'MENFP', 'PNUD', 'UNICEF', 'TECLA', 'CNBH', 'EMSC'] as const

/** Points sismiques décoratifs sur la carte hero (lon, lat, magnitude) */
export const HOME_MAP_QUAKES = [
  { lon: -73.5, lat: 18.45, mag: 4.2 },
  { lon: -72.8, lat: 18.2, mag: 3.8 },
  { lon: -74.1, lat: 19.2, mag: 3.5 },
  { lon: -71.9, lat: 18.55, mag: 4.5 },
] as const
