// Static event data for UNLEASH 3.0.
// Replace/extend as real content (speakers, schedule, socials) becomes available.

export const EVENT = {
  name: 'UNLEASH 3.0',
  theme: 'ACCELERATE',
  scripture: '1 Kings 18:46',
  dateRange: 'September 5–6, 2026',
  time: '8:00 AM',
  venueName: "King's Court Assembly",
  address: [
    '37 Olowora Road,',
    'by Deji Olowo Close,',
    'beside Olowora Primary School,',
    'Olowora Bus Stop,',
    'Ojodu Berger, Lagos.',
  ],
  organizer: 'Love of Christ Chapel International Ministry',
  organizerShort: "King's Court Assembly",
  registration: 'FREE',
  // Target start times, in Africa/Lagos time (UTC+1, no DST).
  day1: {
    label: 'SATURDAY',
    date: 'SEPTEMBER 5, 2026',
    title: 'UNLEASH',
    description: 'The main Unleash gathering — worship, the Word and prayer to open the weekend.',
    startISO: '2026-09-05T08:00:00+01:00',
    endISO: '2026-09-05T23:59:59+01:00',
  },
  day2: {
    label: 'SUNDAY',
    date: 'SEPTEMBER 6, 2026',
    title: 'PRAISE UNLEASHED',
    description: 'A dedicated praise and worship experience to send us out.',
    startISO: '2026-09-06T08:00:00+01:00',
    endISO: '2026-09-06T23:59:59+01:00',
  },
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Event', to: '/event' },
  { label: 'Speakers', to: '/speakers' },
  { label: 'Media', to: '/media' },
  { label: 'Church', to: '/church' },
  { label: 'Contact', to: '/contact' },
];

export const PROGRAMME_ITEMS = [
  { key: 'worship', label: 'Praise & Worship' },
  { key: 'prayer', label: 'Prayer' },
  { key: 'preaching', label: 'Preaching' },
  { key: 'panel', label: 'Panel Discussion' },
  { key: 'qa', label: 'Q&A' },
  { key: 'workshops', label: 'Workshops' },
  { key: 'games', label: 'Games' },
];

export const SOCIAL_LINKS = [
  { key: 'youtube', label: 'YouTube', href: '#' },
  { key: 'facebook', label: 'Facebook', href: '#' },
  { key: 'instagram', label: 'Instagram', href: '#' },
];