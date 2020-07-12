<template>
  <div class="page">
    <CaseStudy v-if="caseStudy.id" :case-study="caseStudy" />
    <Loader v-else />
  </div>
</template>

<script>
import caseQuery from '~/apollo/queries/case/case'
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
      prefetch: true,
      query: caseQuery,
      variables () {
        return {
          id: parseInt(this.$route.params.id)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 0

  // &:before
  //   background $primary
</style>
