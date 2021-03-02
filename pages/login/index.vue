<template>
  <div class="page">
    <ContentArea fullscreen center>
      <Login />
      <FooterLinks />
    </ContentArea>
  </div>
</template>

<script>
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Login: () => import('~/components/content/Login'),
    FooterLinks: () => import('~/components/content/FooterLinks')
  },
  middleware ({ store, redirect }) {
    if (store.state.auth.user.token) {
      return redirect('/clientarea')
    }
  },
  head () {
    return {
      title: 'Login to My Account',
      meta: [
        { hid: 'description', name: 'description', content: 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: 'Login to My Account' },
        { hid: 'og:description', name: 'og:description', content: 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` }
      ]
    }
  },
  mounted () {
    this.$store.commit('header/setDefaultColor', 'white')
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'white')
    }, 200)
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 0
  background $primary
  color $white

>>> .footerLinks__link
  color $white
</style>
