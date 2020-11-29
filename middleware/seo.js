const redirects = [
  { from: '/home', to: '/' },
  { from: '/services', to: '/about' },
  { from: '/about-us', to: '/about' },
  { from: '/journaler', to: '/journal' },
  { from: '/activity-feed/my-profile', to: '/' },
  { from: '/activity-feed/friends', to: '/' },
  { from: '/activity-feed/messages', to: '/' },
  { from: '/our-work/all', to: '/work' },
  { from: '/our-work/film', to: '/film' },
  { from: '/our-work/event', to: '/events' },
  { from: '/references/brand-cast-2014', to: '/' },
  { from: '/references/christie-s-uk', to: '/film' },
  { from: '/references/christies-mrs-thatcher', to: '/film' },
  { from: '/references/christie-s-new-york', to: '/film' },
  { from: '/references/cooking-fever', to: '/work/cooking-fever' },
  { from: '/references/intel-x-siemens', to: '/work/intel-x-siemens' },
  { from: '/bitpanda-global-exchange', to: '/work/bitpanda-ios-launch' },
  { from: '/indie-games-2019', to: '/work/indie-games' },
  { from: '/references/nordcurrent-copy', to: '/work/cooking-fever' },
  { from: '/references/wired-x-john-lewis', to: '/work/intel-x-siemens' },
  { from: '/android-10-year', to: '/work/google-playtime' },
  { from: '/references/westernflag-channel-4', to: '/work/intel-x-siemens' },
  { from: '/references/red-bull-handball', to: '/work/red-bull-extreme' },
  { from: '/references/christie-s-spitfire', to: '/film/' },
  { from: '/references/culture-clash', to: '/work/red-bull-extreme' },
  { from: '/references/ferrero-magic-kinder', to: '/work/magic-kinder' },
  { from: '/references/youtube-100-voices', to: '/work/100-voices' },
  { from: '/references/google-cardboard', to: '/work/google-animations' },
  { from: '/references/google-little-moments', to: '/work/google-animations' },
  { from: '/references/jamaica-better-know-with-boy-better-know', to: '/work/red-bull-extreme' },
  { from: '/references/lacoste', to: '/work/red-bull-extreme' },
  { from: '/references/nokia-smart-resize', to: '/film/' },
  { from: '/references/nokia-x-porting-bus', to: '/work/' },
  { from: '/references/punchdrunk', to: '/film/' },
  { from: '/references/riding-shotgun', to: '/work/red-bull-extreme' },
  { from: '/references/red-bull-rugby', to: '/work/red-bull-extreme' },
  { from: '/references/revolutions-in-sound', to: '/work/red-bull-extreme' },
  { from: '/references/run-rabbit-run', to: '/work/' },
  { from: '/references/samsung-be-creative', to: '/film/' },
  { from: '/references/space-selfie', to: '/work/' },
  { from: '/references/the-rain-room', to: '/film/' },
  { from: '/references/the-turner-prize', to: '/film/' },
  { from: '/references/world-war-one', to: '/film/' },
  { from: '/references/xtreme-challenge', to: '/work/red-bull-extreme' },
  { from: '/references/youtube-orchestra-symphony', to: '/film/' },
  { from: '/references/youtube-play', to: '/film/' },
  { from: '/references/youtube-symphony-orchestra-2011', to: '/film/' },
  { from: '/references/google-play-playtime-2017', to: '/work/google-playtime-2017' },
  { from: '/references/google-play-playtime', to: '/work/google-playtime-2017' },
  { from: '/references/google-news-publisher-s-day-2017', to: '/work/google-playtime' },
  { from: '/references/google-playtime-2017-animation', to: '/work/google-playtime-2017' },
  { from: '/google-play-io-2018-opener-film', to: '/work/google-animations' },
  { from: '/references/google-playtime-2016-animation', to: '/work/google-animations' },
  { from: '/references/beneath-the-surface', to: '/work/beneath-the-surface' },
  { from: '/references/red-bull', to: '/work/red-bull-extreme' },
  { from: '/journal/details', to: '/journal' },
  { from: '/our-work/event/google-i-o-extended-2017', to: '/work/google-playtime-2017' },
  { from: '/our-work/branded-content/android-developer-stories', to: '/work/android-developer-stories' },
  { from: '/our-work/branded-content/barnstorming', to: '/work/red-bull-extreme' },
  { from: '/bafta', to: '/work/bafta-campaign' },
  { from: '/our-work/branded-content/sebastien-ogier-f1', to: '/work/red-bull-f1' },
  { from: '/our-work/branded-content/kaleidoscope', to: '/work/red-bull-extreme' },
  { from: '/our-work/branded-content/april-edition', to: '/work/red-bull-extreme' },
  { from: '/our-work/branded-content/canimation', to: '/work/red-bull-extreme' },
  { from: '/our-work/branded-content/red-bull-athertons', to: '/work/red-bull-extreme' },
  { from: '/our-work/branded-content/inside-the-tempest', to: '/work/inside-the-tempest' },
  { from: '/imakeapps', to: '/work/imakeapps' }
]

export default function ({ redirect, route }) {
  const redirectUrl = redirects.find(r => r.from === route.fullPath)
  if (redirectUrl) {
    return redirect(redirectUrl.to)
  }
}