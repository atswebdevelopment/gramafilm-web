<template>
  <div class="work">
    <ContentArea stretch>
      <div class="heading">
        <h1 class="h1-small">
          Work
        </h1>
        <Filters>
          <div class="filters__filter">
            <nuxt-link :to="{ name: 'work' }">All</nuxt-link>
          </div>
          <div class="filters__filter filters__filter--orange">
            <nuxt-link :to="{ name: 'film' }">Film</nuxt-link>
          </div>
          <div class="filters__filter filters__filter--green">
            <nuxt-link :to="{ name: 'events' }">Event</nuxt-link>
          </div>
          <div class="filters__filter filters__filter--blue filters__filter--active">
            Design
          </div>
        </Filters>
      </div>
      <div v-if="work.modules[0] && work.modules[0].content" class="module-introduction">
        <div v-html="work.modules[0].content" />
      </div>
      <WorkPortfolio :type="type" />
    </ContentArea>
  </div>
</template>

<script>
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Filters: () => import('~/components/content/Filters'),
    WorkPortfolio: () => import('~/components/content/WorkPortfolio')
  },
  props: {
    work: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      type: 'design'
    }
  },
  mounted () {
    this.$store.commit('header/setDefaultColor', 'black')
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'black')
    }, 200)
  }
}
</script>
