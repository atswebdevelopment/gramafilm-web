<template>
  <div class="page">
    <ContentArea>
      <PrivateVideos v-if="privateVideos && privateVideos.length" :videos="privateVideos" />
      <Loader v-else />
      <FooterLinks />
    </ContentArea>
  </div>
</template>

<script>
import privateVideosQuery from '~/apollo/queries/private/videos.gql'
export default {
  middleware ({ app, redirect }) {
    const hasToken = !!app.$apolloHelpers.getToken()
    if (!hasToken) {
      return redirect('/login')
    }
  },
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    PrivateVideos: () => import('~/components/content/PrivateVideos'),
    FooterLinks: () => import('~/components/content/FooterLinks'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      privateVideos: []
    }
  },
  apollo: {
    privateVideos: {
      prefetch: false,
      query: privateVideosQuery
    }
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
