<template>
  <div class="page">
    <FilmBanner v-if="filmFromStoreId || (film && film.id)" :film="(filmFromStoreId && filmFromStore) || film" banner-top />
    <Film v-if="film && film.id" :film="film" />
    <Loader v-else />
    <EventsBanner v-if="event && event.id" :events="event" />
  </div>
</template>

<script>
import filmQuery from '~/apollo/queries/work/film.gql'
export default {
  components: {
    Film: () => import('~/components/pages/Film'),
    FilmBanner: () => import('~/components/banners/FilmBanner'),
    EventsBanner: () => import('~/components/banners/EventsBanner'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      film: {},
      event: {}
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
  computed: {
    filmFromStore () {
      return this.$store.state.showcase.film
    },
    filmFromStoreId () {
      return this.$store.state.showcase.film.id
    }
  },
  head () {
    return {
      title: (this.film && this.film.seo && this.film.seo.title) || 'Gramafilm > Our Work > Film',
      meta: [
        { hid: 'description', name: 'description', content: (this.film && this.film.seo && this.film.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 0
</style>
