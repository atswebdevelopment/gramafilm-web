<template>
  <div class="page" :class="{ 'page--tertiary': pageGreenInFocus, 'page--blue': pageBlueInFocus }">
    <Format v-if="format && format.id" :case-study="format" />
    <!-- <CaseStudy v-if="caseStudies && caseStudies.id && caseStudies.published" :case-study="caseStudies" :case-studies="caseStudiesz" />
    <div v-else-if="caseStudies && caseStudies.id" />
    <Loader v-else /> -->
  </div>
</template>

<script>
import gql from 'graphql-tag'
import formatQuery from '~/apollo/queries/pages/format.gql'
export default {
  components: {
    Format: () => import('~/components/pages/Format')
  },
  data () {
    return {
      format: {},
      pageGreenInFocus: false,
      pageBlueInFocus: false
    }
  },
  head () {
    return {
      title: (this.format && this.format.seo && this.format.seo.title) || 'Gramafilm > Format Development',
      meta: [
        { hid: 'description', name: 'description', content: (this.format && this.format.seo && this.format.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: (this.format && this.format.seo && this.format.seo.title) || 'Gramafilm > Format Development' },
        { hid: 'og:description', name: 'og:description', content: (this.format && this.format.seo && this.format.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` },
        { hid: 'og:image', name: 'image', property: 'og:image', content: this.format && this.format.seo && this.format.seo.image && this.format.seo.image.url }
      ]
    }
  },
  mounted () {
    this.$apollo.query({ query: formatQuery, prefetch: false }).then(({ data }) => {
      this.format = data.format
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
    format: {
      prefetch: true,
      query: gql`
        query Seo {
          format {
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
      `
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
