const getRoutes = require('./modules/routes.js').default;

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
    ['@nuxtjs/pwa'],
    '@nuxtjs/style-resources',
    ['@nuxtjs/google-analytics', {
      id: 'UA-22891163-1'
    }]
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
    ['nuxt-facebook-pixel-module', {
      /* module options */
      track: 'PageView',
      pixelId: '1130929773924122',
      disabled: false
    }]
  ],
  markdownit: {
    injected: true
  },
  sitemap: {
    routes() {
      return getRoutes()
    },
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
  // generate: {
  //   routes: [
  //     '/journal/launching-into-the-new-year',
  //     '/journal/on-set',
  //     '/journal/way-back-home-with-danny-macaskill',
  //     '/journal/we-won',
  //     '/journal/gramafilm-dog-squad-grows',
  //     '/work/beneath-the-surface',
  //     '/work/cooking-fever',
  //     '/work/intel-the-tempest',
  //     '/work/google-animations',
  //     '/work/android-developer-challenge',
  //     '/work/android-10-year',
  //     '/work/red-bull-f1',
  //     '/work/red-bull-way-back-home-with-danny-macaskill',
  //     '/work/android-developer-stories',
  //     '/work/siemens-x-intel',
  //     '/work/bafta-campaign',
  //     '/work/amazon-tour',
  //     '/work/imakeapps',
  //     '/work/lg-styler',
  //     '/work/youtube-stay-home',
  //     '/work/io-opener',
  //     '/work/google-playtime',
  //     '/work/100-voices',
  //     '/work/bitpanda-ios-launch',
  //     '/work/magic-kinder'
  //   ]
  // }
}
