export default {
  mode: 'universal',
  target: 'static',
  publicRuntimeConfig: {
    baseUrl: 'http://localhost:3000',
    strapiBaseUri: process.env.NODE_ENV === 'production' ? 'https://admin.gramafilm.com' : 'http://localhost:1337',
    schemaPath: process.env.NODE_ENV === 'production' ? 'https://admin.gramafilm.com/graphql' : 'http://localhost:1337/graphql'
  },
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Gramafilm',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'initial-scale=1, minimum-scale=1, width=device-width' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || 'Gramafilm' },
      { name: 'theme-color', content: '#01485f' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', type: 'image/x-icon', href: '/icons/apple-touch-icon.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@assets/css/fonts.styl',
    '@assets/css/app.styl',
    '@assets/css/video.css'
  ],
  plugins: [
    { src: '~plugins/vue-awesome-swiper', mode: 'client' },
    { src: `~plugins/vimeo-player`, mode: 'client' },
    { src: `~plugins/vue-countup`, mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/dotenv',
    '@nuxtjs/eslint-module',
    ['@nuxtjs/pwa', { meta: false }],
    '@nuxtjs/style-resources'
    // ['@nuxtjs/google-analytics', {
    //   id: 'UA-22891163-1'
    // }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [  
    '@nuxtjs/apollo',
    '@nuxtjs/axios', 
    '@nuxtjs/markdownit',
    'nuxt-lazy-load',
    '@nuxtjs/sitemap',
    '@nuxtjs/markdownit',
    ['nuxt-gmaps', {
      key: 'AIzaSyCFdgq-MJ_zopqLhWQlhfw7USoHRe0hrBc'
    }],
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }],
    ['nuxt-imagemin', {
      optipng: { optimizationLevel: 5 },
      gifsicle: { optimizationLevel: 2 }
    }],
    ['@nuxtjs/redirect-module']
    // ['nuxt-facebook-pixel-module', {
    //   /* module options */
    //   track: 'PageView',
    //   pixelId: '1130929773924122',
    //   disabled: false
    // }]
  ],
  markdownit: {
    injected: true
  },
  sitemap: {
    hostname: 'https://gramafilm.com',
    gzip: true,
    exclude: ['/secret', '/admin/**']
  },
  styleResources: {
    stylus: [
      '~assets/css/variables.styl'
    ]
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true
  },
  apollo: {  
    clientConfigs: {
      default: '~/apollo/config.js'
    }
  },
  redirect: [
    { 'from': '/home', 'to': '/' },
    { 'from': '/services', 'to': '/about' },
    { 'from': '/about-us', 'to': '/about' },
    { 'from': '/journaler', 'to': '/journal' },
    { 'from': '/activity-feed/my-profile', 'to': '/' },
    { 'from': '/activity-feed/friends', 'to': '/' },
    { 'from': '/activity-feed/messages', 'to': '/' },
    { 'from': '/our-work/all', 'to': '/work' },
    { 'from': '/our-work/film', 'to': '/film' },
    { 'from': '/our-work/event', 'to': '/events' },
    { 'from': '/references/brand-cast-2014', 'to': '/' },
    { 'from': '/references/christie-s-uk', 'to': '/film' },
    { 'from': '/references/christies-mrs-thatcher', 'to': '/film' },
    { 'from': '/references/christie-s-new-york', 'to': '/film' },
    { 'from': '/references/cooking-fever', 'to': '/work/cooking-fever' },
    { 'from': '/references/intel-x-siemens', 'to': '/work/intel-x-siemens' },
    { 'from': '/bitpanda-global-exchange', 'to': '/work/bitpanda-ios-launch' },
    { 'from': '/indie-games-2019', 'to': '/work/indie-games' },
    { 'from': '/references/nordcurrent-copy', 'to': '/work/cooking-fever' },
    { 'from': '/references/wired-x-john-lewis', 'to': '/work/intel-x-siemens' },
    { 'from': '/android-10-year', 'to': '/work/google-playtime' },
    { 'from': '/references/westernflag-channel-4', 'to': '/work/intel-x-siemens' },
    { 'from': '/references/red-bull-handball', 'to': '/work/red-bull-extreme' },
    { 'from': '/references/christie-s-spitfire', 'to': '/film/' },
    { 'from': '/references/culture-clash', 'to': '/work/red-bull-extreme' },
    { 'from': '/references/ferrero-magic-kinder', 'to': '/work/magic-kinder' },
    { 'from': '/references/youtube-100-voices', 'to': '/work/100-voices' },
    { 'from': '/references/google-cardboard', 'to': '/work/google-animations' },
    { 'from': '/references/google-little-moments', 'to': '/work/google-animations' },
    { 'from': '/references/jamaica-better-know-with-boy-better-know', 'to': '/work/red-bull-extreme' },
    { 'from': '/references/lacoste', 'to': '/work/red-bull-extreme' },
    { 'from': '/references/nokia-smart-resize', 'to': '/film/' },
    { 'from': '/references/nokia-x-porting-bus', 'to': '/work/' },
    { 'from': '/references/punchdrunk', 'to': '/film/' },
    { 'from': '/references/riding-shotgun', 'to': '/work/red-bull-extreme' },
    { 'from': '/references/red-bull-rugby', 'to': '/work/red-bull-extreme' },
    { 'from': '/references/revolutions-in-sound', 'to': '/work/red-bull-extreme' },
    { 'from': '/references/run-rabbit-run', 'to': '/work/' },
    { 'from': '/references/samsung-be-creative', 'to': '/film/' },
    { 'from': '/references/space-selfie', 'to': '/work/' },
    { 'from': '/references/the-rain-room', 'to': '/film/' },
    { 'from': '/references/the-turner-prize', 'to': '/film/' },
    { 'from': '/references/world-war-one', 'to': '/film/' },
    { 'from': '/references/xtreme-challenge', 'to': '/work/red-bull-extreme' },
    { 'from': '/references/youtube-orchestra-symphony', 'to': '/film/' },
    { 'from': '/references/youtube-play', 'to': '/film/' },
    { 'from': '/references/youtube-symphony-orchestra-2011', 'to': '/film/' },
    { 'from': '/references/google-play-playtime-2017', 'to': '/work/google-playtime-2017' },
    { 'from': '/references/google-play-playtime', 'to': '/work/google-playtime-2017' },
    { 'from': '/references/google-news-publisher-s-day-2017', 'to': '/work/google-playtime' },
    { 'from': '/references/google-playtime-2017-animation', 'to': '/work/google-playtime-2017' },
    { 'from': '/google-play-io-2018-opener-film', 'to': '/work/google-animations' },
    { 'from': '/references/google-playtime-2016-animation', 'to': '/work/google-animations' },
    { 'from': '/references/beneath-the-surface', 'to': '/work/beneath-the-surface' },
    { 'from': '/references/red-bull', 'to': '/work/red-bull-extreme' },
    { 'from': '/journal/details', 'to': '/journal' },
    { 'from': '/our-work/event/google-i-o-extended-2017', 'to': '/work/google-playtime-2017' },
    { 'from': '/our-work/branded-content/android-developer-stories', 'to': '/work/android-developer-stories' },
    { 'from': '/our-work/branded-content/barnstorming', 'to': '/work/red-bull-extreme' },
    { 'from': '/bafta', 'to': '/work/bafta-campaign' },
    { 'from': '/our-work/branded-content/sebastien-ogier-f1', 'to': '/work/red-bull-f1' },
    { 'from': '/our-work/branded-content/kaleidoscope', 'to': '/work/red-bull-extreme' },
    { 'from': '/our-work/branded-content/april-edition', 'to': '/work/red-bull-extreme' },
    { 'from': '/our-work/branded-content/canimation', 'to': '/work/red-bull-extreme' },
    { 'from': '/our-work/branded-content/red-bull-athertons', 'to': '/work/red-bull-extreme' },
    { 'from': '/our-work/branded-content/inside-the-tempest', 'to': '/work/inside-the-tempest' },
    { 'from': '/imakeapps', 'to': '/work/imakeapps' }
  ],
  pwa: {
    manifest: {
      name: 'gramafilm',
      short_name: 'gramafilm',
      description: 'gramafilm',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#000000',
      msTileColor: '#01485f',
      theme_color: '#01485f',
      icons: [
        {
          src: '/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icons/android-chrome-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/icons/android-chrome-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/icons/apple-touch-icon-60x60.png',
          sizes: '60x60',
          type: 'image/png',
        },
        {
          src: '/icons/apple-touch-icon-76x76.png',
          sizes: '76x76',
          type: 'image/png',
        },
        {
          src: '/icons/apple-touch-icon-120x120.png',
          sizes: '120x120',
          type: 'image/png',
        },
        {
          src: '/icons/apple-touch-icon-152x152.png',
          sizes: '152x152',
          type: 'image/png',
        },
        {
          src: '/icons/apple-touch-icon-180x180.png',
          sizes: '180x180',
          type: 'image/png',
        },
        {
          src: '/icons/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
        {
          src: '/icons/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          src: '/icons/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          src: '/icons/msapplication-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: '/icons/mstile-150x150.png',
          sizes: '150x150',
          type: 'image/png',
        }
      ]
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },
    extend (config, ctx) {
    }
  }
}
