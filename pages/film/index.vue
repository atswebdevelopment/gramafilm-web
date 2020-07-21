<template>
  <div class="page">
    <Film v-if="film && film.id" :film="film" :events="event" />
    <Loader v-else />
  </div>
</template>

<script>
import filmQuery from '~/apollo/queries/work/film.gql'
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
      prefetch: false,
      query: filmQuery
    },
    event: {
      prefetch: false,
      query: filmQuery
    }
  },
  head () {
    return {
      title: (this.film && this.film.seotitle) || 'Gramafilm > Our Work > Film',
      meta: [
        { hid: 'description', name: 'description', content: (this.film && this.film.seodescription) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 0
</style>
