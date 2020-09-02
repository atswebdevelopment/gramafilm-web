<template>
  <ContentArea fullscreen center class="getInTouch" :class="{ 'getInTouch--careers': careers }">
    <div class="getInTouch__content">
      <div v-if="careers" class="getInTouch__title">
        We’re always looking to hear from passionate people. Drop us a message and say hi if you’d like to get involved.
      </div>
      <div v-else class="getInTouch__title">
        If you want to make
        <TextSwap />
      </div>
      <div class="getInTouch__link">
        <nuxt-link class="arrowLink arrowLink--small" :to="{ name: 'contact' }">
          Get in touch
        </nuxt-link>
      </div>
    </div>
    <FooterLinks v-if="footerLinks" :careers="careers" />
  </ContentArea>
</template>

<script>
export default {
  name: 'GetInTouch',
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    FooterLinks: () => import('~/components/content/FooterLinks'),
    TextSwap: () => import('~/components/content/TextSwap')
  },
  props: {
    footerLinks: {
      type: Boolean,
      default: false
    },
    careers: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.getInTouch
  &__content
    width 100%
    max-width 626px
    text-align center
    margin 0 auto

  &__title
    font-weight 600
    font-size 48px
    line-height 52px
    margin-bottom 30px

    @media (max-width $bp-xs)
      font-size 34px
      line-height 38px

  &__link
    font-size 32px
    line-height 52px

  &--careers
    color $white
    background $primary

    .getInTouch__content
      max-width 880px

    >>> a
      color $white

    >>> .arrowLink:after
      background-image url(/images/arrow-white.svg)
</style>
