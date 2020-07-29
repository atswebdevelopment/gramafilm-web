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

  &--hide-overflow
    overflow hidden

  &--black
    color $black

  h1
    font-size 20vh
    position absolute
    left 0
    top 15vh
    max-width none
    line-height 20vh

    @media (max-width $bp-sm)
      font-size 112px
      line-height 134px
      top 10vh

  &__next
    font-size 32px
    line-height 36px
    position absolute
    left 12px
    top 20vh
    font-weight 500
    cursor pointer

    @media (max-width $bp-sm)
      left 10px
      top 15vh

    @media (max-width $bp-xs)
      left 3px
      top 30vh
      font-size 28px

  &__inner
    height 100vh
    position relative

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
        bottom -70px

    &--2
      bottom 8vh
      right 0
      width 432px

      @media (max-width $bp-sm)
        transform scale(0.5)
        transform-origin 100% 0
        bottom auto
        top 40vh
        right -18px

      .banner__media
        height 574px

    &--3
      top 25vh
      right 0
      width 432px

      @media (max-width $bp-sm)
        transform scale(0.5)
        transform-origin 100% 0
        bottom auto
        top 50vh
        right -18px

      .banner__media
        height 289px

    &--4
      top 10vh
      right 0
      width 432px

      @media (max-width $bp-sm)
        transform scale(0.5)
        transform-origin 100% 0
        bottom auto
        top 40vh
        right -18px

      .banner__media
        height 568px

    &--5
      bottom -247px
      left 50%
      margin-left -440px
      width 880px

      @media (max-width $bp-xs)
        bottom -105px

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
</style>
