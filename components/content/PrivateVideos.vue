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
            {{ video.title }}
          </p>
          <div v-html="video.content" />
          <!-- <p>Uploaded on {{ moment(video.created_at).format("DD MMMM YYYY") }}</p> -->
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
  }
}
</script>

<style lang="stylus" scoped>
.videoList
  min-height 64vh
  margin-bottom 10vh

  >>> .column p:first-child
    margin-top 0
</style>
