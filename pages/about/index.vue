<template>
  <div class="page">
    <About v-if="about && about.id" :about="about" />
    <Loader v-else />
    <GetInTouch footer-links />
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
      title: (this.about && this.about.seotitle) || 'About Gramafilm',
      meta: [
        { hid: 'description', name: 'description', content: (this.about && this.about.seodescription) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  background $secondary
</style>
