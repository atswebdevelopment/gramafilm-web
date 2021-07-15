<template>
  <div class="page">
    <Magazines v-if="magazines && magazines.length" :magazines="magazines" />
    <Loader v-else />
    <GetInTouch v-if="magazines && magazines.length" footer-links />
  </div>
</template>

<script>
import magazinesQuery from '~/apollo/queries/magazine/magazines.gql'
export default {
  components: {
    Magazines: () => import('~/components/pages/Magazines'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      categories: [],
      magazines: []
    }
  },
  apollo: {
    magazines: {
      prefetch: false,
      query: magazinesQuery
    }
  },
  head () {
    return {
      title: 'Gramafilm > Magazine',
      meta: [
        { hid: 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: 'Gramafilm > Magazine' },
        { hid: 'og:description', name: 'og:description', content: 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  background $white
</style>
