<template>
  <div class="showcase">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Showcase'
}
</script>

<style lang="stylus" scoped>
.showcase
  >>> p
    max-width 528px

  >>> .large
    max-width none

    p
      margin 30vh 5% 20vh
      max-width 1024px

    @media (max-width $bp-sm)
      margin 15vh 0 10vh

  >>> &__item
    width 100%

    img
      width 100%

    &--2
      .showcase__media
        margin 5px 0

    &--3
      .showcase__media
        margin 0 auto
        max-width 880px

    &--4
      .showcase__media
        margin-left auto
        max-width 432px
</style>
