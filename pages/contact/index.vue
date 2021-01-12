<template>
  <div class="page">
    <Contact v-if="contact && contact.id" :contact="contact" />
    <Loader v-else />
    <FooterLinks v-if="contact && contact.id" inline />
  </div>
</template>

<script>
import contactQuery from '~/apollo/queries/pages/contact.gql'
export default {
  components: {
    Contact: () => import('~/components/pages/Contact'),
    FooterLinks: () => import('~/components/content/FooterLinks'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      contact: {}
    }
  },
  apollo: {
    contact: {
      prefetch: false,
      query: contactQuery
    }
  },
  head () {
    return {
      title: (this.contact && this.contact.seo && this.contact.seo.title) || 'Gramafilm > Contact',
      meta: [
        { hid: 'description', name: 'description', content: (this.contact && this.contact.seo && this.contact.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: (this.contact && this.contact.seo && this.contact.seo.title) || 'Gramafilm > Contact' },
        { hid: 'og:description', name: 'og:description', content: (this.contact && this.contact.seo && this.contact.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` },
        { hid: 'og:image', name: 'og:image', content: this.contact && this.contact.seo && this.contact.seo.image && this.contact.seo.image.url }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  background $secondary
</style>
