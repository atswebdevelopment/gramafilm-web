<template>
  <div class="page">
    <DesignBanner v-if="designFromStoreId || (design && design.id)" :design="(designFromStoreId && designFromStore) || design" banner-top />
    <Design v-if="design && design.id" :design="design" />
    <Loader v-else />
    <FilmBanner v-if="film && film.id" :film="film" />
  </div>
</template>

<script>
import designQuery from '~/apollo/queries/work/design.gql'
export default {
  components: {
    Design: () => import('~/components/pages/Design'),
    DesignBanner: () => import('~/components/banners/DesignBanner'),
    FilmBanner: () => import('~/components/banners/FilmBanner'),
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
  },
  computed: {
    designFromStore () {
      return this.$store.state.showcase.design
    },
    designFromStoreId () {
      return this.$store.state.showcase.design.id
    }
  },
  head () {
    return {
      title: (this.design && this.design.seotitle) || 'Gramafilm > Our Work > Design',
      meta: [
        { hid: 'description', name: 'description', content: (this.design && this.design.seodescription) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 0
</style>
