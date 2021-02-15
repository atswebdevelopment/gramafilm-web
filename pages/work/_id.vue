<template>
  <div class="page" :class="{ 'page--tertiary': pageGreenInFocus, 'page--blue': pageBlueInFocus }">
    <CaseStudy v-if="caseStudies && caseStudies.id && caseStudies.published" :case-study="caseStudies" :case-studies="caseStudiesz" />
    <div v-else-if="caseStudies && caseStudies.id" />
    <Loader v-else />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import caseQuery from '~/apollo/queries/case/case.gql'
import casesQuery from '~/apollo/queries/work/work.gql'
export default {
  components: {
    CaseStudy: () => import('~/components/pages/CaseStudy'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      caseStudy: {},
      caseStudies: {},
      caseStudiesz: [],
      pageGreenInFocus: false,
      pageBlueInFocus: false
    }
  },
  mounted () {
    this.$apollo.query({ query: casesQuery }).then(({ data }) => {
      this.caseStudiesz = [...data.work.casestudies]
    })
    window.addEventListener('scroll', () => {
      const bgBlue = document.querySelectorAll('.bg-blue')
      if (bgBlue) {
        let onBlue = false
        bgBlue.forEach((e, i) => {
          const top = e.getBoundingClientRect().top
          const height = e.offsetHeight
          if (top - (window.innerHeight / 2) < 0 && ((top + height) - (window.innerHeight / 2) > 0)) {
            onBlue = true
          }
        })
        this.pageBlueInFocus = onBlue
      }
    })
  },
  apollo: {
    caseStudies: {
      prefetch: false,
      query: caseQuery,
      variables () {
        return {
          url: this.$route.params.id
        }
      },
      update (data) {
        return (data.caseStudies && data.caseStudies[0]) || this.$nuxt.$router.push({ name: 'work' })
      }
    },
    caseStudy: {
      prefetch: true,
      query: gql`
        query Seo ($url: String!) {
          caseStudies (where: { url: $url }) {
            seo {
              ... on ComponentContentSeo {
                title
                description
                image {
                  url
                }
              }
            }
          }
        }
      `,
      variables () {
        return {
          url: this.$route.params.id
        }
      },
      update (data) {
        return (data.caseStudies && data.caseStudies[0]) || this.$nuxt.$router.push({ name: 'work' })
      }
    }
  },
  head () {
    return {
      title: (this.caseStudy && ((this.caseStudy.seo && this.caseStudy.seo.title) || this.caseStudy.title)) || 'Gramafilm',
      meta: [
        { hid: 'description', name: 'description', content: (this.caseStudy && this.caseStudy.seo && this.caseStudy.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: (this.caseStudy && this.caseStudy.seo && this.caseStudy.seo.title) || 'Gramafilm' },
        { hid: 'og:description', name: 'og:description', content: (this.caseStudy && this.caseStudy.seo && this.caseStudy.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` },
        { hid: 'og:image', name: 'image', property: 'og:image', content: this.caseStudy && this.caseStudy.seo && this.caseStudy.seo.image && this.caseStudy.seo.image.url }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 0
  background $white
  transition 1.4s background-color $ease

  &--tertiary
    background $tertiary

  &--blue
    background #DBDCE6
</style>
