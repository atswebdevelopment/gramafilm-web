<template>
  <ContentArea class="footerLinks" stretch :class="{ 'footerLinks--inline': inline }" overflow>
    <div class="footerLinks__inner">
      <img
        class="totop"
        :src="`${ careers || inverted ? '/totop-white.svg' : '/totop.svg'}`"
        alt="Back to top"
        title="Back to top"
        :class="{ 'totop--active': totop }"
        @click="toTop"
      >
      <div>
        <a class="footerLinks__link" target="_blank" rel="noopener" title="Opens in a new window" href="https://www.instagram.com/gramafilm/?hl=en">Instagram</a>
        <a class="footerLinks__link" target="_blank" rel="noopener" title="Opens in a new window" href="https://www.facebook.com/Gramafilm/">Facebook</a>
        <a class="footerLinks__link" target="_blank" rel="noopener" title="Opens in a new window" href="https://twitter.com/Gramafilm">Twitter</a>
        <a class="footerLinks__link" target="_blank" rel="noopener" title="Opens in a new window" href="https://uk.linkedin.com/organization-guest/company/gramafilm">LinkedIn</a>
      </div>
      <div class="footerLinks__copy">
        <p>Copyright 2008-{{ currentYear }} Gramafilm Limited. All Rights Reserved.</p>
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
    },
    careers: {
      type: Boolean,
      default: false
    },
    inverted: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      totop: false
    }
  },
  computed: {
    currentYear () {
      const date = new Date(Date.now())
      return date.getFullYear()
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      if ((window.scrollY + window.innerHeight) >= (document.body.scrollHeight - 100)) {
        this.totop = true
      } else {
        this.totop = false
      }
    })
  },
  methods: {
    toTop () {
      setTimeout(() => {
        if (window.scrollY > 0) {
          window.scrollTo(0, window.scrollY - (window.scrollY / 50))
          this.toTop()
        }
      }, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.totop
  position absolute
  right 20px
  bottom 70px
  cursor pointer
  opacity 0
  transform translateY(-100%)
  transition all 1s $ease

  @media (max-width $bp-xs)
    right 0px

  &--active
    transform translateY(0%)
    opacity 1

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
      padding 6vh 0 10px

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
    position relative

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
