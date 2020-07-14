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
