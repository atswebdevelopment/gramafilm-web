<template>
  <div class="page">
    <Events v-if="event && event.id" :work="event" />
    <Loader v-else />
    <GetInTouch v-if="event && event.id" footer-links />
  </div>
</template>

<script>
import eventQuery from '~/apollo/queries/work/events.gql'
export default {
  components: {
    Events: () => import('~/components/pages/Events'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      event: {}
    }
  },
  apollo: {
    event: {
      prefetch: false,
      query: eventQuery
    }
  },
  head () {
    return {
      title: (this.event && this.event.seo && this.event.seo.title) || 'Gramafilm > Events',
      meta: [
        { hid: 'description', name: 'description', content: (this.event && this.event.seo && this.event.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: (this.event && this.event.seo && this.event.seo.title) || 'Gramafilm > Events' },
        { hid: 'og:description', name: 'og:description', content: (this.event && this.event.seo && this.event.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` },
        { hid: 'og:image', name: 'og:image', content: this.event && this.event.seo && this.event.seo.image && this.event.seo.image.url }
      ]
    }
  }
}
</script>
