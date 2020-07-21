<template>
  <ContentArea fullscreen center>
    <div class="getInTouch">
      <div class="getInTouch__title">
        If you want to
        <div class="text-swap">
          <div class="green">
            <nuxt-link :to="{ name: 'film' }">
              <span>make</span> <span>a</span> <span>film</span>
            </nuxt-link>
          </div>
          <div class="blue">
            <nuxt-link :to="{ name: 'design' }">
              <span>create</span> <span>impactful</span> <span>design</span>
            </nuxt-link>
          </div>
          <div class="orange">
            <nuxt-link :to="{ name: 'events' }">
              <span>create</span> <span>memorable</span> <span>events</span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div v-if="!noContact" class="getInTouch__link">
        <nuxt-link class="arrowLink arrowLink--small" :to="{ name: 'contact' }">
          Get in touch
        </nuxt-link>
      </div>
    </div>
    <FooterLinks v-if="footerLinks" />
  </ContentArea>
</template>

<script>
export default {
  name: 'GetInTouch',
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    FooterLinks: () => import('~/components/content/FooterLinks')
  },
  props: {
    noContact: {
      type: Boolean,
      default: false
    },
    footerLinks: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.getInTouch
  width 100%
  max-width 626px
  text-align center
  margin 0 auto

  &__title
    font-weight 600
    font-size 48px
    line-height 52px
    letter-spacing -1.5px
    margin-bottom 30px

  &__link
    font-size 32px
    line-height 52px

.text-swap
  position relative
  height 52px
  width 626px
  text-align center

  @media (max-width $bp-sm)
    width 100%
    height 104px

  > div
    position absolute
    width 100%
    opacity 0
    z-index 0

    &:first-child
      animation swapfilm 10s linear infinite

    &:nth-child(2)
      animation swapdesign 10s linear infinite

    &:last-child
      animation swapevents 10s linear infinite

@keyframes swapfilm {
  0%, 30% {
    opacity 1
    z-index 1
  }
  33%, 97% {
    opacity 0
    z-index 0
  }
  100% {
    opacity 1
    z-index 1
  }
}

@keyframes swapdesign {
  0%, 30% {
    opacity 0
    z-index 0
  }
  33%, 63% {
    opacity 1
    z-index 1
  }
  66%, 100% {
    opacity 0
    z-index 0
  }
}

@keyframes swapevents {
  0%, 63% {
    opacity 0
    z-index 0
  }
  66%, 97% {
    opacity 1
    z-index 1
  }
  100% {
    opacity 0
    z-index 0
  }
}
</style>
