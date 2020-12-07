<template>
  <div class="page">
    <ContentArea>
      <div class="error">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
        <video class="looped error__video" autoplay loop muted>
          <source src="https://player.vimeo.com/external/72806335.hd.mp4?s=f6080fdc9e88fc2a32989d2850ef474cfcc781c5&profile_id=113" type="video/mp4">
        </video>
      </div>
    </ContentArea>
  </div>
</template>

<script>
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea')
  },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    const timer = setInterval(() => {
      const video = document.querySelector('.error__video')
      if (video) {
        video.play()
        clearInterval(timer)
      }
    }, 100)
  },
  head () {
    return {
      title: 'Gramafilm',
      meta: [
        { hid: 'description', name: 'description', content: 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.error
  text-align center

  &__video
    max-width 100%

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
