<template>
  <client-only>
    <div class="video" :class="`video-${identifier}`">
      <div v-if="video && viewportLoaded" v-video-player:myVideoPlayer="playerOptions" class="video-player-box" />
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'Video',
  props: {
    video: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      playerOptions: {},
      identifier: '',
      sources: null,
      viewportLoaded: false
    }
  },
  created () {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    this.identifier = result
  },
  mounted () {
    if (this.video) {
      const urls = this.video.src.split('\n')
      const tempArray = []
      urls.forEach((e, i) => {
        const res = e.includes('id=174') ? 720 : e.includes('id=165') ? 540 : e.includes('id=165') ? 360 : 1080
        tempArray.push({
          type: 'video/mp4',
          src: e.replace(/ /g, ''),
          label: `${res}p`,
          res
        })
      })
      this.playerOptions.sources = tempArray
      window.addEventListener('scroll', () => {
        const video = document.querySelector(`.video-${this.identifier}`)
        if (video && !this.viewportLoaded) {
          const elemOffset = video.getBoundingClientRect().top
          this.viewportLoaded = elemOffset - window.innerHeight < 0
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.video
  width 100%
  padding 56.25% 0 0 0
  position relative
  box-sizing border-box

  video,
  .video-player-box,
  >>> .video-js,
  >>> iframe
    position absolute
    top 0
    left 0
    width 100%
    height 100%

  >>> .video-js .vjs-big-play-button
    top 50%
    left 50%
    margin -24px 0 0 -45px
</style>
