<template>
  <div class="page">
    <Contact v-if="contact.id" :contact="contact" />
    <Loader v-else />
    <GetInTouch no-contact footer-links />
  </div>
</template>

<script>
import contactQuery from '~/apollo/queries/pages/contact'
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
  }
}
</script>

<style lang="stylus" scoped>
.page:before
  background linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(238,237,233,1) 80%)
</style>
