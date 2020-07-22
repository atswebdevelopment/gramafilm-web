<template>
  <div class="text-swap" :class="{ 'text-swap--inline': inline }">
    <div class="green">
      <nuxt-link :to="{ name: 'film' }">
        <span>make</span> <span>a</span> <span>film{{ inline && '.' }}</span>
      </nuxt-link>
    </div>
    <div class="blue">
      <nuxt-link :to="{ name: 'design' }">
        <span>create</span> <span>impactful</span> <span>design{{ inline && '.' }}</span>
      </nuxt-link>
    </div>
    <div class="orange">
      <nuxt-link :to="{ name: 'events' }">
        <span>create</span> <span>memorable</span> <span>events{{ inline && '.' }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextSwap',
  props: {
    inline: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.text-swap
  position relative
  height 52px
  width 626px
  text-align center
  font-family $fontFamilySemiBold

  @media (max-width $bp-sm)
    width 100%
    height 104px

  &--inline
    display inline-block
    width 100%
    height 64px
    text-align left

    @media (max-width $bp-sm)
      height 175px

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
