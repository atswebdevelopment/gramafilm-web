<template>
  <div class="page">
    <ContentArea>
      <div v-html="content" />
    </ContentArea>
    <FooterLinks inline />
  </div>
</template>

<script>
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    FooterLinks: () => import('~/components/content/FooterLinks')
  },
  data () {
    return {
      content: null
    }
  },
  created () {
    this.$axios
      .get('https://www.iubenda.com/api/privacy-policy/12467185/only-legal')
      .then((response) => {
        if (response.data.content) {
          this.content = response.data.content
        } else {
          this.content = 'Error connecting to policy. Please try again later.'
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  head () {
    return {
      title: 'Gramafilm',
      meta: [
        { hid: 'description', name: 'description', content: 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: 'Gramafilm' },
        { hid: 'og:description', name: 'og:description', content: 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
>>> h1
  max-width none
  word-break break-word

  @media (min-width $bp-sm)
    font-size 76px
    line-height 82px

  @media (max-width $bp-xs)
    font-size 46px
    line-height 52px
</style>
