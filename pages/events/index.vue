<template>
  <div class="page">
    <Events v-if="event.id" :events="event" :design="design" />
    <Loader v-else />
  </div>
</template>

<script>
import eventsQuery from '~/apollo/queries/work/events'
export default {
  components: {
    Events: () => import('~/components/pages/Events'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      event: {},
      design: {}
    }
  },
  apollo: {
    event: {
      prefetch: false,
      query: eventsQuery
    },
    design: {
      prefetch: false,
      query: eventsQuery
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
