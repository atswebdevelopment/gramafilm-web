<template>
  <div class="page">
    <Film v-if="film.id" :film="film" :events="event" />
    <Loader v-else />
  </div>
</template>

<script>
import filmQuery from '~/apollo/queries/work/film'
export default {
  components: {
    Film: () => import('~/components/pages/Film'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      film: {},
      events: {}
    }
  },
  apollo: {
    film: {
      prefetch: true,
      query: filmQuery
    },
    event: {
      prefetch: true,
      query: filmQuery
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
