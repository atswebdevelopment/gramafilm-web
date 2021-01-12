<template>
  <div class="page">
    <Work v-if="work && work.id" :work="work" />
    <Loader v-else />
    <GetInTouch v-if="work && work.id" footer-links />
  </div>
</template>

<script>
import workQuery from '~/apollo/queries/work/work.gql'
export default {
  components: {
    Work: () => import('~/components/pages/Work'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      work: {}
    }
  },
  apollo: {
    work: {
      prefetch: false,
      query: workQuery
    }
  },
  head () {
    return {
      title: (this.work && this.work.seo && this.work.seo.title) || 'Gramafilm > Our Work > All',
      meta: [
        { hid: 'description', name: 'description', content: (this.work && this.work.seo && this.work.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: (this.work && this.work.seo && this.work.seo.title) || 'Gramafilm > Our Work > All' },
        { hid: 'og:description', name: 'og:description', content: (this.work && this.work.seo && this.work.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` },
        { hid: 'og:image', name: 'og:image', content: this.work && this.work.seo && this.work.seo.image && this.work.seo.image.url }
      ]
    }
  }
}
</script>
