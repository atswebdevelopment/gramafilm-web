<template>
  <div class="page">
    <EventsBanner v-if="eventsFromStoreId || (event && event.id)" :events="(eventsFromStoreId && eventsFromStore) || event" banner-top />
    <Events v-if="event && event.id" :events="event" />
    <Loader v-else />
    <DesignBanner v-if="design && design.id" :design="design" />
  </div>
</template>

<script>
import eventsQuery from '~/apollo/queries/work/events.gql'
export default {
  components: {
    Events: () => import('~/components/pages/Events'),
    EventsBanner: () => import('~/components/banners/EventsBanner'),
    DesignBanner: () => import('~/components/banners/DesignBanner'),
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
  computed: {
    eventsFromStore () {
      return this.$store.state.showcase.events
    },
    eventsFromStoreId () {
      return this.$store.state.showcase.events.id
    }
  },
  head () {
    return {
      title: (this.event && this.event.seo && this.event.seo.title) || 'Gramafilm > Our Work > Event',
      meta: [
        { hid: 'description', name: 'description', content: (this.event && this.event.seo && this.event.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 0
</style>
