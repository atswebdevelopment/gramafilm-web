<template>
  <div class="page">
    <career v-if="career && career.id" :careers="career" />
    <Loader v-else />
    <GetInTouch v-if="career && career.id" footer-links careers />
  </div>
</template>

<script>
import careerQuery from '~/apollo/queries/pages/careers.gql'
export default {
  components: {
    Career: () => import('~/components/pages/Careers'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      career: {}
    }
  },
  apollo: {
    career: {
      prefetch: false,
      query: careerQuery
    }
  },
  head () {
    return {
      title: (this.career && this.career.seo && this.career.seo.title) || 'Gramafilm career',
      meta: [
        { hid: 'description', name: 'description', content: (this.career && this.career.seo && this.career.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>
