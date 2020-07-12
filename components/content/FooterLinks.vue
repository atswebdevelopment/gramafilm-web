<template>
  <ContentArea class="footerLinks">
    <div class="footerLinks__inner">
      <div>
        <a class="footerLinks__link" href="">Instagram</a>
        <a class="footerLinks__link" href="">Facebook</a>
        <a class="footerLinks__link" href="">Youtube</a>
        <a class="footerLinks__link" href="">Twitter</a>
        <a class="footerLinks__link" href="">Vimeo</a>
        <a class="footerLinks__link" href="">LinkedIn</a>
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
  }
}
</script>

<style lang="stylus" scoped>
.footerLinks
  position absolute
  bottom 42px
  left 0
  width 100%
  font-size 16px
  line-height 19px
  letter-spacing 0
  padding 0

  @media (max-width $bp-sm)
    bottom 10px

  &__inner
    display flex
    align-items center

    @media (max-width $bp-sm)
      padding 0 18px
      display block
      text-align center

  &__link
    margin 0 5px

    &:first-child
      margin-left 0

    &:last-child
      margin-right 0

  &__copy
    margin-left auto
</style>
