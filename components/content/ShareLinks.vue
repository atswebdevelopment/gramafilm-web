<template>
  <div class="shareLinks">
    <div>
      <span class="shareLinks__link"><b>Share</b></span>
      <a class="shareLinks__link" target="_blank" title="Opens in a new window" href="https://www.instagram.com/gramafilm/?hl=en">Instagram</a>
      <a class="shareLinks__link" target="_blank" title="Opens in a new window" href="https://www.facebook.com/Gramafilm/">Facebook</a>
      <a class="shareLinks__link" target="_blank" title="Opens in a new window" href="https://uk.linkedin.com/organization-guest/company/gramafilm">LinkedIn</a>
      <a class="shareLinks__link" target="_blank" title="Opens in a new window" href="https://www.youtube.com/gramafilm">YouTube</a>
      <a class="shareLinks__link" target="_blank" title="Opens in a new window" href="https://twitter.com/Gramafilm">Twitter</a>
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

  a:hover
      text-decoration underline
</style>
