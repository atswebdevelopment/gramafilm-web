<template>
  <client-only>
    <div v-if="video" :ref="`video-${identifier}`" class="video" :class="[`video-${identifier}`, fullscreen ? 'video--fullscreen' : '']">
      <div v-if="viewportLoaded" v-video-player:myVideoPlayer="playerOptions" class="video-js vjs-default-skin" @play="onPlayerPlay($event)" />
      <div v-if="video.preview && video.preview.url && !play" class="video__preview">
        <img v-if="!video.preview.mime.includes('video')" :src="video.preview.url">
        <video v-else-if="video.preview.mime.includes('video')" class="looped" loop muted>
          <source :src="video.preview.url" type="video/mp4">
        </video>
      </div>
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
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    play: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      playerOptions: {},
      identifier: '',
      sources: null,
      viewportLoaded: false,
      options: null,
      loaded: false
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
    this.ready()
    window.addEventListener('scroll', () => {
      const video = document.querySelectorAll('video.looped')
      if (video) {
        video.forEach((e, i) => {
          if (e.getBoundingClientRect().top - window.innerHeight < -(e.offsetHeight / 2) && e.getBoundingClientRect().top + e.offsetHeight > (e.offsetHeight / 2)) {
            e.play()
          } else {
            e.pause()
          }
        })
      }
    })
  },
  methods: {
    onPlayerPlay (player) {
      const videoPreview = document.querySelector('.video-' + this.identifier + ' .video__preview')
      if (videoPreview) {
        videoPreview.parentNode.removeChild(videoPreview)
      }
      this.playerOptions.autoplay = 'play'
      if (!this.loaded && this.playerOptions.sources && this.playerOptions.sources.length > 1) {
        const qualityList = document.querySelector('.video-' + this.identifier + ' .vjs-spacer')
        qualityList.innerHTML = ''
        const tag = document.createElement('span')
        this.options = document.createElement('ul')
        tag.innerHTML = this.playerOptions.sources[0].label
        tag.addEventListener('mouseenter', () => {
          this.options.style.display = 'block'
        })
        qualityList.appendChild(tag)
        this.playerOptions.sources.forEach((e, i) => {
          const option = document.createElement('li')
          option.innerHTML = e.label
          option.addEventListener('click', () => {
            const video = document.querySelector('.video-' + this.identifier + ' video')
            const time = video.currentTime
            video.setAttribute('src', e.src)
            video.currentTime = time
            video.play()
            this.options.style.display = 'none'
            tag.innerHTML = e.label
            this.options.querySelector('.active').classList.remove('active')
            option.classList.add('active')
          })
          if (i === 0) {
            option.classList.add('active')
          }
          this.options.appendChild(option)
        })
        qualityList.appendChild(this.options)
        qualityList.addEventListener('mouseleave', () => {
          this.options.style.display = 'none'
        })
      }
      this.loaded = true
    },
    ready () {
      if (!document.querySelector('.video-' + this.identifier)) {
        setTimeout(() => {
          this.ready()
        }, 100)
        return
      }

      const urls = this.video.src.split('\n')
      const tempArray = []
      urls.forEach((e, i) => {
        if (e.includes('id=')) {
          const res = e.includes('id=175') ? 1080 : e.includes('id=174') ? 720 : e.includes('id=165') ? 540 : e.includes('id=164') ? 360 : null
          if (res) {
            tempArray.push({
              type: 'video/mp4',
              src: e.replace(/ /g, ''),
              label: res + 'p',
              res
            })
          }
        }
      })
      this.playerOptions.sources = tempArray
      window.addEventListener('scroll', () => {
        this.loadVideo()
      })
      this.loadVideo()
      if (this.play) {
        setTimeout(() => {
          const video2 = document.querySelector('.video-' + this.identifier + ' video')
          video2.play()
        }, 100)
      }
    },
    loadVideo () {
      const video = document.querySelector('.video-' + this.identifier)
      if (video && !this.viewportLoaded) {
        const elemOffset = video.getBoundingClientRect().top
        this.viewportLoaded = elemOffset - window.innerHeight < 0
      }
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

  @media (max-width $bp-sm)
    height auto !important
    padding 56.25% 0 0 0 !important

  >>> video,
  >>> .video-player-box,
  >>> .video-js,
  >>> iframe
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    outline none

    @media (max-width $bp-sm)
      width 100% !important
      height 100% !important

  &__preview
    height 100%
    width 100%
    position absolute
    top 0
    left 0
    opacity 1

    img
      max-height none

  &--fullscreen
    height 100vh
    overflow hidden
    padding 0

    >>> video,
    >>> .video-player-box,
    >>> .video-js,
    >>> iframe
      width 177.77777778vh
      height 100%
      min-width 100%
      min-height 56.25vw
      left 50%
      top 50%
      transform translate(-50%, -50%)

    .video__preview video
      top 50%
      transform translateY(-50%)
</style>
