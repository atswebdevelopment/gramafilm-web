<template>
  <div class="text-swap" :class="{ 'text-swap--inline': inline }">
    <div class="orange">
      <nuxt-link :to="{ name: 'film' }">
        <span>captivating </span> <span>films{{ inline ? '.' : '' }}</span>
      </nuxt-link>
    </div>
    <div class="green">
      <nuxt-link :to="{ name: 'events' }">
        <span>memorable</span> <span>events{{ inline ? '.' : '' }}</span>
      </nuxt-link>
    </div>
    <div class="blue">
      <nuxt-link :to="{ name: 'design' }">
        <span>impactful</span> <span>design{{ inline ? '.' : '' }}</span>
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
    height 87px

  @media (max-width $bp-xs)
    height 42px

  &--inline
    display inline-block
    width 100%
    height 64px
    text-align left

    @media (max-width $bp-sm)
      height 140px

  > div
    position absolute
    width 100%
    opacity 0
    z-index 0

    &:first-child
      animation swapfilm 10s linear infinite

      span
        animation swapfilminner 10s linear infinite

    &:nth-child(2)
      animation swapdesign 10s linear infinite

      span
        animation swapdesigninner 10s linear infinite

    &:last-child
      animation swapevents 10s linear infinite

      span
        animation swapeventsinner 10s linear infinite

    span
      opacity 0

    span:first-child
      animation-delay 0.2s

    span:nth-child(2)
      animation-delay 0.4s

    span:last-child
      animation-delay 0.6s

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

@keyframes swapfilminner {
  0% {
    opacity 0
  }
  3%, 30% {
    opacity 1
  }
  33%, 100% {
    opacity 0
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

@keyframes swapdesigninner {
  0%, 33% {
    opacity 0
  }
  36%, 63% {
    opacity 1
  }
  66%, 100% {
    opacity 0
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

@keyframes swapeventsinner {
  0%, 66% {
    opacity 0
  }
  70%, 97% {
    opacity 1
  }
  100% {
    opacity 0
  }
}
</style>
