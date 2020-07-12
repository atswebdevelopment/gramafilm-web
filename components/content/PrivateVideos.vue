<template>
  <div class="videoList">
    <ColumnContainer no-padding>
      <Column>
        <img src="/video-2.png" alt="">
      </Column>
      <Column>
        <p>
          <b>Client name</b><br>
          Project title
        </p>
        <p>The drivers, Pierre Gasly and Daniil Kvyat hit the track for the first time to try the new AT01.</p>
        <p>Uploaded on 05 May 2020</p>
      </Column>
    </ColumnContainer>
    <ColumnContainer no-padding>
      <Column>
        <img src="/video.png" alt="">
      </Column>
      <Column>
        <p>
          <b>Client name</b><br>
          Project title
        </p>
        <p>The drivers, Pierre Gasly and Daniil Kvyat hit the track for the first time to try the new AT01.</p>
        <p>Uploaded on 05 May 2020</p>
      </Column>
    </ColumnContainer>
    <ColumnContainer no-padding>
      <Column>
        <img src="/video-2.png" alt="">
      </Column>
      <Column>
        <p>
          <b>Client name</b><br>
          Project title
        </p>
        <p>The drivers, Pierre Gasly and Daniil Kvyat hit the track for the first time to try the new AT01.</p>
        <p>Uploaded on 05 May 2020</p>
      </Column>
    </ColumnContainer>
  </div>
</template>

<script>
export default {
  name: 'PrivateVideos',
  components: {
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column')
  },
  props: {
  },
  data () {
    return {
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
