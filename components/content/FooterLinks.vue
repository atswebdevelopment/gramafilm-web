<template>
  <ContentArea class="footerLinks" stretch :class="{ 'footerLinks--inline': inline }">
    <div class="footerLinks__inner">
      <div>
        <a class="footerLinks__link" target="_blank" title="Opens in a new window" href="https://www.instagram.com/gramafilm/?hl=en">Instagram</a>
        <a class="footerLinks__link" target="_blank" title="Opens in a new window" href="https://www.facebook.com/Gramafilm/">Facebook</a>
        <a class="footerLinks__link" target="_blank" title="Opens in a new window" href="https://www.youtube.com/gramafilm">YouTube</a>
        <a class="footerLinks__link" target="_blank" title="Opens in a new window" href="https://twitter.com/Gramafilm">Twitter</a>
        <a class="footerLinks__link" target="_blank" title="Opens in a new window" href="https://vimeo.com/gramafilm">Vimeo</a>
        <a class="footerLinks__link" target="_blank" title="Opens in a new window" href="https://uk.linkedin.com/organization-guest/company/gramafilm">LinkedIn</a>
      </div>
      <div class="footerLinks__copy">
        <p>Copyright 2009-2020 Gramafilm Limited. All Rights Reserved.</p>
      </div>
    </div>
  </ContentArea>
</template>

<script>
export default {
  name: 'Footerlinks',
  components: {
    ContentArea: () => import('~/components/layout/ContentArea')
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.footerLinks
  position absolute
  bottom 42px
  left 0
  width 100%
  padding 0
  line-height 19px

  @media (max-width $bp-sm)
    bottom 10px

  &--inline
    position static
    padding 8vh 0 42px

    @media (max-width $bp-sm)
      padding 3vh 0 10px

  p, a
    font-size 16px
    line-height 19px
    letter-spacing 0

    @media (max-width $bp-xs)
      font-size 12px
      line-height 16px

  &__inner
    display flex
    align-items center

    @media (max-width $bp-sm)
      padding 0 18px
      display block
      text-align center

    @media (max-width $bp-xs)
      padding 0 20px

  &__link
    margin 0 5px

    &:first-child
      margin-left 0

    &:last-child
      margin-right 0

  &__copy
    margin-left auto

  a:hover
      text-decoration underline
</style>
