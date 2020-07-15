<template>
  <div class="page">
    <Contact v-if="contact && contact.id" :contact="contact" />
    <Loader v-else />
    <GetInTouch no-contact footer-links />
  </div>
</template>

<script>
import contactQuery from '~/apollo/queries/pages/contact.gql'
export default {
  components: {
    Contact: () => import('~/components/pages/Contact'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
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
      title: (this.contact && this.contact.seotitle) || 'Gramafilm > Contact',
      meta: [
        { hid: 'description', name: 'description', content: (this.contact && this.contact.seodescription) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page:before
  background linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(238,237,233,1) 80%)
</style>
