<template>
  <div class="page">
    <Design v-if="design && design.id" :design="design" :film="film" />
    <Loader v-else />
  </div>
</template>

<script>
import designQuery from '~/apollo/queries/work/design.gql'
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
