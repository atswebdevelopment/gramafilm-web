<template>
  <div class="page">
    <Work v-if="work && work.id" :work="work" />
    <Loader v-else />
    <GetInTouch v-if="work && work.id" footer-links />
  </div>
</template>

<script>
import workQuery from '~/apollo/queries/work/work.gql'
export default {
  components: {
    Work: () => import('~/components/pages/Work'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      work: {}
    }
  },
  apollo: {
    work: {
      prefetch: false,
      query: workQuery
    }
  },
  head () {
    return {
      title: (this.work && this.work.seo && this.work.seo.title) || 'Gramafilm > Our Work > All',
      meta: [
        { hid: 'description', name: 'description', content: (this.work && this.work.seo && this.work.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>
