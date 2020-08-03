<template>
  <div class="banner" :class="{ 'banner--hide-overflow': hideOverflow, 'banner--black': black }" :style="background && !video && `background-image:url(${background})`">
    <ContentArea overflow>
      <div class="banner__inner">
        <slot />
      </div>
    </ContentArea>
    <div v-if="video" class="banner__video">
      <video autoplay loop muted>
        <source :src="background" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  components: {
    ContentArea: () => import('~/components/layout/ContentArea')
  },
  props: {
    background: {
      type: String,
      default: ''
    },
    video: {
      type: Boolean,
      default: false
    },
    black: {
      type: Boolean,
      default: false
    },
    hideOverflow: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      const bannerVideo = document.querySelectorAll('.banner__video')
      if (bannerVideo) {
        bannerVideo.forEach((e, i) => {
          const bannerInView = window.scrollY <= e.offsetHeight
          const bannerVideoElement = e.querySelector('video')
          if (bannerInView) {
            bannerVideoElement.play()
          } else {
            bannerVideoElement.pause()
          }
        })
      }
    })
  }
}
</script>

<style lang="stylus">
.banner
  background-position 50%
  background-size cover
  background-attachment fixed
  position relative
  width 100%
  z-index 2
  height 100vh
  color $white

  @media (max-width $bp-sm)
    height 80vh

  &--hide-overflow
    overflow hidden

  &--black
    color $black

  h1
    font-size 20vh
    line-height 20vh
    position absolute
    left 0
    top 15vh
    max-width none

    @media (max-width $bp-sm)
      top 10vh

    @media (max-width $bp-sm)
      font-size 76px
      line-height 82px

  &__next
    font-size 32px
    line-height 36px
    position absolute
    left 12px
    top 20vh
    font-weight 500
    cursor pointer

    @media (max-width $bp-sm)
      left 5px
      top 10vh

    @media (max-width $bp-xs)
      left 3px
      font-size 28px

  &__inner
    height 100vh
    position relative

    @media (max-width $bp-sm)
      height 72vh

  &__media
    width 100%
    height 432px

    @media (max-width $bp-sm)
      height 214px

  &__item
    position absolute
    width 768px

    @media (max-width $bp-sm)
      width 100%

    &--1
      bottom -130px
      left 0

      @media (max-width $bp-sm)
        bottom -107px

      @media (max-width $bp-xs)
        bottom -146px

    &--2
      bottom 8vh
      right 0
      width 432px

      @media (max-width $bp-sm)
        display none

      .banner__media
        height 574px

    &--3
      top 25vh
      right 0
      width 432px

      @media (max-width $bp-sm)
        display none

      .banner__media
        height 289px

    &--4
      top 10vh
      right 0
      width 432px

      @media (max-width $bp-sm)
        display none

      .banner__media
        height 568px

    &--5
      bottom -247px
      left 50%
      margin-left -440px
      width 880px

      .banner__media
        height 495px

      @media (max-width $bp-sm)
        bottom -127px
        margin 0
        width 100%
        left 0

        .banner__media
          height 255px

          @media (max-width $bp-xs)
            height: 210px

          .video
            position absolute
            bottom 0
            height 100% !important
            padding 0 !important
            width 454px
            left 50%
            margin-left -227px

      @media (max-width $bp-xxs)
        .banner__media .video
          width 100%
          height 160px !important
          left 0
          margin 0

      @media (max-width $bp-xs)
        bottom -105px

  &__image
    width 100%
    height 100%
    background-position 50%
    background-size cover

  &__video
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    z-index -1
    overflow hidden

    video
      min-width 100%
      min-height 100%
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      object-fit cover
</style>
