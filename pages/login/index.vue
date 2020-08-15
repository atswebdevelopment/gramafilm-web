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
  middleware ({ store, redirect }) {
    if (store.state.auth.user.token) {
      return redirect('/clientarea')
    }
  },
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Login: () => import('~/components/content/Login'),
    FooterLinks: () => import('~/components/content/FooterLinks')
  },
  mounted () {
    this.$store.commit('header/setDefaultColor', 'white')
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'white')
    }, 200)
  },
  head () {
    return {
      title: 'Login to My Account',
      meta: [
        { hid: 'description', name: 'description', content: 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 0
  background $primary
  color $white

  // &:before
  //   background $primary

>>> .footerLinks__link
  color $white
</style>
