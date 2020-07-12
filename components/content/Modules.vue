<template>
  <div v-if="modules" class="showcase__container">
    <div v-for="(section, index) in modules" :key="`section-${index}`" class="fade fadeIn">
      <div v-if="section.__typename === 'ComponentModules1X4'" class="showcase__module showcase__module--1">
        <ColumnContainer center>
          <Column wide-w2>
            <div class="showcase__item showcase__item--1">
              <div class="showcase__media">
                <img v-if="section.mainimage" :src="section.mainimage.url" :alt="section.mainimage.alternativeText">
                <Video v-else-if="section.mainvideo" :video="section.mainvideo" />
              </div>
              <div v-html="section.content" />
            </div>
          </Column>
          <Column>
            <div class="showcase__item showcase__item--2">
              <div class="showcase__media">
                <img v-if="section.image1" :src="section.image1.url" :alt="section.image1.alternativeText">
                <Video v-else-if="section.video1" :video="section.video1" />
              </div>
              <div class="showcase__media">
                <img v-if="section.image2" :src="section.image2.url" :alt="section.image2.alternativeText">
                <Video v-else-if="section.video2" :video="section.video2" />
              </div>
              <div class="showcase__media">
                <img v-if="section.image3" :src="section.image3.url" :alt="section.image3.alternativeText">
                <Video v-else-if="section.video3" :video="section.video3" />
              </div>
              <div class="showcase__media">
                <img v-if="section.image4" :src="section.image4.url" :alt="section.image4.alternativeText">
                <Video v-else-if="section.video4" :video="section.video4" />
              </div>
            </div>
          </Column>
        </ColumnContainer>
      </div>
      <div v-else-if="section.__typename === 'ComponentModules3X1'" class="showcase__module showcase__module--3">
        <ColumnContainer center>
          <Column>
            <div class="showcase__item">
              <div class="showcase__media">
                <img v-if="section.image1" :src="section.image1.url" :alt="section.image1.alternativeText">
                <Video v-else-if="section.video1" :video="section.video1" />
              </div>
              <div class="showcase__media">
                <img v-if="section.image2" :src="section.image2.url" :alt="section.image2.alternativeText">
                <Video v-else-if="section.video2" :video="section.video2" />
              </div>
              <div class="showcase__media">
                <img v-if="section.image3" :src="section.image3.url" :alt="section.image3.alternativeText">
                <Video v-else-if="section.video3" :video="section.video3" />
              </div>
            </div>
          </Column>
          <Column wide-w2>
            <div class="showcase__item">
              <div class="showcase__media">
                <img v-if="section.mainimage" :src="section.mainimage.url" :alt="section.mainimage.alternativeText">
                <Video v-else-if="section.mainvideo" :video-id="section.mainvideo" />
              </div>
              <div v-html="section.content" />
            </div>
          </Column>
        </ColumnContainer>
      </div>
      <div v-else-if="section.__typename === 'ComponentModules1X1X1'" class="showcase__module showcase__module--2">
        <ColumnContainer>
          <Column>
            <div class="showcase__item">
              <div class="showcase__media">
                <img v-if="section.column1image" :src="section.column1image.url" :alt="section.column1image.alternativeText">
                <Video v-else-if="section.column1video" :video="section.column1video" />
              </div>
              <div v-html="section.column1content" />
            </div>
          </Column>
          <Column>
            <div class="showcase__item">
              <div class="showcase__media">
                <img v-if="section.column2image" :src="section.column2image.url" :alt="section.column2image.alternativeText">
                <Video v-else-if="section.column2video" :video="section.column2video" />
              </div>
              <div v-html="section.column2content" />
            </div>
          </Column>
          <Column>
            <div class="showcase__item">
              <div class="showcase__media">
                <img v-if="section.column3image" :src="section.column3image.url" :alt="section.column3image.alternativeText">
                <Video v-else-if="section.column3video" :video="section.column3video" />
              </div>
              <div v-html="section.column3content" />
            </div>
          </Column>
        </ColumnContainer>
      </div>
      <Quote v-else-if="section.__typename === 'ComponentModulesQuote'">
        <template slot="quote">
          {{ section.quote }}
        </template>
        <template slot="cite">
          {{ section.citation }}
        </template>
      </Quote>
      <Video v-else-if="section.__typename === 'ComponentModulesVideo'" :video="section.qvideo" />
      <div v-else-if="section.__typename === 'ComponentModules1X1TextLeft'" class="showcase__module showcase__module--4">
        <ColumnContainer center no-padding>
          <Column wide>
            <div class="showcase__item">
              <div v-html="section.content" />
            </div>
          </Column>
          <Column>
            <div class="showcase__item">
              <div class="showcase__media">
                <img src="/landscape.png" alt="">
              </div>
            </div>
          </Column>
        </ColumnContainer>
        <ColumnContainer center>
          <Column>
            <div class="showcase__item showcase__item--3">
              <div class="showcase__media">
                <img src="/landscape.png" alt="">
              </div>
            </div>
          </Column>
        </ColumnContainer>
      </div>
      <div v-else-if="section.__typename === 'ComponentModules1X1TextRight'" class="showcase__module showcase__module--5">
        <ColumnContainer center no-padding>
          <Column wide-w2>
            <div class="showcase__item">
              <div class="showcase__media">
                <img src="/landscape.png" alt="">
              </div>
            </div>
          </Column>
          <Column>
            <div>
              <div v-html="section.content" />
            </div>
          </Column>
        </ColumnContainer>
        <ColumnContainer center>
          <Column>
            <div class="showcase__item showcase__item--4">
              <div class="showcase__media">
                <img src="/landscape.png" alt="">
              </div>
            </div>
          </Column>
        </ColumnContainer>
      </div>
    </div>
  </div>
</template>

<script>
import fadeIn from '~/helpers/fadeIn'
export default {
  name: 'Modules',
  components: {
    Quote: () => import('~/components/content/Quote'),
    Video: () => import('~/components/content/Video'),
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column')
  },
  props: {
    modules: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    fadeIn()
  }
}
</script>

<style lang="stylus" scoped>
</style>
