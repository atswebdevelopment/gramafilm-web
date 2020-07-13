<template>
  <div class="page">
    <About v-if="about.id" :about="about" />
    <Loader v-else />
    <GetInTouch footer-links />
  </div>
</template>

<script>
import aboutQuery from '~/apollo/queries/pages/about'
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
  }
}
</script>

<style lang="stylus" scoped>
.page
  background $secondary

  &:before
    background linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba($secondary,1) 80%)
</style>
