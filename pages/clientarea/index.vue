<template>
  <div class="page">
    <ContentArea>
      <PrivateVideos />
      <FooterLinks />
    </ContentArea>
  </div>
</template>

<script>
export default {
  middleware ({ store, redirect }) {
    if (!store.state.auth.user.token) {
      return redirect('/login')
    }
  },
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    PrivateVideos: () => import('~/components/content/PrivateVideos'),
    FooterLinks: () => import('~/components/content/FooterLinks')
  }
}
</script>

<style lang="stylus" scoped>
.page
  background $primary
  color $white

  // &:before
  //   background $primary

>>> .footerLinks__link
  color $white
</style>
