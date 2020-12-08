<template>
  <div class="page">
    <About v-if="about && about.id" :about="about" />
    <Loader v-else />
    <GetInTouch v-if="about && about.id" footer-links />
  </div>
</template>

<script>
import aboutQuery from '~/apollo/queries/pages/about.gql'
export default {
  components: {
    About: () => import('~/components/pages/About'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      about: {}
    }
  },
  apollo: {
    about: {
      prefetch: false,
      query: aboutQuery
    }
  },
  head () {
    return {
      title: (this.about && this.about.seo && this.about.seo.title) || 'About Gramafilm',
      meta: [
        { hid: 'description', name: 'description', content: (this.about && this.about.seo && this.about.seo.description) || 'About Gramafilm' },
        { hid: 'og:title', name: 'og:title', content: (this.about && this.about.seo && this.about.seo.title) || 'About Gramafilm' },
        { hid: 'og:description', name: 'og:description', content: (this.about && this.about.seo && this.about.seo.description) || 'About Gramafilm' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  background $secondary
</style>
