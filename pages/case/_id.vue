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
          url: this.$route.params.id
        }
      },
      update (data) {
        return data.caseStudies[0] || this.$nuxt.$router.push({ name: 'work' })
      }
    }
  },
  head () {
    return {
      title: (this.caseStudy && ((this.caseStudy.seo && this.caseStudy.seo.title) || this.caseStudy.title)) || 'Gramafilm',
      meta: [
        { hid: 'description', name: 'description', content: (this.caseStudy && this.caseStudy.seo && this.caseStudy.seo.description) || 'Gramafilm created and produced a global campaign for Android showcasing developers through a series of 11 films, photography, out of home and an event activation.' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 0
</style>
