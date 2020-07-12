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
