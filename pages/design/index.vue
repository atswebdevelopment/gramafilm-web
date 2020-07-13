<template>
  <div class="page">
    <Design v-if="design.id" :design="design" :film="film" />
    <Loader v-else />
  </div>
</template>

<script>
import designQuery from '~/apollo/queries/work/design'
export default {
  components: {
    Design: () => import('~/components/pages/Design'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      design: {},
      film: {}
    }
  },
  apollo: {
    design: {
      prefetch: false,
      query: designQuery
    },
    film: {
      prefetch: false,
      query: designQuery
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 0

  &:before
    background linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(238,237,233,1) 80%)
</style>
