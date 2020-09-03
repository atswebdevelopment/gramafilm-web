<template>
  <div class="videoList">
    <ColumnContainer v-for="(video, index) in videos" :key="index" no-padding>
      <Column>
        <Video :video="video" />
      </Column>
      <Column>
        <div>
          <p>
            <b>{{ video.clientname }}</b><br>
            {{ video.title }} {{ video.client }}
          </p>
          <div v-html="video.content" />
          <p>Uploaded on {{ formatDate(video.created_at) }}</p>
        </div>
      </Column>
    </ColumnContainer>
  </div>
</template>

<script>
export default {
  name: 'PrivateVideos',
  components: {
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column'),
    Video: () => import('~/components/content/Video')
  },
  props: {
    videos: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDate (date) {
      date = new Date(date)
      const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' })
      const [{ value: month },, { value: day },, { value: year }] = dateTimeFormat.formatToParts(date)
      return `${day} ${month} ${year} `
    }
  }
}
</script>

<style lang="stylus" scoped>
.videoList
  margin-bottom 10vh

  >>> .column p:first-child
    margin-top 0
</style>
