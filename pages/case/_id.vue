<template>
  <div class="page">
    <CaseStudy v-if="caseStudy && caseStudy.id" :case-study="caseStudy" />
    <Loader v-else />
  </div>
</template>

<script>
import caseQuery from '~/apollo/queries/case/case.gql'
export default {
  components: {
    CaseStudy: () => import('~/components/pages/CaseStudy'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      caseStudy: {}
    }
  },
  apollo: {
    caseStudy: {
      prefetch: false,
      query: caseQuery,
      variables () {
        return {
          id: parseInt(this.$route.params.id)
        }
      }
    }
  },
  head () {
    return {
      title: (this.caseStudy && (this.caseStudy.seotitle || this.caseStudy.title)) || 'Gramafilm',
      meta: [
        { hid: 'description', name: 'description', content: (this.caseStudy && this.caseStudy.seodescription) || 'Gramafilm created and produced a global campaign for Android showcasing developers through a series of 11 films, photography, out of home and an event activation.' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 0
</style>
