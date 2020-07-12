<template>
  <div class="shareLinks">
    <div>
      <span class="shareLinks__link">Share</span>
      <a class="shareLinks__link" href="">Instagram</a>
      <a class="shareLinks__link" href="">Facebook</a>
      <a class="shareLinks__link" href="">LinkedIn</a>
      <a class="shareLinks__link" href="">Youtube</a>
      <a class="shareLinks__link" href="">Twitter</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShareLinks'
}
</script>

<style lang="stylus" scoped>
.shareLinks
  box-sizing border-box
  font-size 16px
  line-height 19px
  text-align left

  @media (max-width $bp-sm)
    padding 0 18px

  &__link
    margin 0 15px
    color $black

    &:first-child
      margin-left 0

    &:last-child
      margin-right 0
</style>
