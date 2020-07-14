<template>
  <div class="page">
    <Events v-if="event && event.id" :events="event" :design="design" />
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
  },
  head () {
    return {
      title: (this.event && this.event.seotitle) || 'Gramafilm > Our Work > Event',
      meta: [
        { hid: 'description', name: 'description', content: (this.event && this.event.seodescription) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
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
