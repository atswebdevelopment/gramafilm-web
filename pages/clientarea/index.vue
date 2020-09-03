<template>
  <div class="page">
    <ContentArea>
      <div class="clientarea">
        <PrivateVideos v-if="user.videos && user.videos.length" :videos="user.videos" />
        <Slider v-if="user.gallery && user.gallery.length" :items="user.gallery" />
        <Loader v-else />
      </div>
      <FooterLinks v-if="user.videos && user.videos.length" />
    </ContentArea>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import userQuery from '~/apollo/queries/users/user.gql'
export default {
  async middleware ({ app, redirect }) {
    const hasToken = !!app.$apolloHelpers.getToken()
    if (!hasToken) {
      return redirect('/login')
    }
    const { data: { me } } = await app.apolloProvider.defaultClient.query({
      query: gql`
        query {
          me{
            id
          }
        }
      `
    })
    app.data.me = me.id
  },
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    PrivateVideos: () => import('~/components/content/PrivateVideos'),
    Slider: () => import('~/components/content/Slider'),
    FooterLinks: () => import('~/components/content/FooterLinks'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      user: []
    }
  },
  apollo: {
    user: {
      prefetch: false,
      query: userQuery,
      variables () {
        return {
          id: 1
        }
      }
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
  background $primary
  color $white

  // &:before
  //   background $primary

>>> .footerLinks__link
  color $white

.clientarea
  min-height 80vh
  margin-bottom 10vh
</style>
