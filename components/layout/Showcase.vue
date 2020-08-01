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
  &__container
    margin-bottom -20vh

    @media (max-width $bp-sm)
      margin-bottom -3vh

  >>> p
    max-width 528px

  >>> .large
    max-width none

    p
      margin 30vh 5% 20vh
      max-width 1024px

      @media (max-width $bp-sm)
        margin 15vh 0 10vh

    &--no-gap p
      margin-top 5vh

      @media (max-width $bp-sm)
        margin-top 5vh

  >>> &__module
    width 100%

    &--1 .columns,
    &--3 .columns
      padding 0 40px

      @media (max-width $bp-sm)
        padding 0

    &--6
      margin -10vh 0 7vh

      @media (max-width $bp-sm)
        margin 0
        padding 3vh 0

    .columns
      padding 0 18px

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
